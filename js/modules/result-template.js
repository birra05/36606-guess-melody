import {
  getElementFromTemplate, getMinutes, getSeconds, initialState, showTemplate, playersStats, getPlayerResult} from '../utils';
import welcome from './welcome';
import header from './header';
import countPoints from '../data/count-points';
import showResult from "../data/show-result";

export default (state) => {
  const results = {
    win: {
      title: `Вы настоящий меломан!`,
      stat: ``,
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

  let resultType;
  switch (true) {
    case state.lives === 0:
      resultType = results.attempts;
      break;
    case state.time === 0:
      resultType = results.fail;
      break;
    case state.answers.length === 10:
      const points = countPoints(state.answers, state.lives);
      results.win.stat = `За ${getMinutes(state.time)} минуты ${getSeconds(state.time)} секунд вы набрали 
      ${points}, совершив ${initialState.lives - state.lives} ошибки`;
      state.playerResult = getPlayerResult(points, state.lives, state.time);
      playersStats.push(points);
      // console.log('playerResult', state.playerResult, 'global stats', playersStats);
      results.win.comparison = showResult(playersStats, state.playerResult);
      resultType = results.win;
  }

  const template = (result) => {
    return (`<section class="main main--result">
    ${header}
    <h2 class="title">${result.title}</h2>
    <div class="main-stat">${result.stat}</div> 
    ${result.comparison ? `<span class="main-comparison">${result.comparison}</span>` : ``}
    <span role="button" tabindex="0" class="main-replay">${result.button}</span>
  </section>`);
  };

  const page = getElementFromTemplate(template(resultType));
  const replayButton = page.querySelector(`.main-replay`);

  replayButton.addEventListener(`click`, () => {
    for (let prop in state) {
      if (state.hasOwnProperty(prop)) {
        state[prop] = initialState[prop];
      }
    }
    state.answers = [];
    showTemplate(welcome(state));
  });

  return page;
};


