import {showTemplate} from '../utils';
import ArtistLevelView from './artist-level-view';
import GenreLevelView from './genre-level-view';
import Application from '../application';
import TimerView from '../components/timer-view';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.state = this.model.state;
    this.data = this.model.data;
    this.timerId = null;
    this.timer = new TimerView(this.state);
    this.levelsTime = [];
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
    Application.showResult(this.model);
  }

  startGame() {
    this.model.nextLevel();
    this._showNextLevel();
    this.timerId = setInterval(() => {
      this.model.tick();
      if (this.state.time > 0) {
        this.timer.update(this.state.time);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  _compareAnswers(userAnswers, rightAnswers) {
    if (userAnswers.length === rightAnswers.length) {
      return userAnswers.every((element) => rightAnswers.includes(element));
    }
    return false;
  }

  _saveResult(userAnswers, rightAnswers) {
    const rightAnswer = this._compareAnswers(userAnswers, rightAnswers);
    const answerTime = this.levelsTime[this.levelsTime.length - 1] - this.state.time;

    if (rightAnswer) {
      this.model.saveAnswers({
        isCorrect: true,
        time: answerTime
      });
    } else {
      this.model.saveAnswers({
        isCorrect: false,
        time: answerTime
      });
      this.model.reduceLives();
    }
    this.model.nextLevel();
  }

  _getNextLevel() {
    let view;
    this.questionObject = this.data[this.state.level - 1];
    switch (this.questionObject.type) {
      case `artist`:
        view = new ArtistLevelView(this.state, this.questionObject);
        break;
      case `genre`:
        view = new GenreLevelView(this.state, this.questionObject);
        break;
    }
    const nextLevel = view.element;
    view.onSubmit = this._handleSubmit.bind(this);
    return nextLevel;
  }

  _handleSubmit(...values) {
    this._saveResult(values, [this.questionObject.rightAnswer]);
    this._showNextLevel();
  }

  _showNextLevel() {
    this.levelsTime.push(this.state.time);
    if (this.state.answers.length < 10 && this.state.lives > 0 && this.state.time > 0) {
      const nextLevel = this._getNextLevel();
      showTemplate(nextLevel);
    } else {
      this.stopTimer();
      Application.showResult(this.model);
    }
  }
}
