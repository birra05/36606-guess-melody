// Artist level
import {getElementFromTemplate, randomElement, showNextLevel, saveResult} from '../utils';
import timer from './timer';
import lives from './lives';
import {artistLevelQuestions} from '../data/questions-data';

export default (state) => {
  let audioArray;
  if (state.level < artistLevelQuestions.length) {
    audioArray = artistLevelQuestions[state.level - 1];
  }
  audioArray = randomElement(artistLevelQuestions);
  const rightAnswersValues = [audioArray.artist];

  const artistTemplate = (data) => `<h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src=${audioArray.song}></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
       ${data.map((audio, i) => {
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
      </form>`;

  const template = `<section class="main main--level main--level-artist">
    ${timer(state)}
    ${lives(state)}

    <div class="main-wrap">
      ${artistTemplate(audioArray.questions)}
    </div>
  </section>`;

  const page = getElementFromTemplate(template);
  const form = page.querySelector(`.main-list`);
  const userAnswers = [];

  form.addEventListener(`change`, (event) => {
    userAnswers.push(event.target.value);
    saveResult(userAnswers, rightAnswersValues);
    event.target.checked = false;
    showNextLevel();
  });

  return page;
};


