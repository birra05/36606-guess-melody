import AbstractView from '../abstract-view';

const ONE_MINUTE = 60;
const LAST_SECONDS = 30;

const formatTime = (value) => {
  return value.length === 1 ? `0` + value : value;
};

export default class TimerView extends AbstractView {
  constructor(time) {
    super();
    this.time = time;
    this.minutes = String(Math.floor(this.time / ONE_MINUTE));
    this.seconds = String(this.time % ONE_MINUTE);
    this.formattedMinutes = formatTime(this.minutes);
    this.formattedSeconds = formatTime(this.seconds);
  }

  get template() {
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">  
        </circle>
      </svg>
      <div class="time-counter" xmlns="http://www.w3.org/1999/xhtml">
           <span class="time-counter-mins">${this.formattedMinutes}</span><!--
        --><span class="time-counter-dots">:</span><!--
        --><span class="time-counter-secs">${this.formattedSeconds}</span>
      </div>`
    );
  }

  static update(time) {
    const timerValue = document.querySelector(`.time-counter`);
    const minutesValue = timerValue.querySelector(`.time-counter-mins`);
    const secondsValue = timerValue.querySelector(`.time-counter-secs`);
    const minutes = String(Math.floor(time / ONE_MINUTE));
    const seconds = String(time % ONE_MINUTE);
    if (time < LAST_SECONDS) {
      timerValue.classList.add(`time-counter--finished`);
    }
    minutesValue.innerHTML = formatTime(minutes);
    secondsValue.innerHTML = formatTime(seconds);
  }
}
