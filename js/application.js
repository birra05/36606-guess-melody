import {showTemplate} from './utils';
import WelcomeScreen from './modules/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './modules/game-screen';
import ResultScreen from './modules/result-screen';
import {adaptServerData} from './data/data-adapter';

let questionsData;
const getDataURL = `https://es.dump.academy/guess-melody/questions`;

export default class Application {
  static start() {
    window.fetch(getDataURL).
        then((response) => response.json()).
        then((data) => adaptServerData(data)).
        then(Application.showWelcome);
  }

  static showWelcome(data) {
    questionsData = data;
    const welcomeScreen = new WelcomeScreen();
    showTemplate(welcomeScreen.element);
  }

  static showGame() {
    const model = new GameModel(questionsData);
    const gameScreen = new GameScreen(model);
    gameScreen.startGame();
  }

  static showResult(model) {
    const resultScreen = new ResultScreen(model);
    showTemplate(resultScreen.element);
  }
}
