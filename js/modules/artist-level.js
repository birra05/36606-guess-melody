// Artist level
import {compareRandom, getElementFromTemplate, randomElement, showTemplate, state} from '../utils';
import genreLevel from './genre-level';
import timer from './timer';
import lives from './lives';
import audioData from '../data/audio-data';

const audioArray = audioData.slice().sort(compareRandom).slice(0, 3);
const randomSong = randomElement(audioArray).src;
const rightAnswersArray = audioArray.filter((element) => element.src === randomSong);
const rightAnswersValues = rightAnswersArray.map((element) => element.name);
console.log(rightAnswersValues);

const artistTemplate = (data) => `<h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src=${randomSong}></audio>
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
          <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${audio.name}"/>
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
      ${artistTemplate(audioArray)}
    </div>
  </section>`;

const page = getElementFromTemplate(template);
const form = page.querySelector(`.main-list`);
const userAnswers = [];

form.addEventListener(`change`, (event) => {
  userAnswers.push(event.target.value);
  event.target.checked = false;
  showTemplate(genreLevel);
});

export default page;
