import AbstractView from '../abstract-view';

export default class PlayerView extends AbstractView {
  constructor(audio) {
    super();
    this.audio = audio;
  }

  get template() {
    return (
      `<div class="player-wrapper">
        <div class="player">
          <audio src=${this.audio}></audio>
          <button class="player-control player-control--pause" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`
    );
  }
}
