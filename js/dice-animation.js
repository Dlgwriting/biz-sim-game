/* Animate a result already chosen by the game. The pose and the path share a timeline. */
(function () {
  'use strict';

  const faceAngles = [[0, 0], [90, 0], [0, -90], [0, 90], [-90, 0], [0, 180]];
  const duration = 1480;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const track = document.getElementById('dice-track');
  const shadowTrack = document.getElementById('dice-shadow-track');
  const shadow = document.getElementById('dice-shadow');
  const impact = document.getElementById('dice-impact');
  const cube = document.getElementById('dice');

  // Time, distance, height in die widths, rotation progress, and edge rock.
  const frames = [
    [0,    0,     0,    0,     0],
    [.05,  .018,  .02,  0,     8],
    [.10, -.015,  0,    0,    -9],
    [.15,  .022,  .05,  .012,  9],
    [.20,  0,     .02,  .015, -9, 'ease-out'],
    [.32,  .23,   .66,  .26,   0, 'ease-in'],
    [.46,  .54,   .10,  .54,   0, 'ease-out'],
    [.56,  .71,   .34,  .70,   0, 'ease-in'],
    [.65,  .83,   .06,  .84,   0, 'ease-out'],
    [.73,  .92,   .17,  .94,   0, 'ease-in'],
    [.81,  1,     .025, 1,     9, 'ease-out'],
    [.89,  1,     .01,  1,    -5, 'ease-out'],
    [.95,  1,     0,    1,     2, 'ease-out'],
    [1,    1,     0,    1,     0]
  ];

  function position(side) {
    return 'translate3d(calc(var(--dice-travel) * ' + side + '), 0, 0)';
  }

  function pose(side, pitch, yaw, spin) {
    return 'rotateX(-17deg) rotateY(' + (-14 * side) + 'deg) rotateZ(' + spin +
      'deg) rotateX(' + pitch + 'deg) rotateY(' + yaw + 'deg)';
  }

  function place(face, side) {
    const [pitch, yaw] = faceAngles[(face || 1) - 1];
    const visibleSide = motionPreference.matches ? 0 : side;
    track.style.transform = position(visibleSide);
    shadowTrack.style.transform = position(visibleSide);
    cube.style.transform = pose(visibleSide, pitch, yaw, 0);
    cube.querySelectorAll('.face').forEach(function (element, index) {
      element.classList.toggle('is-result', index === face - 1);
    });
  }

  async function play(previousFace, result, landingSide) {
    if (motionPreference.matches || typeof track.animate !== 'function') {
      place(result, landingSide);
      return;
    }

    const [startPitch, startYaw] = faceAngles[(previousFace || 1) - 1];
    const [endPitch, endYaw] = faceAngles[result - 1];
    const startSide = -landingSide;
    const animations = [];
    const timing = { duration: duration, fill: 'both' };
    const path = frames.map(function ([offset, distance, lift, turn, rock, easing = 'linear']) {
      return { offset, side: startSide + 2 * landingSide * distance, lift, turn, rock, easing };
    });
    cube.querySelector('.is-result')?.classList.remove('is-result');
    try {
      const travel = path.map(function ({offset, side}) { return { offset, transform: position(side) }; });
      animations.push(track.animate(travel, timing), shadowTrack.animate(travel, timing));
      animations.push(cube.animate(path.map(function ({offset, side, turn, rock}) {
        const pitch = startPitch + (endPitch + 360 - startPitch) * turn;
        const yaw = startYaw + (endYaw + 360 * landingSide - startYaw) * turn;
        return { offset, transform: pose(side, pitch, yaw, landingSide * (360 * turn + rock)) };
      }), timing));
      animations.push(cube.animate(path.map(function ({offset, lift, easing}) {
        return { offset, easing, translate: '0 calc(var(--die-size) * ' + -lift + ')' };
      }), timing));
      animations.push(shadow.animate(path.map(function ({offset, lift, easing}) {
        return { offset, easing, opacity: 1 - lift * .9, transform: 'scale(' + (1 + lift * .42) + ')' };
      }), timing));
      animations.push(impact.animate([
        { offset: 0, opacity: 0, transform: 'scale(.8)' },
        { offset: .79, opacity: 0, transform: 'scale(.8)' },
        { offset: .83, opacity: .55, transform: 'scale(1)' },
        { offset: 1, opacity: 0, transform: 'scale(1.65)' }
      ], timing));
      await Promise.all(animations.map(function (animation) { return animation.finished; }));
    } catch {
      // A cancelled or unsupported animation still reveals the saved roll.
    } finally {
      place(result, landingSide);
      animations.forEach(function (animation) { animation.cancel(); });
    }
  }

  window.DiceAnimation = { place, play };
})();
