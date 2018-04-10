import {InitialGame} from '../utils';

const timerValue = (time) => {
  const ONE_MINUTE = 60;
  const num = (value) => {
    value = Math.floor(value);
    return value < 10 ? `0` + value : value;
  };

  let minutes;
  let seconds;
  if (time > ONE_MINUTE) {
    minutes = num(time / 60);
  } else {
    minutes = 0;
  }
  seconds = num(time % ONE_MINUTE);
  return `<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${minutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${seconds}</span>
      </div>`;
};

const timer = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">  
      </circle>
      ${timerValue(InitialGame.TIME)}
    </svg>`;

export default timer;
