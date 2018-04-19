// Artist level
import {showNextLevel, saveResult} from '../utils';
import ArtistLevelView from './artist-level-view';

export default (state, audioArray) => {
  const artistLevel = new ArtistLevelView(state, audioArray);
  const userAnswers = [];

  artistLevel.getAnswersAndShowLevel = (event) => {
    userAnswers.push(event.target.value);
    saveResult(state, userAnswers, [audioArray.rightAnswer]);
    event.target.checked = false;
    showNextLevel(state);
  };

  return artistLevel.element;
};


