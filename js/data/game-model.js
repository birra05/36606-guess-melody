import {InitialState} from '../utils';
import questions from './questions-data';

export default class GameModel {
  constructor() {
    this.restart();
    this.questions = questions;
  }

  get state() {
    return this._state;
  }

  get data() {
    return this.questions;
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

  reduceTime() {
    this._state.time -= this._state.answers[this._state.answers.length - 1].time;
  }

  saveAnswers(value) {
    this._state.answers.push(value);
  }

  savePoints(points) {
    this._state.points = points;
  }
}
