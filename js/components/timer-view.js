import AbstractView from '../abstract-view';

const ONE_MINUTE = 60;

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
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${this.formattedMinutes}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${this.formattedSeconds}</span>
        </div>
      </svg>`
    );
  }

  update(time) {
    const timerValue = document.querySelector(`.timer-value`);
    const minutesValue = timerValue.querySelector(`.timer-value-mins`);
    const secondsValue = timerValue.querySelector(`.timer-value-secs`);
    const minutes = String(Math.floor(time / ONE_MINUTE));
    const seconds = String(time % ONE_MINUTE);
    minutesValue.textContent = formatTime(minutes);
    secondsValue.textContent = formatTime(seconds);
  }
}
