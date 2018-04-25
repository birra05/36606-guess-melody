import {InitialState, playersStats} from '../utils';
import ResultView from './result-view';
import Application from '../application';

const FAST_TIME = 30;
const Rules = {
  IS_CORRECT: 1,
  IS_FAST: 1,
  IS_FAIL: -2
};

export default class ResultScreen {
  constructor(model) {
    this.state = model.state;
    this.playersStats = playersStats;
  }

  get element() {
    const result = this._getResult();
    this.view = new ResultView(result);
    this.view.onReplayBtnClick = () => {
      Application.showGame();
    };
    return this.view.element;
  }

  _countPoints(answers = [], lives) {
    if (answers.length !== 10) {
      throw new Error(`Массив ответов должен содержать 10 элементов`);
    }

    if (!Number.isInteger(lives) || lives <= 0 || lives > 3) {
      throw new Error(`Передано неверное количество жизней`);
    }

    let points = 0;
    answers.forEach((element) => {
      if (element.isCorrect) {
        points += Rules.IS_CORRECT;
        if (element.time < FAST_TIME) {
          points += Rules.IS_FAST;
        }
      } else {
        points += Rules.IS_FAIL;
      }
    });
    return points;
  }

  _getResult() {
    let result;
    const resultString = this._showResult(this.playersStats, this.state);
    switch (true) {
      case this.state.lives === 0:
        result = {
          title: `Какая жалость!`,
          stat: resultString,
          button: `Сыграть ещё раз`
        };
        break;
      case this.state.time === 0:
        result = {
          title: `Увы и ах!`,
          stat: resultString,
          button: `Попробовать ещё раз`
        };
        break;
      case this.state.answers.length === 10:
        const ONE_MINUTE = 60;
        const minutes = Math.floor(this.state.time / ONE_MINUTE);
        const seconds = this.state.time % 60;
        const points = this._countPoints(this.state.answers, this.state.lives);
        this.state.savePoints(points);
        this.playersStats.push(points);
        result = {
          title: `Вы настоящий меломан!`,
          stat: `За ${minutes} минуты ${seconds} секунд вы набрали 
      ${points}, совершив ${InitialState.LIVES - this.state.lives} ошибки`,
          comparison: resultString,
          button: `Сыграть ещё раз`
        };
        break;
    }
    return result;
  }

  _showResult(stats = [], result) {
    if (result.lives === 0) {
      return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    }
    if (result.time === 0) {
      return `Время вышло! Вы не успели отгадать все мелодии`;
    }
    const otherPlayersStats = stats.slice();
    otherPlayersStats.push(result.points);
    const compareResults = (a, b) => b - a;
    otherPlayersStats.sort(compareResults);
    const playerPlace = otherPlayersStats.indexOf(result.points) + 1;
    const successPercent = Math.floor(((otherPlayersStats.length - playerPlace) / otherPlayersStats.length) * 100);

    return `Вы заняли ${playerPlace} место из ${otherPlayersStats.length} игроков. Это лучше, чем у ${successPercent}% игроков`;
  }
}
