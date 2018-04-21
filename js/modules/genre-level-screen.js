// Genre level
import {saveResult, showNextLevel} from '../utils';
import GenreLevelView from './genre-level-view';

export default (state, questions) => {
  const genreLevel = new GenreLevelView(state, questions);
  const userAnswers = [];

  genreLevel.onElementClick = (value) => {
    userAnswers.push(value);
  };

  genreLevel.onSubmit = () => {
    saveResult(state, userAnswers, [questions.rightAnswer]);
    showNextLevel(state);
  };

  return genreLevel.element;
};


