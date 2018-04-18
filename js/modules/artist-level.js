// Artist level
import {getElementFromTemplate, showNextLevel, saveResult} from '../utils';
// import timer from './timer';
// import lives from './lives';
import TimerView from '../components/timer-view';
import LivesView from "../components/lives-view";
import PlayerView from "../components/player-view";

export default (state, audioArray) => {
  const timer = new TimerView(state);
  const lives = new LivesView(state);
  const player = new PlayerView(audioArray.song);

  const artistTemplate = (data) => `<h2 class="title main-title">Кто исполняет эту песню?</h2>
      ${player.template}
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
    ${timer.template}
    ${lives.template}

    <div class="main-wrap">
      ${artistTemplate(audioArray.questions)}
    </div>
  </section>`;

  const page = getElementFromTemplate(template);
  const form = page.querySelector(`.main-list`);
  const userAnswers = [];

  form.addEventListener(`change`, (event) => {
    userAnswers.push(event.target.value);
    saveResult(state, userAnswers, [audioArray.rightAnswer]);
    event.target.checked = false;
    showNextLevel(state);
  });

  return page;
};


