import {showTemplate} from '../utils';
import ArtistLevelView from './artist-level-view';
import GenreLevelView from './genre-level-view';
import Application from '../application';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.state = this.model.state;
    this.data = this.model.data;
  }

  startGame() {
    this.model.nextLevel();
    this._showNextLevel();
  }

  _compareAnswers(userAnswers, rightAnswers) {
    if (userAnswers.length === rightAnswers.length) {
      return userAnswers.every((element) => rightAnswers.includes(element));
    }
    return false;
  }

  _saveResult(userAnswers, rightAnswers) {
    const rightAnswer = this._compareAnswers(userAnswers, rightAnswers);

    if (rightAnswer) {
      this.model.saveAnswers({
        isCorrect: true,
        time: 20
      });
    } else {
      this.model.saveAnswers({
        isCorrect: false,
        time: 20
      });
      this.model.reduceLives();
    }
    this.model.nextLevel();
    this.model.reduceTime();
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
    const nextLevel = this._getNextLevel();
    if (this.state.answers.length < 10 && this.state.lives > 0 && this.state.time > 0) {
      showTemplate(nextLevel);
    } else {
      Application.showResult(this.model);
    }
  }
}
