// Genre level
import {
  state, showTemplate, compareRandom, getElementFromTemplate, compareArrays, randomElement} from '../utils';
import artistLevel from './artist-level';
import audioData from '../data/audio-data';
import lives from './lives';
import timer from './timer';
import resultTemplate from './result-template';

const audioArray = audioData.slice().sort(compareRandom).slice(0, 4);
const randomGenre = randomElement(audioArray).genre;
const rightAnswersArray = audioArray.filter((element) => element.genre === randomGenre);
const rightAnswersValues = rightAnswersArray.map((element) => element.name);

const genreTemplate = (data) => `<h2 class="title">Выберите ${randomGenre} треки</h2>
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
      ${genreTemplate(audioArray)}
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

const saveResult = () => {
  const rightAnswer = compareArrays(userAnswers, rightAnswersValues);

  if (rightAnswer) {
    state.answers.push({
      isCorrect: true,
      time: 30
    });
  } else {
    state.answers.push({
      isCorrect: false,
      time: 30
    });
    state.lives--;
  }
  state.level++;
  state.time -= state.answers[state.answers.length - 1].time;
};

const showNextLevel = () => {
  if (state.answers.length < 10 && state.lives > 0 && state.time > 0) {
    showTemplate(artistLevel);
  } else {
    showTemplate(resultTemplate(state));
  }
};

form.addEventListener(`submit`, () => {
  event.preventDefault();
  saveResult();
  answers.forEach((element) => {
    element.checked = false;
  });
  sendButton.disabled = true;
  showNextLevel();
});

export default page;

