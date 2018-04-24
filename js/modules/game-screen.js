import {showTemplate} from "../utils";
import ArtistLevelView from './artist-level-view';
import GenreLevelView from './genre-level-view';
import Application from "../application";

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.state = this.model.state;
    this.data = this.model.data;
  }

  startGame() {
    this.model.nextLevel();
    this.showNextLevel();
  }

  compareArrays(arr1, arr2) {
    if (arr1.length === arr2.length) {
      return arr1.every((element) => arr2.includes(element));
    }
    return false;
  }

  saveResult(userAnswers, rightAnswers) {
    const rightAnswer = this.compareArrays(userAnswers, rightAnswers);

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

  getNextLevel() {
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
    this.saveResult(values, [this.questionObject.rightAnswer]);
    this.showNextLevel();
  }

  showNextLevel() {
    const nextLevel = this.getNextLevel();
    if (this.state.answers.length < 10 && this.state.lives > 0 && this.state.time > 0) {
      showTemplate(nextLevel);
    } else {
      Application.showResult(this.model);
    }
  }
}
