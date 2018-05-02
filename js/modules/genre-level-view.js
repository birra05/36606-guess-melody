import AbstractView from '../abstract-view';
import TimerView from '../components/timer-view';
import LivesView from '../components/lives-view';

export default class GenreLevelView extends AbstractView {
  constructor(state, questionObject) {
    super();
    this.state = state;
    this.questions = questionObject;
    this.timer = new TimerView(this.state.time);
    this.lives = new LivesView(this.state);
  }

  get template() {
    return (
      `<section class="main main--level main--level-genre">
        ${this.timer.template}
        ${this.lives.template}
    
        <div class="main-wrap">
          <h2 class="title">${this.questions.question}</h2>
          <form class="genre">
            ${this.questions.answers.map((audio, i) => {
        const index = i + 1;
        return (
          `<div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio src=${audio.src}></audio>
                  <button class="player-control" type="button"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="${audio.genre}" id="a-${index}">
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

  onSubmit() {}

  bind() {
    const form = this.element.querySelector(`.genre`);
    const answers = Array.from(form.elements.answer);
    const sendButton = form.querySelector(`.genre-answer-send`);
    sendButton.disabled = true;

    const players = Array.from(form.querySelectorAll(`.player`));

    form.addEventListener(`click`, (event) => {
      const target = event.target;
      if (!target.classList.contains(`player-control`)) {
        return;
      }
      const currentPlayer = target.closest(`.player`);
      const currentSong = currentPlayer.querySelector(`audio`);
      if (currentSong.paused) {
        players.forEach((element) => {
          const control = element.querySelector(`.player-control`);
          const song = element.querySelector(`audio`);
          if (control === target) {
            control.classList.add(`player-control--pause`);
            song.play();
          } else {
            control.classList.remove(`player-control--pause`);
            song.pause();
          }
        });
      } else {
        target.classList.remove(`player-control--pause`);
        currentSong.pause();
      }
    });

    form.addEventListener(`change`, () => {
      sendButton.disabled = !answers.some((checkbox) => checkbox.checked);
    });

    form.addEventListener(`submit`, (event) => {
      event.preventDefault();
      const checkedCheckboxes = answers.filter((checkbox) => checkbox.checked);
      const userAnswers = checkedCheckboxes.map((checkbox) => checkbox.value);
      answers.forEach((element) => {
        element.checked = false;
      });
      sendButton.disabled = true;
      this.onSubmit(...userAnswers);
    });
  }
}
