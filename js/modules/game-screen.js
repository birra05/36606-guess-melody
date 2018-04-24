import {showTemplate} from "../utils";
import ArtistLevelView from './artist-level-view';
import GenreLevelView from './genre-level-view';
import Application from "../application";

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.state = this.model.state;
    this.data = this.model.data;
    this.userAnswers = [];
  }

  startGame() {
    this.model.nextLevel();
    this.showNextLevel(this.state);
  }

  compareArrays(arr1, arr2) {
    if (arr1.length === arr2.length) {
      return arr1.every((element) => arr2.includes(element));
    }
    return false;
  }

  saveResult(state, userAnswers, rightAnswers) {
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

  getNextLevel(state) {
    let nextLevel;
    const questionObject = this.data[state.level - 1];
    switch (questionObject.type) {
      case `artist`:
        const artistLevel = new ArtistLevelView(state, questionObject);
        nextLevel = artistLevel.element;
        artistLevel.onElementClick = (event) => {
          this.userAnswers.push(event.target.value);
          this.saveResult(state, this.userAnswers, [questionObject.rightAnswer]);
          this.showNextLevel(state);
        };
        break;
      case `genre`:
        const genreLevel = new GenreLevelView(state, questionObject);
        nextLevel = genreLevel.element;
        genreLevel.onElementClick = (value) => {
          this.userAnswers.push(value);
        };
        genreLevel.onSubmit = () => {
          this.saveResult(state, this.userAnswers, [questionObject.rightAnswer]);
          this.showNextLevel(state);
        };
    }
    return nextLevel;
  }

  showNextLevel(state) {
    const nextLevel = this.getNextLevel(state);
    if (state.answers.length < 10 && state.lives > 0 && state.time > 0) {
      showTemplate(nextLevel);
    } else {
      Application.showResult(this.model);
    }
  }
}
