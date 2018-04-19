import AbstractView from '../abstract-view';
import TimerView from '../components/timer-view';
import LivesView from '../components/lives-view';
import PlayerView from '../components/player-view';

export default class ArtistLevelView extends AbstractView {
  constructor(state, audioArray) {
    super();
    this.state = state;
    this.audioArray = audioArray;
  }

  get template() {
    const timer = new TimerView(this.state);
    const lives = new LivesView(this.state);
    const player = new PlayerView(this.audioArray.song);

    return (
      `<section class="main main--level main--level-artist">
        ${timer.template}
        ${lives.template}
    
        <div class="main-wrap">
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
          ${player.template}
          <form class="main-list">
            ${this.audioArray.questions.map((audio, i) => {
        const index = i + 1;
        return (
          `<div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${audio.artist}"/>
              <label class="main-answer" for="answer-${index}">
                <img class="main-answer-preview" src=${audio.image}
                     alt=${audio.artist} width="134" height="134">
                ${audio.artist}
              </label>
            </div>`
        );
      }).join(``)}
          </form>
        </div>
      </section>`
    );
  }

  getAnswersAndShowLevel() {}

  bind() {
    const form = this.element.querySelector(`.main-list`);

    form.addEventListener(`change`, (event) => {
      this.getAnswersAndShowLevel(event);
    });
  }
}
