import AbstractView from '../abstract-view';

export default class TimerView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.ONE_MINUTE = 60;
    this.minutes = String(Math.floor(this.state.time / this.ONE_MINUTE));
    this.seconds = String(this.state.time % this.ONE_MINUTE);
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
          <span class="timer-value-mins">${this.minutes.length === 1 ? `0` + this.minutes : this.minutes}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${this.seconds.length === 1 ? `0` + this.seconds : this.seconds}</span>
        </div>
      </svg>`
    );
  }
}
