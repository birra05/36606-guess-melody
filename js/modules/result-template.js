import {
  getElementFromTemplate, showTemplate, playersStats, countPoints, showResult, InitialState} from '../utils';
import welcome from './welcome';
import header from './header';

const getResult = (state) => {
  let result;
  const resultString = showResult(playersStats, state);
  switch (true) {
    case state.lives === 0:
      result = {
        title: `Какая жалость!`,
        stat: resultString,
        button: `Сыграть ещё раз`
      };
      break;
    case state.time === 0:
      result = {
        title: `Увы и ах!`,
        stat: resultString,
        button: `Попробовать ещё раз`
      };
      break;
    case state.answers.length === 10:
      const ONE_MINUTE = 60;
      const minutes = Math.floor(state.time / ONE_MINUTE);
      const seconds = state.time % 60;
      const points = countPoints(state.answers, state.lives);
      state.points = points;
      playersStats.push(points);
      result = {
        title: `Вы настоящий меломан!`,
        stat: `За ${minutes} минуты ${seconds} секунд вы набрали 
      ${points}, совершив ${InitialState.LIVES - state.lives} ошибки`,
        comparison: resultString,
        button: `Сыграть ещё раз`
      };
      break;
  }
  return result;
};

export default (state) => {
  const result = getResult(state);
  const template = `<section class="main main--result">
    ${header}
    <h2 class="title">${result.title}</h2>
    <div class="main-stat">${result.stat}</div> 
    ${result.comparison ? `<span class="main-comparison">${result.comparison}</span>` : ``}
    <span role="button" tabindex="0" class="main-replay">${result.button}</span>
  </section>`;

  const page = getElementFromTemplate(template);
  const replayButton = page.querySelector(`.main-replay`);

  replayButton.addEventListener(`click`, () => {
    showTemplate(welcome());
  });

  return page;
};


