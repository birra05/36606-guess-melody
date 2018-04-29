import {InitialState} from '../utils';
// import Timer from '../components/timer';

export default class GameModel {
  constructor(data) {
    this.restart();
    this.data = data;
  }

  get state() {
    return this._state;
  }

  tick() {
    this._state.time--;
  }

  restart() {
    this._state = {
      level: 0,
      lives: InitialState.LIVES,
      time: InitialState.TIME,
      answers: []
    };
  }

  nextLevel() {
    this._state.level++;
  }

  reduceLives() {
    this._state.lives--;
  }

  saveAnswers(value) {
    this._state.answers.push(value);
  }

  savePoints(points) {
    this._state.points = points;
  }
}
