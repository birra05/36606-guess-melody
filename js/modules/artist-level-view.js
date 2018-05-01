import AbstractView from '../abstract-view';
import TimerView from '../components/timer-view';
import LivesView from '../components/lives-view';

export default class ArtistLevelView extends AbstractView {
  constructor(state, questionObject) {
    super();
    this.state = state;
    this.questions = questionObject;
    this.timer = new TimerView(this.state.time);
    this.lives = new LivesView(this.state);
  }

  get template() {
    return (
      `<section class="main main--level main--level-artist">
        ${this.timer.template}
        ${this.lives.template}
    
        <div class="main-wrap">
          <h2 class="title main-title">${this.questions.question}</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src=${this.questions.src}></audio>
              <button class="player-control" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${this.questions.answers.map((audio, i) => {
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

  onSubmit() {}

  bind() {
    const form = this.element.querySelector(`.main-list`);
    const playBtn = this.element.querySelector(`.player-control`);
    const song = this.element.querySelector(`audio`);

    playBtn.addEventListener(`click`, (event) => {
      event.preventDefault();
      const isPlay = playBtn.classList.toggle(`player-control--pause`);

      if (isPlay) {
        song.play();
      } else {
        song.pause();
      }
    });

    form.addEventListener(`change`, (event) => {
      event.target.checked = false;
      this.onSubmit(event.target.value);
    });
  }
}
