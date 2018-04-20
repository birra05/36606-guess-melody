// Genre level
import {saveResult, showNextLevel} from '../utils';
import GenreLevelView from './genre-level-view';

export default (state, audioFiles) => {
  const genreLevel = new GenreLevelView(state, audioFiles);
  const userAnswers = [];

  genreLevel.getAnswers = (event) => {
    userAnswers.push(event.target.value);
  };

  genreLevel.showLevel = () => {
    saveResult(state, userAnswers, [audioFiles.rightAnswer]);
    showNextLevel(state);
  };

  return genreLevel.element;
};


