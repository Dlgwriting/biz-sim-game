/* BizSim Tycoon — game engine.
   English content: scenarios-a.js, scenarios-b.js, dice-events.js. Interface text and
   translations: js/i18n/. All player-entered text is written with textContent, never innerHTML. */
(function () {
  'use strict';

  var SAVE_KEY = 'bizsim.save.v2';
  var LANG_KEY = 'bizsim.lang';
  var LANGS = ['en', 'zh', 'ko', 'ru', 'ja'];
  var GAME_LENGTH = 40;
  var EVENT_EVERY = 5;
  var STREAK_LENGTH = 3;
  var STREAK_BONUS = 1000;
  var STRATEGIES = { pilot: 8000, partner: 6000, steady: 0, leases: -5000 };
  var ROLE_KEYS = ['ceo', 'marketing', 'finance', 'operations', 'hr', 'sales', 'tech'];
  var AVATAR_COLOURS = ['#e7b6a3', '#a8cbcc', '#a8cfb7', '#e6c97e', '#bfcee0', '#dfb58c', '#b4d4cc'];
  var RANKS = [ // checked top-down; share = fraction of the best possible decision profit
    { key: 'tycoon', share: 0.75 },
    { key: 'ceo', share: 0.55 },
    { key: 'entrepreneur', share: 0.35 },
    { key: 'small', share: 0.15 },
    { key: 'stall', share: 0 },
    { key: 'bankrupt', share: -Infinity }
  ];

  var I18N = window.I18N || {};
  var SCENARIOS = (window.SCENARIOS || []).slice().sort(function (a, b) { return a.id - b.id; });
  var EVENTS = window.DICE_EVENTS || [];
  var HIRING = window.HIRING_ROUNDS || {};
  var byId = {};
  SCENARIOS.forEach(function (s) { byId[s.id] = s; });
  var eventById = {};
  EVENTS.forEach(function (e) { eventById[e.id] = e; });

  var lang = 'en';
  var state = null;
  var timerHandle = null;
  var rolling = false;

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pack(code) { return I18N[code] || { ui: {}, scenarios: {}, events: {} }; }
  function t(key, vars) {
    var s = pack(lang).ui[key];
    if (s === undefined) s = pack('en').ui[key];
    if (s === undefined) s = key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  function roleName(r) { return t('role_' + r); }
  // Scenario/event text in the current language, falling back to English piece by piece.
  function scText(sc) {
    var tr = pack(lang).scenarios[sc.id] || {};
    return {
      title: tr.title || sc.title,
      text: tr.text || sc.text,
      lesson: tr.lesson || sc.lesson,
      hint: tr.hint || sc.hint[lang] || sc.hint.en,
      options: sc.options.map(function (o, i) {
        var to = (tr.options && tr.options[i]) || {};
        return { text: to.text || o.text, result: to.result || o.result, outcome: o.outcome, amount: o.amount };
      })
    };
  }
  function eventAmount(ev, index) {
    return state.dice && state.dice.roll && !state.dice.currentRules ? ev.oldAmounts[index] : ev.outcomes[index].amount;
  }
  function evText(ev) {
    var tr = pack(lang).events[ev.id] || {};
    var alreadyRolledOnOldRules = state.dice && state.dice.roll && !state.dice.currentRules;
    return {
      title: tr.title || ev.title,
      text: tr.text || ev.text,
      outcomes: ev.outcomes.map(function (o, i) {
        var legacy = alreadyRolledOnOldRules && tr.oldOutcomes && tr.oldOutcomes[i];
        var localized = tr.outcomes && tr.outcomes[i];
        var revised = !alreadyRolledOnOldRules && o.revisedText && o.revisedText[lang];
        return {
          text: revised || legacy || localized || (alreadyRolledOnOldRules && o.oldText) || o.text,
          amount: eventAmount(ev, i)
        };
      })
    };
  }
  function money(n) {
    var numberLocale = { ru: 'ru-RU', ja: 'ja-JP' }[lang] || 'en-MY';
    var s = 'RM ' + Math.abs(Math.round(n)).toLocaleString(numberLocale);
    return n < 0 ? '−' + s : s;
  }
  function signedMoney(n) { return (n > 0 ? '+' : '') + money(n); }
  function toneClass(n) { return n > 0 ? 'pos' : n < 0 ? 'neg' : 'zero'; }
  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join('');
  }
  function avatar(i, name) {
    var a = el('div', 'avatar', i < 0 ? '★' : initials(name));
    a.style.background = i < 0 ? '#d7eade' : AVATAR_COLOURS[i % AVATAR_COLOURS.length];
    return a;
  }
  function fill(text, who) {
    var name = who === null ? t('everyone') : String(who).trim().split(/\s+/)[0]; // first name reads naturally
    var out = String(text)
      .split('{biz}').join(state.biz)
      .split('{product}').join(state.product)
      .split('{name}').join(name);
    return out.charAt(0).toUpperCase() + out.slice(1);
  }
  function show(screen) {
    document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
    $('screen-' + screen).classList.add('active');
    window.scrollTo(0, 0);
  }
  function activeScreen() {
    var s = document.querySelector('.screen.active');
    return s ? s.id.replace('screen-', '') : 'setup';
  }
  function showView(view) {
    ['scenario', 'result', 'dice', 'hiring', 'strategy'].forEach(function (v) { $('view-' + v).classList.toggle('hidden', v !== view); });
  }
  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable: game still works */ }
  }
  function loadSave() {
    try {
      var s = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (s && s.version === 2 && Array.isArray(s.order) && Array.isArray(s.members) && Array.isArray(s.history) &&
          s.order.every(function (id) { return byId[id]; }) && s.events.every(function (id) { return eventById[id]; })) return s;
    } catch (e) { /* ignore */ }
    return null;
  }
  function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ } }

  // Who a scenario is addressed to: the role holder, else the CEO covering.
  function addressee(sc) {
    if (sc.role === 'team') return { idx: -1, name: null, label: t('team_decision'), sub: t('team_sub') };
    var idx = state.members.findIndex(function (m) { return m.role === sc.role; });
    var covering = false;
    if (idx < 0) { idx = state.members.findIndex(function (m) { return m.role === 'ceo'; }); covering = true; }
    var m = state.members[idx];
    return {
      idx: idx, name: m.name,
      label: m.name + ' · ' + roleName(m.role),
      sub: covering ? t('covering', { role: roleName(sc.role) }) : t('your_call')
    };
  }

  // ---------- language ----------
  function applyStatic() {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
    document.title = t('doc_title');
    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      n.textContent = t(n.getAttribute('data-i18n'), { n: n.getAttribute('data-n') || '' });
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (n) { n.placeholder = t(n.getAttribute('data-i18n-ph')); });
    document.querySelector('.lang-toggle').setAttribute('aria-label', t('language'));
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.member-row').forEach(function (row) {
      row.querySelector('input').placeholder = t('ph_name');
      row.querySelector('.remove').setAttribute('aria-label', t('remove_member'));
      Array.prototype.forEach.call(row.querySelectorAll('option'), function (o) { o.textContent = roleName(o.value); });
    });
  }

  function setLang(code) {
    if (LANGS.indexOf(code) < 0) return;
    lang = code;
    try { localStorage.setItem(LANG_KEY, code); } catch (e) { /* ignore */ }
    applyStatic();
    $('setup-error').textContent = '';
    renderResumeBox();
    if (!state) return;
    var screen = activeScreen();
    if (screen === 'intro') renderIntro();
    else if (screen === 'game') renderPhase(true);
    else if (screen === 'end') renderEnd();
  }

  // ---------- setup screen ----------
  function addMemberRow(name, role) {
    var list = $('team-list');
    if (list.children.length >= ROLE_KEYS.length) return;
    var row = el('div', 'member-row');
    var input = el('input');
    input.type = 'text'; input.maxLength = 30; input.placeholder = t('ph_name'); input.value = name || ''; input.autocomplete = 'off';
    var sel = el('select');
    ROLE_KEYS.forEach(function (k) {
      var o = el('option', null, roleName(k)); o.value = k; sel.appendChild(o);
    });
    if (!role) {
      var used = Array.prototype.map.call(list.querySelectorAll('select'), function (s) { return s.value; });
      role = ROLE_KEYS.filter(function (k) { return used.indexOf(k) < 0; })[0] || 'ceo';
    }
    sel.value = role;
    var rm = el('button', 'btn ghost remove', '×');
    rm.type = 'button'; rm.setAttribute('aria-label', t('remove_member'));
    rm.onclick = function () { if (list.children.length > 1) { row.remove(); updateAddBtn(); } };
    row.append(input, sel, rm);
    list.appendChild(row);
    updateAddBtn();
  }
  function updateAddBtn() { $('btn-add-member').disabled = $('team-list').children.length >= ROLE_KEYS.length; }

  function readSetup() {
    var biz = $('in-biz').value.trim();
    var product = $('in-product').value.trim();
    var members = Array.prototype.map.call($('team-list').children, function (row) {
      return { name: row.querySelector('input').value.trim(), role: row.querySelector('select').value };
    });
    if (!biz) return { error: t('err_biz') };
    if (!product) return { error: t('err_product') };
    if (members.some(function (m) { return !m.name; })) return { error: t('err_name') };
    var seen = {};
    for (var i = 0; i < members.length; i++) {
      if (ROLE_KEYS.indexOf(members[i].role) < 0) return { error: t('err_name') };
      if (seen[members[i].role]) return { error: t('err_dup', { role: roleName(members[i].role) }) };
      seen[members[i].role] = true;
    }
    if (!seen.ceo) return { error: t('err_ceo') };
    return {
      biz: biz, product: product, members: members,
      timer: parseInt($('in-timer').value, 10)
    };
  }

  function renderResumeBox() {
    var saved = loadSave();
    var box = $('resume-box');
    if (!saved || activeScreen() !== 'setup') { box.classList.add('hidden'); return; }
    box.classList.remove('hidden');
    var completed = saved.phase === 'end';
    $('resume-text').textContent = completed ? t('report_saved', { biz: saved.biz }) :
      t('resume_found', { biz: saved.biz, turn: saved.turn + 1, total: saved.order.length });
    $('btn-resume').textContent = t(completed ? 'report_reopen' : 'resume_btn');
    $('btn-resume').onclick = function () {
      state = saved;
      // Earlier games can have the previous answer saved on the next scenario.
      if (state.streak === undefined) {
        state.streak = 0;
        if (state.phase === 'scenario') state.selected = null;
      }
      renderPhase();
    };
  }

  function newGame(cfg) {
    var half = Math.ceil(SCENARIOS.length / 2);
    var early = SCENARIOS.slice(0, half).map(function (s) { return s.id; });
    var late = SCENARIOS.slice(half).map(function (s) { return s.id; });
    var n = Math.min(GAME_LENGTH, SCENARIOS.length);
    var nEarly = Math.ceil(n / 2);
    var order = shuffle(early).slice(0, nEarly).concat(shuffle(late).slice(0, n - nEarly));
    var nEvents = Math.floor(n / EVENT_EVERY);
    var evPool = shuffle(EVENTS.map(function (e) { return e.id; }));
    var events = [];
    for (var i = 0; i < nEvents; i++) events.push(evPool[i % evPool.length]);
    state = {
      version: 2,
      biz: cfg.biz, product: cfg.product, members: cfg.members, timer: cfg.timer,
      order: order, events: events, turn: 0, phase: 'scenario', optionOrder: shuffle([0, 1, 2]),
      profit: 0, history: [], rerollUsed: false, dice: null, selected: null,
      streak: 0, pauseUsed: false, pausedFor: null, timerDeadline: null
    };
    save();
  }

  // ---------- intro ----------
  function renderIntro() {
    $('intro-biz').textContent = state.biz;
    $('intro-product').textContent = t('selling', { product: state.product });
    $('how-1').textContent = t('how_1', { n: state.order.length });
    $('intro-strategy').classList.toggle('hidden', state.order.length !== GAME_LENGTH);
    var wrap = $('intro-team'); wrap.textContent = '';
    state.members.forEach(function (m, i) {
      var c = el('div', 'team-card');
      var tx = el('div');
      tx.append(el('div', 'who', m.name), el('div', 'role', roleName(m.role)));
      c.append(avatar(i, m.name), tx);
      wrap.appendChild(c);
    });
  }

  // ---------- game loop ----------
  function renderHud() {
    $('hud-biz').textContent = state.biz;
    var p = $('hud-profit');
    p.textContent = money(state.profit);
    p.className = 'value ' + toneClass(state.profit);
    $('hud-turn').textContent = Math.min(state.turn + 1, state.order.length) + ' / ' + state.order.length;
    var completed = state.turn + (state.phase === 'scenario' ? 0 : 1);
    var untilEvent = EVENT_EVERY - (completed % EVENT_EVERY);
    var eventDue = state.phase === 'dice' || (state.phase === 'result' && completed % EVENT_EVERY === 0);
    $('hud-event').textContent = state.phase.startsWith('strategy') ? '—' : eventDue ? t('now') : t('in_n', { n: untilEvent });
    $('hud-reroll').textContent = state.rerollUsed ? t('reroll_used') : t('reroll_left');
    $('progress-bar').style.width = (completed / state.order.length * 100) + '%';
  }

  // relang = true when only the language changed: keep the timer, selection and dice as they are.
  function renderPhase(relang) {
    if (state.phase === 'end') { renderEnd(); return; }
    if (!relang) { show('game'); window.scrollTo(0, 0); }
    if (state.phase === 'scenario') renderScenario(relang);
    else if (state.phase === 'result') renderResult();
    else if (state.phase === 'dice') renderDice(relang);
    else if (state.phase === 'hiring' || state.phase === 'hire-result') renderHiring(relang);
    else if (state.phase.startsWith('strategy')) renderStrategy(relang);
    renderHud();
  }

  function renderScenario(relang) {
    var sc = byId[state.order[state.turn]];
    var tx = scText(sc);
    var who = addressee(sc);
    var badge = $('sc-for'); badge.textContent = '';
    var lab = el('div');
    lab.append(el('div', null, who.label), el('small', null, who.sub));
    badge.append(avatar(who.idx, who.name || ''), lab);
    $('sc-title').textContent = fill(tx.title, who.name);
    $('sc-text').textContent = fill(tx.text, who.name);
    $('sc-hint').textContent = fill(tx.hint, who.name);
    var opts = $('sc-options'); opts.textContent = '';
    state.optionOrder.forEach(function (oi, pos) {
      var selected = state.selected === pos;
      var b = el('button', selected ? 'option selected' : 'option');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(selected));
      b.append(el('span', 'key', 'ABC'.charAt(pos)), el('span', null, fill(tx.options[oi].text, who.name)));
      b.onclick = function () { selectOption(pos); };
      opts.appendChild(b);
    });
    showView('scenario');
    if (!relang) $('sc-help').open = false;
    if (!relang) startTimer();
    else {
      updateTimer();
      updatePauseControls();
    }
  }

  function selectOption(pos) {
    if (state.phase !== 'scenario' || isPaused()) return;
    state.selected = pos;
    Array.prototype.forEach.call($('sc-options').children, function (b, i) {
      b.classList.toggle('selected', i === pos);
      b.setAttribute('aria-pressed', String(i === pos));
    });
    $('btn-lock').disabled = false;
  }

  function isPaused() { return Number.isFinite(state.pausedFor); }
  function timeRemaining() { return Math.max(0, (state.timerDeadline || 0) - Date.now()); }
  function updateTimer() {
    var paused = isPaused();
    var remaining = paused ? state.pausedFor : timeRemaining();
    var seconds = Math.ceil(remaining / 1000);
    var box = $('timer');
    box.classList.toggle('hidden', !state.timer);
    if (state.timer) {
      $('timer-text').textContent = paused ? t('timer_paused', { n: seconds }) :
        seconds > 0 ? t('timer_left', { n: seconds }) : t('timer_up');
      $('timer-bar').style.width = (remaining / (state.timer * 1000) * 100) + '%';
      box.classList.toggle('low', !paused && seconds <= 10);
      box.classList.toggle('done', !paused && seconds === 0);
    }
    if (paused || !remaining) stopTimer();
    return remaining;
  }
  function updatePauseControls() {
    var paused = isPaused();
    var button = $('btn-pause');
    button.textContent = t(paused ? 'resume_timer' : state.pauseUsed ? 'pause_used' : 'pause_once');
    button.classList.toggle('hidden', !state.timer);
    button.disabled = !paused && (state.pauseUsed || !timeRemaining());
    $('sc-paused').classList.toggle('hidden', !paused);
    $('btn-lock').disabled = paused || state.selected === null;
    $('sc-options').querySelectorAll('button').forEach(function (option) { option.disabled = paused; });
  }
  function startTimer() {
    stopTimer();
    if (state.timer && !isPaused() && !Number.isFinite(state.timerDeadline)) {
      state.timerDeadline = Date.now() + state.timer * 1000;
      save();
    }
    if (updateTimer() && !isPaused()) {
      timerHandle = setInterval(function () {
        if (!updateTimer()) updatePauseControls();
      }, 200);
    }
    updatePauseControls();
  }
  function stopTimer() { if (timerHandle) { clearInterval(timerHandle); timerHandle = null; } }
  function togglePause() {
    if (state.phase !== 'scenario' || !state.timer) return;
    if (isPaused()) {
      state.timerDeadline = Date.now() + state.pausedFor;
      state.pausedFor = null;
      save();
      startTimer();
      var nextControl = state.selected === null ? $('sc-options').querySelector('button') : $('btn-lock');
      nextControl.focus();
      return;
    }
    var remaining = timeRemaining();
    if (state.pauseUsed || !remaining) return;
    state.pauseUsed = true;
    state.pausedFor = remaining;
    state.timerDeadline = null;
    save();
    stopTimer();
    updateTimer();
    updatePauseControls();
  }

  function lockIn() {
    if (state.phase !== 'scenario' || state.selected === null || isPaused()) return;
    stopTimer();
    var sc = byId[state.order[state.turn]];
    var oi = state.optionOrder[state.selected];
    var opt = sc.options[oi];
    var who = addressee(sc);
    var streak = opt.outcome === 'gain' ? (state.streak || 0) + 1 : 0;
    var bonus = streak === STREAK_LENGTH ? STREAK_BONUS : 0;
    state.streak = bonus ? 0 : streak;
    state.profit += opt.amount + bonus;
    state.history.push({
      type: 'scenario', n: state.turn + 1, id: sc.id, opt: oi, letter: 'ABC'.charAt(state.selected),
      forIdx: who.idx, outcome: opt.outcome, amount: opt.amount, streak: streak, bonus: bonus, profit: state.profit
    });
    state.timerDeadline = null;
    state.phase = 'result';
    save();
    renderPhase();
  }

  function forName(h) {
    if (h.type === 'dice') return t('log_dice');
    if (h.type === 'hire' || h.type === 'strategy') return t('log_team');
    return h.forIdx < 0 ? t('log_team') : state.members[h.forIdx].name;
  }
  function histTitle(h) {
    if (h.type === 'dice') return fill(evText(eventById[h.eventId]).title, null);
    if (h.type === 'hire') return hiringText(HIRING[h.n].title, hiringTranslation(h.n).title);
    if (h.type === 'strategy') return t('strategy_title');
    var sc = byId[h.id];
    return fill(scText(sc).title, addressee(sc).name);
  }
  function histChoice(h) {
    if (h.type === 'dice') return t('log_rolled', { n: h.roll }) + (h.rerolled ? ' ' + t('log_after_reroll') : '');
    if (h.type === 'hire') return HIRING[h.n].candidates[h.candidate].name;
    if (h.type === 'strategy') return t('strategy_' + h.plan + '_title');
    var sc = byId[h.id];
    return fill(scText(sc).options[h.opt].text, addressee(sc).name);
  }

  function renderResult() {
    var h = state.history[state.history.length - 1];
    var sc = byId[h.id];
    var tx = scText(sc);
    var who = addressee(sc);
    $('rs-choice').textContent = t('you_chose', { letter: h.letter, choice: fill(tx.options[h.opt].text, who.name) });
    var amt = $('rs-amount');
    amt.textContent = signedMoney(h.amount);
    amt.className = 'big-amount ' + toneClass(h.amount);
    $('rs-text').textContent = fill(tx.options[h.opt].result, who.name);
    $('rs-lesson').textContent = fill(tx.lesson, who.name);
    $('rs-celebration').classList.toggle('hidden', h.outcome !== 'gain');
    $('rs-streak').textContent = h.bonus ? t('streak_bonus', { amount: money(h.bonus) }) :
      h.streak ? t('streak_progress', { n: h.streak }) : '';
    var ul = $('rs-others'); ul.textContent = '';
    state.optionOrder.forEach(function (oi, pos) {
      if (oi === h.opt) return;
      var o = tx.options[oi];
      var li = el('li');
      li.append(el('span', null, 'ABC'.charAt(pos) + ': ' + fill(o.text, who.name) + ' → '),
        el('strong', toneClass(o.amount), signedMoney(o.amount)),
        el('span', null, ' — ' + fill(o.result, who.name)));
      ul.appendChild(li);
    });
    var completed = state.turn + 1;
    $('btn-next').textContent = completed % EVENT_EVERY === 0 ? t('event_incoming') : completed >= state.order.length ? t('see_results') : t('next_decision');
    showView('result');
  }

  function next() {
    if (state.phase !== 'result') return;
    $('rs-others').parentNode.open = false;
    $('rs-lesson-details').open = false;
    var completed = state.turn + 1;
    var evId = completed % EVENT_EVERY === 0 ? state.events[completed / EVENT_EVERY - 1] : null;
    if (!evId) { finishTurn(); return; }
    state.phase = 'dice';
    state.dice = { eventId: evId, roll: null, rerolled: false, currentRules: true };
    save();
    renderPhase();
  }

  function advance() {
    state.dice = null;
    state.hire = null;
    if (state.order.length === GAME_LENGTH && state.turn + 1 === GAME_LENGTH && !state.finale) {
      state.finale = { order: shuffle(Object.keys(STRATEGIES)), plan: null };
      state.phase = 'strategy';
      save();
      renderPhase();
      return;
    }
    state.turn++;
    if (state.turn >= state.order.length) { state.phase = 'end'; save(); renderEnd(); return; }
    state.phase = 'scenario';
    state.optionOrder = shuffle([0, 1, 2]);
    state.selected = null;
    save();
    renderPhase();
  }

  // ---------- dice ----------
  function renderDice(relang) {
    var tx = evText(eventById[state.dice.eventId]);
    $('ev-title').textContent = fill(tx.title, null);
    $('ev-text').textContent = fill(tx.text, null);
    $('ev-odds').textContent = t('ev_odds', { n: tx.outcomes.filter(function (o) { return o.amount > 0; }).length });
    var tb = $('ev-table'); tb.textContent = '';
    tx.outcomes.forEach(function (o, i) {
      var tr = el('tr');
      tr.append(el('td', null, String(i + 1)), el('td', null, fill(o.text, null)), el('td', toneClass(o.amount), signedMoney(o.amount)));
      tb.appendChild(tr);
    });
    showView('dice');
    if (rolling) return; // The running animation reveals the result after landing.
    if (state.dice.roll) {
      if (!relang) window.DiceAnimation.place(state.dice.roll, state.dice.rerolled ? -1 : 1);
      showRoll();
    } else {
      if (!relang) window.DiceAnimation.place(null, -1);
      $('ev-announcement').textContent = '';
      $('btn-roll').classList.remove('hidden');
      $('ev-result').classList.add('hidden');
      $('btn-reroll').classList.add('hidden');
      $('btn-ev-next').classList.add('hidden');
    }
  }

  async function roll() {
    if (state.phase !== 'dice' || rolling) return;
    var previous = state.dice.roll;
    var isReroll = previous !== null;
    if (isReroll && (state.rerollUsed || state.dice.rerolled)) return;
    var action = $(isReroll ? 'btn-reroll' : 'btn-roll');
    var moveFocus = document.activeElement === action;
    rolling = true;
    var value = 1 + Math.floor(Math.random() * 6);
    if (!isReroll) state.dice.currentRules = true;
    state.dice.roll = value;
    if (isReroll) { state.dice.rerolled = true; state.rerollUsed = true; }
    save(); // persist before reveal so a page refresh cannot re-roll for free
    ['btn-roll', 'btn-reroll', 'btn-ev-next'].forEach(function (id) { $(id).classList.add('hidden'); });
    $('ev-result').classList.add('hidden');
    $('ev-rolling').classList.remove('hidden');
    $('ev-announcement').textContent = t('rolling_dice');
    Array.prototype.forEach.call($('ev-table').children, function (tr) { tr.classList.remove('hit'); });
    await window.DiceAnimation.play(previous, value, isReroll ? -1 : 1);
    rolling = false;
    $('ev-rolling').classList.add('hidden');
    showRoll();
    $('ev-announcement').textContent = $('ev-amount').textContent + '. ' + $('ev-outcome').textContent;
    if (moveFocus && (document.activeElement === action || document.activeElement === document.body)) {
      $('btn-ev-next').focus({ preventScroll: true });
    }
    renderHud();
  }

  function showRoll() {
    var o = evText(eventById[state.dice.eventId]).outcomes[state.dice.roll - 1];
    $('btn-roll').classList.add('hidden');
    $('ev-result').classList.remove('hidden');
    var amt = $('ev-amount');
    amt.textContent = t('rolled', { n: state.dice.roll, amount: signedMoney(o.amount) });
    amt.className = 'big-amount ' + toneClass(o.amount);
    $('ev-outcome').textContent = fill(o.text, null);
    Array.prototype.forEach.call($('ev-table').children, function (tr, i) { tr.classList.toggle('hit', i === state.dice.roll - 1); });
    $('btn-reroll').classList.toggle('hidden', state.rerollUsed || state.dice.rerolled);
    var nb = $('btn-ev-next');
    nb.classList.remove('hidden');
    nb.textContent = state.dice.rerolled ? t('continue') : t('accept');
  }

  function acceptRoll() {
    if (state.phase !== 'dice' || !state.dice.roll || rolling) return;
    var amount = eventAmount(eventById[state.dice.eventId], state.dice.roll - 1);
    state.profit += amount;
    state.history.push({
      type: 'dice', n: state.turn + 1, eventId: state.dice.eventId, roll: state.dice.roll,
      rerolled: state.dice.rerolled, amount: amount, profit: state.profit
    });
    finishTurn();
  }

  // ---------- hiring ----------
  function hiringTranslation(n) {
    return (pack(lang).hiring || {})[n] || { candidates: {} };
  }
  function hiringText(values, translated) { return translated || values[LANGS.indexOf(lang)] || values[0]; }

  function finishTurn() {
    var completed = state.turn + 1;
    if (!HIRING[completed] || completed >= state.order.length) { advance(); return; }
    state.dice = null;
    state.hire = { order: shuffle([0, 1, 2]), candidate: null };
    state.phase = 'hiring';
    save();
    renderPhase();
  }

  function updateHireSelection() {
    $('hire-cvs').querySelectorAll('button').forEach(function (button) {
      var selected = Number(button.dataset.candidate) === state.hire.candidate;
      button.setAttribute('aria-pressed', String(selected));
      button.textContent = t(selected ? 'hire_selected' : 'hire_select');
      button.closest('article').classList.toggle('selected', selected);
    });
    $('btn-hire').disabled = state.hire.candidate === null;
  }

  function renderHiring(relang) {
    var round = HIRING[state.turn + 1];
    var localized = hiringTranslation(state.turn + 1);
    var decided = state.phase === 'hire-result';
    $('hire-title').textContent = hiringText(round.title, localized.title);
    $('hire-choose').classList.toggle('hidden', decided);
    $('hire-result').classList.toggle('hidden', !decided);
    if (decided) {
      var choice = round.candidates[state.hire.candidate];
      $('hire-name').textContent = t('hire_chosen', { name: choice.name });
      $('hire-amount').textContent = signedMoney(choice.amount);
      $('hire-amount').className = 'big-amount ' + toneClass(choice.amount);
      $('hire-explanation').textContent = hiringText(choice.result, (localized.candidates[choice.portrait] || {}).result);
    } else {
      $('hire-brief').textContent = hiringText(round.brief, localized.brief);
      var list = $('hire-cvs'); list.textContent = '';
      state.hire.order.forEach(function (candidateIndex) {
        var candidate = round.candidates[candidateIndex];
        var candidateCopy = (localized.candidates[candidate.portrait] || {}).fields || candidate[lang] || candidate.en;
        var card = el('article', 'cv');
        var picture = el('div', 'cv-portrait cv-' + candidate.portrait);
        picture.setAttribute('aria-hidden', 'true');
        var head = el('header', 'cv-head');
        head.append(picture, el('h3', null, candidate.name));
        var fields = el('dl', 'cv-fields');
        ['hire_profile', 'hire_experience', 'hire_qualifications'].forEach(function (label, i) {
          fields.append(el('dt', null, t(label)), el('dd', null, candidateCopy[i]));
        });
        var button = el('button', 'btn ghost cv-select');
        button.type = 'button';
        button.dataset.candidate = candidateIndex;
        button.setAttribute('aria-label', t('hire_select_name', { name: candidate.name }));
        button.onclick = function () {
          if (state.phase !== 'hiring') return;
          state.hire.candidate = candidateIndex;
          save();
          updateHireSelection();
        };
        card.append(head, fields, button);
        list.appendChild(card);
      });
      updateHireSelection();
    }
    showView('hiring');
    if (!relang) $('hire-title').focus({ preventScroll: true });
  }

  function confirmHire() {
    if (state.phase !== 'hiring' || state.hire.candidate === null) return;
    var completed = state.turn + 1;
    var candidate = HIRING[completed].candidates[state.hire.candidate];
    state.profit += candidate.amount;
    state.history.push({
      type: 'hire', n: completed, candidate: state.hire.candidate, amount: candidate.amount, profit: state.profit
    });
    state.phase = 'hire-result';
    save();
    renderPhase();
  }

  // ---------- five-year plan ----------
  function updateStrategySelection() {
    $('strategy-options').querySelectorAll('button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.plan === state.finale.plan));
    });
    $('btn-strategy').disabled = state.finale.plan === null;
  }

  function renderStrategy(relang) {
    var decided = state.phase === 'strategy-result';
    $('strategy-choose').classList.toggle('hidden', decided);
    $('strategy-result').classList.toggle('hidden', !decided);
    $('strategy-brief').classList.toggle('hidden', decided);
    if (decided) {
      var entry = state.history[state.history.length - 1];
      $('strategy-choice').textContent = histChoice(entry);
      $('strategy-explanation').textContent = strategyExplanation(entry);
      $('strategy-amount').textContent = signedMoney(entry.amount);
      $('strategy-amount').className = 'big-amount ' + toneClass(entry.amount);
    } else {
      var balance = $('strategy-balance');
      balance.textContent = money(state.profit);
      balance.className = toneClass(state.profit);
      var list = $('strategy-options'); list.textContent = '';
      state.finale.order.forEach(function (plan, index) {
        var button = el('button', 'strategy-option');
        button.type = 'button';
        button.dataset.plan = plan;
        var letter = el('span', 'strategy-letter', 'ABCD'.charAt(index));
        var copy = el('span', 'strategy-option-copy');
        copy.append(el('strong', null, t('strategy_' + plan + '_title')),
          el('span', null, t('strategy_' + plan + '_text')));
        button.append(letter, copy);
        button.onclick = function () {
          if (state.phase !== 'strategy') return;
          state.finale.plan = plan;
          save();
          updateStrategySelection();
        };
        list.appendChild(button);
      });
      updateStrategySelection();
    }
    showView('strategy');
    if (!relang) $(decided ? 'strategy-choice' : 'strategy-title').focus({ preventScroll: true });
  }

  function strategyExplanation(entry) {
    return t(entry.plan === 'pilot' ? (entry.doubled ? 'strategy_doubled' : 'strategy_recovery') :
      'strategy_' + entry.plan + '_result');
  }

  function confirmStrategy() {
    if (state.phase !== 'strategy' || !state.finale.plan) return;
    var plan = state.finale.plan;
    var doubled = plan === 'pilot' && state.profit > 0;
    var amount = doubled ? state.profit : STRATEGIES[plan];
    state.profit += amount;
    state.history.push({ type: 'strategy', n: state.turn + 1, plan: plan, doubled: doubled, amount: amount, profit: state.profit });
    state.phase = 'strategy-result';
    save();
    renderPhase();
  }

  // ---------- end ----------
  function renderEnd() {
    stopTimer();
    if (activeScreen() !== 'end') show('end');
    $('report-error').textContent = '';
    $('end-biz').textContent = state.biz;
    var bestPossible = state.order.reduce(function (sum, id) {
      return sum + byId[id].options.reduce(function (m, o) { return Math.max(m, o.amount); }, 0);
    }, 0);
    var ladder = RANKS.map(function (r) {
      return { key: r.key, min: r.share === -Infinity ? -Infinity : Math.round(r.share * bestPossible / 1000) * 1000 };
    });
    var rank = ladder.filter(function (r) { return state.profit >= r.min; })[0];
    $('end-rank').textContent = t('rank_' + rank.key);
    $('end-rank-desc').textContent = t('rank_' + rank.key + '_desc');
    var fp = $('end-profit'); fp.textContent = money(state.profit); fp.className = 'value ' + toneClass(state.profit);
    renderRecap();

    var lad = $('end-ladder'); lad.textContent = '';
    ladder.slice().reverse().forEach(function (r) {
      var row = el('div', 'rung' + (r === rank ? ' you' : ''));
      var range = r.min === -Infinity ? t('ladder_below') : r.min === 0 ? t('ladder_zero') : t('ladder_more', { amount: money(r.min) });
      row.append(el('span', null, (r === rank ? '▶ ' : '') + t('rank_' + r.key)), el('span', null, range));
      lad.appendChild(row);
    });

    renderChart();
    renderStats();
    renderAwards();
    renderLog();
  }

  function renderChart() {
    var pts = [0].concat(state.history.map(function (h) { return h.profit; }));
    var W = 800, H = 260, pad = 36;
    var max = Math.max.apply(null, pts), min = Math.min.apply(null, pts);
    if (max === min) { max += 1000; min -= 1000; }
    var x = function (i) { return pad + i * (W - pad * 2) / Math.max(1, pts.length - 1); };
    var y = function (v) { return pad + (max - v) * (H - pad * 2) / (max - min); };
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', t('chart_label'));
    function add(tag, attrs, text) {
      var n = document.createElementNS(NS, tag);
      Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
      if (text) n.textContent = text;
      svg.appendChild(n); return n;
    }
    add('line', { x1: pad, x2: W - pad, y1: y(0), y2: y(0), stroke: 'var(--border)', 'stroke-dasharray': '4 4' });
    add('text', { x: 4, y: y(0) + 4, fill: 'var(--muted)', 'font-size': 12 }, 'RM 0');
    add('text', { x: 4, y: pad - 10, fill: 'var(--muted)', 'font-size': 12 }, money(max));
    add('text', { x: 4, y: H - 8, fill: 'var(--muted)', 'font-size': 12 }, money(min));
    add('polyline', {
      points: pts.map(function (v, i) { return x(i) + ',' + y(v); }).join(' '),
      fill: 'none', stroke: 'var(--primary)', 'stroke-width': 3, 'stroke-linejoin': 'round'
    });
    state.history.forEach(function (h, i) {
      if (h.type !== 'dice') return;
      var c = add('circle', { cx: x(i + 1), cy: y(h.profit), r: 6, fill: h.amount >= 0 ? 'var(--gain)' : 'var(--loss)', stroke: 'var(--panel)', 'stroke-width': 2 });
      var ti = document.createElementNS(NS, 'title'); ti.textContent = histTitle(h) + ': ' + signedMoney(h.amount); c.appendChild(ti);
    });
    var wrap = $('end-chart'); wrap.textContent = ''; wrap.appendChild(svg);
    var legend = el('p', 'hint', t('chart_legend'));
    legend.style.marginTop = '6px';
    wrap.appendChild(legend);
  }

  function statCard(label, value, cls, note) {
    var c = el('div', 'stat-card');
    c.append(el('span', 'label', label), el('span', 'value ' + (cls || ''), value));
    if (note) c.appendChild(el('p', null, note));
    return c;
  }

  function getRecap() {
    var best = null;
    var worst = null;
    var bonusTotal = 0;
    state.history.forEach(function (h) {
      if (h.amount > 0 && (!best || h.amount > best.amount)) best = h;
      if (h.amount < 0 && (!worst || h.amount < worst.amount)) worst = h;
      bonusTotal += h.bonus || 0;
    });
    return { best: best, worst: worst, bonusTotal: bonusTotal };
  }

  function renderRecap() {
    var recap = getRecap();
    var best = recap.best;
    var worst = recap.worst;
    var box = $('end-recap'); box.textContent = '';
    box.append(
      best ? statCard(t('recap_gain'), signedMoney(best.amount), 'pos', histTitle(best)) :
        statCard(t('recap_gain'), t('recap_no_gain')),
      worst ? statCard(t('recap_loss'), signedMoney(worst.amount), 'neg', histTitle(worst)) :
        statCard(t('recap_loss'), t('recap_no_loss')),
      statCard(t('recap_bonuses'), money(recap.bonusTotal), toneClass(recap.bonusTotal))
    );
  }

  function renderStats() {
    var sc = state.history.filter(function (h) { return h.type === 'scenario'; });
    var dice = state.history.filter(function (h) { return h.type === 'dice'; });
    var count = function (o) { return sc.filter(function (h) { return h.outcome === o; }).length; };
    var diceNet = dice.reduce(function (s, h) { return s + h.amount; }, 0);
    var decisionNet = sc.reduce(function (s, h) { return s + h.amount; }, 0);
    var box = $('end-stats'); box.textContent = '';
    box.append(
      statCard(t('stat_calls'), t('stat_calls_val', { a: count('gain'), b: sc.length }), 'pos', t('stat_calls_note', { n: count('neutral'), m: count('loss') })),
      statCard(t('stat_decisions'), money(decisionNet), toneClass(decisionNet), t('stat_decisions_note')),
      statCard(t('stat_luck'), signedMoney(diceNet), toneClass(diceNet), t('stat_luck_note', { n: dice.length })),
      statCard(t('stat_reroll'), state.rerollUsed ? t('stat_reroll_used') : t('stat_reroll_never'), '', state.rerollUsed ? t('stat_reroll_used_note') : t('stat_reroll_never_note'))
    );
    var hires = state.history.filter(function (h) { return h.type === 'hire'; });
    if (hires.length) {
      var hiringNet = hires.reduce(function (sum, h) { return sum + h.amount; }, 0);
      box.appendChild(statCard(t('stat_hiring'), signedMoney(hiringNet), toneClass(hiringNet)));
    }
    var strategy = state.history.find(function (h) { return h.type === 'strategy'; });
    if (strategy) {
      box.appendChild(statCard(t('strategy_stat'), signedMoney(strategy.amount), toneClass(strategy.amount), histChoice(strategy)));
    }
  }

  function renderAwards() {
    var people = state.members.map(function (m, i) { return { idx: i, name: m.name, role: roleName(m.role), total: 0, n: 0, wins: 0 }; });
    var team = { idx: -1, name: t('whole_team'), role: t('group_decisions'), total: 0, n: 0, wins: 0 };
    state.history.forEach(function (h) {
      if (h.type !== 'scenario') return;
      var p = h.forIdx < 0 ? team : people[h.forIdx];
      p.total += h.amount; p.n++; if (h.outcome === 'gain') p.wins++;
    });
    var ranked = people.filter(function (p) { return p.n > 0; });
    var mvp = ranked.slice().sort(function (a, b) { return b.total - a.total; })[0];
    var sharp = ranked.filter(function (p) { return p.n >= 3; }).sort(function (a, b) { return b.wins / b.n - a.wins / a.n; })[0];
    var box = $('end-awards'); box.textContent = '';
    people.concat([team]).forEach(function (p) {
      var isMvp = p === mvp && people.length > 1 && p.total > 0;
      var c = el('div', 'award' + (isMvp ? ' mvp' : ''));
      if (isMvp) c.appendChild(el('div', 'trophy', t('award_mvp')));
      else if (p === sharp && people.length > 1 && p.wins > 0) c.appendChild(el('div', 'trophy', t('award_sharp')));
      var head = el('div', 'team-card');
      head.style.cssText = 'background:none;border:none;padding:0;margin:6px 0';
      var tx = el('div'); tx.append(el('div', 'who', p.name), el('div', 'role', p.role));
      head.append(avatar(p.idx, p.name), tx);
      c.appendChild(head);
      c.appendChild(el('div', 'value ' + toneClass(p.total), signedMoney(p.total)));
      c.appendChild(el('p', 'hint', p.n ? t('award_note', { n: p.n, w: p.wins, p: Math.round(p.wins / p.n * 100) }) : t('award_none')));
      box.appendChild(c);
    });
  }

  function renderLog() {
    var tb = $('end-log'); tb.textContent = '';
    state.history.forEach(function (h) {
      var tr = el('tr');
      var amount = el('td', toneClass(h.amount), signedMoney(h.amount));
      if (h.bonus) amount.appendChild(el('span', 'log-bonus', t('log_bonus', { amount: money(h.bonus) })));
      tr.append(
        el('td', null, h.type === 'dice' ? '🎲' : h.type === 'strategy' ? '—' : String(h.n)),
        el('td', null, histTitle(h)),
        el('td', null, forName(h)),
        el('td', null, histChoice(h)),
        amount
      );
      tb.appendChild(tr);
    });
  }

  function downloadReport() {
    if (!state || state.phase !== 'end') return;
    $('report-error').textContent = '';
    var recap = getRecap();
    var decisions = state.history.filter(function (h) { return h.type === 'scenario'; });
    var good = decisions.filter(function (h) { return h.outcome === 'gain'; }).length;
    var strategy = state.history.find(function (h) { return h.type === 'strategy'; });
    try {
      window.BizSimReport.download({
        title: t('report_title'),
        business: state.biz,
        product: t('selling', { product: state.product }),
        rank: $('end-rank').textContent,
        profitLabel: t('final_profit'),
        profit: money(state.profit),
        loss: state.profit < 0,
        chartTitle: t('chart_title'),
        chartLegend: t('chart_legend'),
        history: state.history,
        formatMoney: money,
        recapTitle: t('recap_title'),
        metrics: [
          { label: t('recap_gain'), value: recap.best ? signedMoney(recap.best.amount) : t('recap_no_gain'),
            note: recap.best ? histTitle(recap.best) : '', tone: 'gain' },
          { label: t('recap_loss'), value: recap.worst ? signedMoney(recap.worst.amount) : t('recap_no_loss'),
            note: recap.worst ? histTitle(recap.worst) : '', tone: 'loss' },
          { label: t('stat_calls'), value: t('stat_calls_val', { a: good, b: decisions.length }) },
          { label: t('recap_bonuses'), value: money(recap.bonusTotal) }
        ],
        strategy: strategy ? {
          title: t('strategy_stat'), choice: histChoice(strategy), amount: signedMoney(strategy.amount),
          outcome: strategyExplanation(strategy)
        } : null,
        teamTitle: t('team_title'),
        team: state.members.map(function (member) { return { name: member.name, role: roleName(member.role) }; }),
        reflectionTitle: t('report_reflection'),
        reflection: t('recap_prompt')
      });
    } catch {
      $('report-error').textContent = t('report_error');
    }
  }

  // ---------- wiring ----------
  function init() {
    try { var saved = localStorage.getItem(LANG_KEY); if (LANGS.indexOf(saved) >= 0) lang = saved; } catch (e) { /* ignore */ }
    applyStatic();
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.onclick = function () { setLang(b.getAttribute('data-lang')); };
    });
    if (!SCENARIOS.length || !EVENTS.length) { $('setup-error').textContent = t('err_load'); return; }

    addMemberRow('', 'ceo'); addMemberRow('', 'marketing'); addMemberRow('', 'finance');
    $('btn-add-member').onclick = function () { addMemberRow(); };
    renderResumeBox();
    $('btn-discard').onclick = function () { clearSave(); $('resume-box').classList.add('hidden'); };

    $('setup-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var cfg = readSetup();
      if (cfg.error) { $('setup-error').textContent = cfg.error; return; }
      $('setup-error').textContent = '';
      newGame(cfg);
      renderIntro();
      show('intro');
    });
    $('btn-begin').onclick = function () { renderPhase(); };
    $('btn-pause').onclick = togglePause;
    $('btn-lock').onclick = lockIn;
    $('btn-next').onclick = next;
    $('btn-roll').onclick = roll;
    $('btn-reroll').onclick = roll;
    $('btn-ev-next').onclick = acceptRoll;
    $('btn-hire').onclick = confirmHire;
    $('btn-hire-next').onclick = function () { if (state.phase === 'hire-result') advance(); };
    $('btn-strategy').onclick = confirmStrategy;
    $('btn-strategy-end').onclick = function () { if (state.phase === 'strategy-result') advance(); };
    $('btn-report').onclick = downloadReport;
    $('btn-print').onclick = function () { $('end-log').closest('details').open = true; window.print(); };
    $('btn-restart').onclick = function () {
      if (!confirm(t('confirm_restart'))) return;
      clearSave(); state = null;
      show('setup');
      renderResumeBox();
    };

    // Keyboard shortcuts for projector use: 1/2/3 or A/B/C to pick, Enter to confirm, Space to roll.
    document.addEventListener('keydown', function (e) {
      if (!state || activeScreen() !== 'game') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      var k = e.key.toLowerCase();
      if ((k === 'enter' || k === ' ') && e.target.closest('button, summary')) return;
      if (state.phase === 'scenario') {
        if (isPaused()) return;
        var pos = { '1': 0, '2': 1, '3': 2, a: 0, b: 1, c: 2 }[k];
        if (pos !== undefined) { selectOption(pos); e.preventDefault(); }
        else if (k === 'enter') { lockIn(); e.preventDefault(); }
      } else if (state.phase === 'result' && k === 'enter') { next(); e.preventDefault(); }
      else if (state.phase === 'dice') {
        if ((k === ' ' || k === 'enter') && !state.dice.roll) { roll(); e.preventDefault(); }
        else if (k === 'enter' && state.dice.roll && !rolling) { acceptRoll(); e.preventDefault(); }
      }
    });
  }

  init();
})();
