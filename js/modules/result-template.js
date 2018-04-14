import {getElementFromTemplate, showTemplate} from '../utils';
import welcome from './welcome';
import header from './header';

const results = {
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

const template = (state) => {
  let result;
  if (state.lives === 0) {
    result = results.attempts;
  }
  if (state.time === 0) {
    result = results.fail;
  }
  return (`<section class="main main--result">
    ${header}
    <h2 class="title">${result.title}</h2>
    <div class="main-stat">${result.stat}</div> 
    ${result.comparison ? `<span class="main-comparison">${result.comparison}</span>` : ``}
    <span role="button" tabindex="0" class="main-replay">${result.button}</span>
  </section>`);
};

const page = getElementFromTemplate(template);
const replayButton = page.querySelector(`.main-replay`);

replayButton.addEventListener(`click`, () => {
  showTemplate(welcome);
});

export default page;
