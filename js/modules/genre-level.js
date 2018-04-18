// Genre level
import {
  getElementFromTemplate, saveResult, showNextLevel} from '../utils';
// import lives from './lives';
// import timer from './timer';
import TimerView from '../components/timer-view';
import LivesView from '../components/lives-view';
import PlayerView from '../components/player-view';

export default (state, audioArray) => {
  const timer = new TimerView(state);
  const lives = new LivesView(state);
  const genreTemplate = (data) => `<h2 class="title">Выберите ${audioArray.genre} треки</h2>
      <form class="genre">
        ${data.map((audio, i) => {
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
      </form>`;

  const template = `<section class="main main--level main--level-genre">
    ${timer.template}
    ${lives.template}

    <div class="main-wrap">
      ${genreTemplate(audioArray.questions)}
    </div>
  </section>`;

  const page = getElementFromTemplate(template);
  const form = page.querySelector(`.genre`);
  const answers = Array.from(form.elements.answer);
  const sendButton = form.querySelector(`.genre-answer-send`);
  sendButton.disabled = true;

  const userAnswers = [];

  form.addEventListener(`change`, (event) => {
    sendButton.disabled = !answers.some((checkbox) => checkbox.checked);
    userAnswers.push(event.target.value);
  });

  form.addEventListener(`submit`, () => {
    event.preventDefault();
    saveResult(state, userAnswers, [audioArray.rightAnswer]);
    answers.forEach((element) => {
      element.checked = false;
    });
    sendButton.disabled = true;
    showNextLevel(state);
  });

  return page;
};


