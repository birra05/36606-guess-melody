// Genre level
import {saveResult, showNextLevel} from '../utils';
import GenreLevelView from './genre-level-view';

export default (state, audioArray) => {
  const genreLevel = new GenreLevelView(state, audioArray);
  const form = genreLevel.element.querySelector(`.genre`);
  const answers = Array.from(form.elements.answer);
  const sendButton = form.querySelector(`.genre-answer-send`);
  sendButton.disabled = true;

  const userAnswers = [];

  genreLevel.getAnswers = (event) => {
    sendButton.disabled = !answers.some((checkbox) => checkbox.checked);
    userAnswers.push(event.target.value);
  };

  genreLevel.showLevel = () => {
    event.preventDefault();
    saveResult(state, userAnswers, [audioArray.rightAnswer]);
    answers.forEach((element) => {
      element.checked = false;
    });
    sendButton.disabled = true;
    showNextLevel(state);
  };

  return genreLevel.element;
};


