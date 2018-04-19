// Welcome
import {showTemplate, InitialState} from '../utils';
import artistLevel from './artist-level-screen';
import questions from '../data/questions-data';
import WelcomeView from './welcome-view';

export default () => {
  const state = {
    level: 0,
    lives: InitialState.LIVES,
    time: InitialState.TIME,
    answers: []
  };
  const welcome = new WelcomeView();

  welcome.startGame = () => {
    state.level++;
    showTemplate(artistLevel(state, questions.artistQuestions[0]));
  };
  return welcome.element;
};

