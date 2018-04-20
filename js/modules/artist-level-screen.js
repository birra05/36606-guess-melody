// Artist level
import {showNextLevel, saveResult} from '../utils';
import ArtistLevelView from './artist-level-view';

export default (state, audioFiles) => {
  const artistLevel = new ArtistLevelView(state, audioFiles);
  const userAnswers = [];

  artistLevel.getAnswersAndShowLevel = (event) => {
    userAnswers.push(event.target.value);
    saveResult(state, userAnswers, [audioFiles.rightAnswer]);
    showNextLevel(state);
  };

  return artistLevel.element;
};


