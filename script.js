// ---- SETTINGS ----
// Secret order, 0-indexed, left to right (0 = first button, 4 = fifth).
// Current code: 3rd, 5th, 1st, 4th, 2nd button.
const CODE = [1, 4, 0, 3, 2];

const MSG_START = 'Press the buttons in the right order.';
const MSG_WRONG = 'The buttons reset with a click. Try again.';
const MSG_WIN   = 'Unlocked. The lid slides open...';
// ------------------

const panel = document.getElementById('panel');
const msg   = document.getElementById('msg');
let step = 0;
const btns = [];

// Build the five buttons
for (let i = 0; i < 5; i++) {
  const slot = document.createElement('div');
  slot.className = 'slot';

  const b = document.createElement('button');
  b.className = 'btn';
  b.setAttribute('aria-label', 'Button ' + (i + 1));
  b.onclick = () => press(i);

  const lamp = document.createElement('div');
  lamp.className = 'lamp';

  slot.append(b, lamp);
  panel.append(slot);
  btns.push(b);
}

function press(i) {
  if (step >= CODE.length) return;        // already solved
  if (i === CODE[step]) {                  // correct: lock it
    btns[i].classList.add('locked');
    step++;
    if (step === CODE.length) {
      panel.classList.add('won');
      msg.className = 'ok';
      msg.textContent = MSG_WIN;
    } else {
      msg.textContent = 'Locked in: ' + step + ' of ' + CODE.length;
    }
  } else {                                 // wrong: unlock everything
    reset(true);
  }
}

function reset(wrong) {
  step = 0;
  btns.forEach(b => b.classList.remove('locked'));
  panel.classList.remove('won', 'shake');
  msg.className = '';
  if (wrong) {
    void panel.offsetWidth;                // restart shake animation
    panel.classList.add('shake');
    msg.textContent = MSG_WRONG;
  } else {
    msg.textContent = MSG_START;
  }
}

document.getElementById('reset').onclick = () => reset(false);
