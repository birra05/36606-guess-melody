import AbstractView from '../abstract-view';

export default class PlayerView extends AbstractView {
  constructor(audioSrc) {
    super();
    this.audioSrc = audioSrc;
  }

  get template() {
    return (
      `<div class="player-wrapper">
        <div class="player">
          <audio src=${this.audioSrc}></audio>
          <button class="player-control player-control--pause" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`
    );
  }
}
