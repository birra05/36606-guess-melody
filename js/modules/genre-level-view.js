import AbstractView from '../abstract-view';
import TimerView from '../components/timer-view';
import LivesView from '../components/lives-view';
import PlayerView from '../components/player-view';

export default class GenreLevelView extends AbstractView {
  constructor(state, questionObject) {
    super();
    this.state = state;
    this.questions = questionObject;
    this.timer = new TimerView(this.state);
    this.lives = new LivesView(this.state);
  }

  get template() {
    return (
      `<section class="main main--level main--level-genre">
        ${this.timer.template}
        ${this.lives.template}
    
        <div class="main-wrap">
          <h2 class="title">Выберите ${this.questions.genre} треки</h2>
          <form class="genre">
            ${this.questions.answers.map((audio, i) => {
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

  onSubmit() {}

  bind() {
    const form = this.element.querySelector(`.genre`);
    const answers = Array.from(form.elements.answer);
    const sendButton = form.querySelector(`.genre-answer-send`);
    sendButton.disabled = true;

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
