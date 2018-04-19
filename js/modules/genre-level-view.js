import AbstractView from '../abstract-view';
import TimerView from '../components/timer-view';
import LivesView from '../components/lives-view';
import PlayerView from '../components/player-view';

export default class GenreLevelView extends AbstractView {
  constructor(state, audioArray) {
    super();
    this.state = state;
    this.audioArray = audioArray;
  }

  get template() {
    const timer = new TimerView(this.state);
    const lives = new LivesView(this.state);

    return (
      `<section class="main main--level main--level-genre">
        ${timer.template}
        ${lives.template}
    
        <div class="main-wrap">
          <h2 class="title">Выберите ${this.audioArray.genre} треки</h2>
          <form class="genre">
            ${this.audioArray.questions.map((audio, i) => {
        const index = i + 1;
        const player = new PlayerView(audio.src);
        return (
          `<div class="genre-answer">
              ${player.template}
              <input type="checkbox" name="answer" value="${audio.name}" id="a-${index}">
              <label class="genre-answer-check" for="a-${index}"></label>
            </div>`
        );
      }).join(``)}
            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
      </section>`
    );
  }

  getAnswers() {}
  showLevel() {}

  bind() {
    const form = this.element.querySelector(`.genre`);

    form.addEventListener(`change`, (event) => {
      this.getAnswers(event);
    });

    form.addEventListener(`submit`, () => {
      this.showLevel();
    });
  }
}
