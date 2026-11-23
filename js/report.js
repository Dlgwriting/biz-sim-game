/* Create a print-sized PDF in the browser, using the same font fallback as the game. */
(function () {
  'use strict';

  const A4_WIDTH = 595;
  const A4_HEIGHT = 842;
  const MARGIN = 38;
  const WIDTH = A4_WIDTH - 2 * MARGIN;
  const SCALE = 3;
  const INK = '#172d27';
  const GREEN = '#185c49';
  const MUTED = '#4a5e55';
  const BORDER = '#d6d9cc';
  const LOSS = '#9f4134';

  function renderSheet(report) {
    const draft = document.createElement('canvas');
    draft.width = WIDTH * SCALE;
    draft.height = 1100 * SCALE;
    const ctx = draft.getContext('2d');
    ctx.scale(SCALE, SCALE);
    ctx.textBaseline = 'top';
    const fontFamily = getComputedStyle(document.body).fontFamily;
    const words = typeof Intl.Segmenter === 'function'
      ? new Intl.Segmenter(document.documentElement.lang, { granularity: 'word' }) : null;

    function font(size, weight) {
      ctx.font = weight + ' ' + size + 'px ' + fontFamily;
    }

    function wrap(text, width, size, weight) {
      font(size, weight);
      const pieces = words ? Array.from(words.segment(text), part => part.segment) : text.split(/(\s+)/);
      const lines = [];
      let line = '';
      for (const piece of pieces) {
        if (!line && !piece.trim()) continue;
        if (ctx.measureText(line + piece).width <= width) {
          line += piece;
          continue;
        }
        if (line.trim()) lines.push(line.trimEnd());
        line = '';
        for (const letter of piece.trimStart()) {
          if (ctx.measureText(line + letter).width > width && line) {
            lines.push(line);
            line = '';
          }
          line += letter;
        }
      }
      if (line.trim()) lines.push(line.trimEnd());
      return lines;
    }

    function drawLines(lines, x, y, size, weight, color = INK) {
      font(size, weight);
      ctx.fillStyle = color;
      lines.forEach((line, index) => ctx.fillText(line, x, y + index * (size + 4)));
      return lines.length * (size + 4);
    }

    function text(value, x, y, width, size, weight = 400, color = INK) {
      return drawLines(wrap(value, width, size, weight), x, y, size, weight, color);
    }

    function rule(x1, y1, x2, y2, color = BORDER) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    let y = text('BizSim Tycoon', 0, 0, WIDTH, 11, 700, GREEN) + 4;
    y += text(report.title, 0, y, WIDTH, 30, 800) + 13;

    // Financial headline. Measure both columns so long names can wrap.
    const nameWidth = WIDTH - 205;
    const name = wrap(report.business, nameWidth, 22, 800);
    const product = wrap(report.product, nameWidth, 10, 400);
    const rank = wrap(report.rank, nameWidth, 11, 700);
    const profitLabel = wrap(report.profitLabel, 163, 10, 600);
    const profit = wrap(report.profit, 163, 25, 800);
    const headlineHeight = 32 + Math.max(
      name.length * 26 + product.length * 14 + rank.length * 15 + 4,
      profitLabel.length * 14 + profit.length * 29 + 5
    );
    ctx.fillStyle = '#e5efe7';
    ctx.fillRect(0, y, WIDTH, headlineHeight);
    ctx.fillStyle = GREEN;
    ctx.fillRect(0, y, 4, headlineHeight);
    let left = y + 16;
    left += drawLines(name, 16, left, 22, 800) + 2;
    left += drawLines(product, 16, left, 10, 400, MUTED) + 2;
    drawLines(rank, 16, left, 11, 700, GREEN);
    const valueX = WIDTH - 177;
    const valueY = y + 16 + drawLines(profitLabel, valueX, y + 16, 10, 600, MUTED) + 5;
    drawLines(profit, valueX, valueY, 25, 800, report.loss ? LOSS : GREEN);
    y += headlineHeight + 19;

    y += text(report.chartTitle, 0, y, WIDTH, 14, 800) + 7;
    const values = [0].concat(report.history.map(entry => entry.profit));
    let min = Math.min(...values);
    let max = Math.max(...values);
    if (min === max) { min -= 1000; max += 1000; }
    const plotHeight = 106;
    const x = index => 75 + index * (WIDTH - 82) / Math.max(1, values.length - 1);
    const plotY = value => y + (max - value) * plotHeight / (max - min);
    for (const value of [max, min]) {
      const lineY = plotY(value);
      text(report.formatMoney(value), 0, lineY - 5, 72, 8, 600, MUTED);
      rule(x(0), lineY, WIDTH - 7, lineY);
    }
    const zero = plotY(0);
    ctx.setLineDash([3, 3]);
    rule(x(0), zero, WIDTH - 7, zero, '#9aa99b');
    ctx.setLineDash([]);
    if (zero - y > 14 && y + plotHeight - zero > 14) {
      text(report.formatMoney(0), 0, zero - 5, 72, 8, 600, MUTED);
    }
    ctx.beginPath();
    values.forEach((value, index) => index === 0 ? ctx.moveTo(x(index), plotY(value)) : ctx.lineTo(x(index), plotY(value)));
    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();
    report.history.forEach((entry, index) => {
      if (entry.type !== 'dice') return;
      ctx.beginPath();
      ctx.arc(x(index + 1), plotY(values[index + 1]), 2.5, 0, Math.PI * 2);
      ctx.fillStyle = entry.amount >= 0 ? GREEN : LOSS;
      ctx.fill();
    });
    y += plotHeight + 10;
    y += text(report.chartLegend, 0, y, WIDTH, 8.5, 400, MUTED) + 16;

    y += text(report.recapTitle, 0, y, WIDTH, 14, 800) + 5;
    const column = (WIDTH - 16) / 2;
    for (let i = 0; i < report.metrics.length; i += 2) {
      const height = Math.max(...report.metrics.slice(i, i + 2).map((metric, index) => {
        const left = index * (column + 16);
        rule(left, y, left + column, y);
        let cursor = y + 7;
        cursor += text(metric.label, left, cursor, column, 9, 600, MUTED);
        const color = metric.tone === 'loss' ? LOSS : metric.tone === 'gain' ? GREEN : INK;
        cursor += text(metric.value, left, cursor, column, 14, 800, color);
        if (metric.note) cursor += text(metric.note, left, cursor, column, 9.5, 400, MUTED);
        return cursor - y;
      }));
      y += height + 6;
    }

    if (report.strategy) {
      y += 7;
      y += text(report.strategy.title, 0, y, WIDTH, 14, 800) + 3;
      y += text(report.strategy.choice + '  ·  ' + report.strategy.amount, 0, y, WIDTH, 11, 700, GREEN);
      y += text(report.strategy.outcome, 0, y, WIDTH, 10, 400, MUTED) + 12;
    }

    y += 6;
    y += text(report.teamTitle, 0, y, WIDTH, 14, 800) + 6;
    for (let i = 0; i < report.team.length; i += 2) {
      const heights = report.team.slice(i, i + 2).map((member, index) =>
        text(member.name + ' · ' + member.role, index * (column + 16), y, column, 10));
      y += Math.max(...heights) + 3;
    }

    y += 10;
    rule(0, y, WIDTH, y);
    y += 10 + text(report.reflectionTitle, 0, y + 10, WIDTH, 12, 800);
    y += text(report.reflection, 0, y, WIDTH, 10, 400, MUTED);
    for (let line = 0; line < 2; line++) {
      y += 17;
      rule(0, y, WIDTH, y);
    }
    y += 1;

    const page = document.createElement('canvas');
    page.width = A4_WIDTH * SCALE;
    page.height = A4_HEIGHT * SCALE;
    const paper = page.getContext('2d');
    paper.scale(SCALE, SCALE);
    paper.fillStyle = '#ffffff';
    paper.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);
    const fit = Math.min(1, (A4_HEIGHT - 2 * MARGIN) / y);
    paper.drawImage(draft, 0, 0, draft.width, y * SCALE,
      (A4_WIDTH - WIDTH * fit) / 2, MARGIN, WIDTH * fit, y * fit);
    return page;
  }

  function pdfFromSheet(sheet, title) {
    const photo = sheet.toDataURL('image/jpeg', .94).split(',')[1];
    const bytes = Uint8Array.from(atob(photo), value => value.charCodeAt(0));
    const encoder = new TextEncoder();
    const parts = [];
    const offsets = [0];
    let length = 0;
    function append(value) {
      const chunk = typeof value === 'string' ? encoder.encode(value) : value;
      parts.push(chunk);
      length += chunk.byteLength;
    }
    function object(body, stream) {
      offsets.push(length);
      append((offsets.length - 1) + ' 0 obj\n' + body);
      if (stream) {
        append('\nstream\n');
        append(stream);
        append('\nendstream');
      }
      append('\nendobj\n');
    }

    append('%PDF-1.4\n');
    append(new Uint8Array([37, 226, 227, 207, 211, 10]));
    object('<< /Type /Catalog /Pages 2 0 R >>');
    object('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    object('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Sheet 4 0 R >> >> /Contents 5 0 R >>');
    object('<< /Type /XObject /Subtype /Image /Width ' + sheet.width + ' /Height ' + sheet.height +
      ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + bytes.byteLength + ' >>', bytes);
    const draw = encoder.encode('q\n595.28 0 0 841.89 0 0 cm\n/Sheet Do\nQ');
    object('<< /Length ' + draw.byteLength + ' >>', draw);
    const titleHex = 'FEFF' + title.split('').map(code => code.charCodeAt(0).toString(16).padStart(4, '0')).join('');
    object('<< /Title <' + titleHex + '> /Creator (BizSim Tycoon) >>');
    const crossReference = length;
    append('xref\n0 ' + offsets.length + '\n0000000000 65535 f \n');
    offsets.slice(1).forEach(offset => append(String(offset).padStart(10, '0') + ' 00000 n \n'));
    append('trailer\n<< /Size ' + offsets.length + ' /Root 1 0 R /Info 6 0 R >>\nstartxref\n' + crossReference + '\n%%EOF\n');
    return new Blob(parts, { type: 'application/pdf' });
  }

  function download(report) {
    const sheet = renderSheet(report);
    const pdf = pdfFromSheet(sheet, report.title + ' – ' + report.business);
    const name = report.business.replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').trim();
    const url = URL.createObjectURL(pdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BizSim - ' + name + '.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  window.BizSimReport = { download };
})();
