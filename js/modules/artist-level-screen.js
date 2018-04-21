// Artist level
import {showNextLevel, saveResult} from '../utils';
import ArtistLevelView from './artist-level-view';

export default (state, questions) => {
  const artistLevel = new ArtistLevelView(state, questions);
  const userAnswers = [];

  artistLevel.onElementClick = (event) => {
    userAnswers.push(event.target.value);
    saveResult(state, userAnswers, [questions.rightAnswer]);
    showNextLevel(state);
  };

  return artistLevel.element;
};


