import {getElementFromTemplate, showTemplate} from '../utils';
import header from './header';
import welcome from './welcome';

export const resultsData = {
  win: {
    title: `Вы настоящий меломан!`,
    stat: `За 3 минуты и 25 секунд <br> вы набрали 12 баллов (8 быстрых), <br> совершив 3 ошибки`,
    comparison: `Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`,
    button: `Сыграть ещё раз`
  },
  fail: {
    title: `Увы и ах!`,
    stat: `Время вышло!<br>Вы не успели отгадать все мелодии`,
    button: `Попробовать ещё раз`
  },
  attempts: {
    title: `Какая жалость!`,
    stat: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
    button: `Сыграть ещё раз`
  }
};

const resultTemplate = (status) => {
  return `<section class="main main--result">
    ${header}
    <h2 class="title">${status.title}</h2>
    <div class="main-stat">${status.stat}</div> 
    ${status.comparison ? `<span class="main-comparison">${status.comparison}</span>` : ``}
    <span role="button" tabindex="0" class="main-replay">${status.button}</span>
  </section>`;
};

const randomKey = () => {
  const resultsKeys = Object.keys(resultsData);
  const random = Math.floor(Math.random() * resultsKeys.length);
  return resultsData[resultsKeys[random]];
};

const randomStatus = randomKey();
const result = getElementFromTemplate(resultTemplate(randomStatus));
const replayButton = result.querySelector(`.main-replay`);

replayButton.addEventListener(`click`, () => {
  showTemplate(welcome);
});

export default result;
