import {InitialState} from '../utils';
import TimerView from '../components/timer-view';

export default class GameModel {
  constructor(data) {
    this.restart();
    this.data = data;
    this.timer = new TimerView(this.state.time);
  }

  get state() {
    return this._state;
  }

  tick() {
    this._state.time--;
    this.timer.update(this._state.time);
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

  saveResultTime(time) {
    this._state.resultTime = InitialState.TIME - time;
  }
}
