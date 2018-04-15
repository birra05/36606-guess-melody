// Genre level
import {
  getElementFromTemplate, saveResult, showNextLevel} from '../utils';
import lives from './lives';
import timer from './timer';

export default (state, audioArray) => {
  const genreTemplate = (data) => `<h2 class="title">Выберите ${audioArray.genre} треки</h2>
      <form class="genre">
        ${data.map((audio, i) => {
    const index = i + 1;
    return (
      `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src=${audio.src}></audio>
              <button class="player-control player-control--pause" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="${audio.name}" id="a-${index}">
          <label class="genre-answer-check" for="a-${index}"></label>
        </div>`
    );
  }).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>`;

  const template = `<section class="main main--level main--level-genre">
    ${timer(state)}
    ${lives(state)}

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


