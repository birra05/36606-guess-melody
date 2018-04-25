import {showTemplate} from './utils';
import WelcomeScreen from './modules/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './modules/game-screen';
import ResultScreen from './modules/result-screen';

export default class Application {
  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    showTemplate(welcomeScreen.element);
  }

  static showGame() {
    const model = new GameModel();
    const gameScreen = new GameScreen(model);
    gameScreen.startGame();
  }

  static showResult(model) {
    const resultScreen = new ResultScreen(model);
    showTemplate(resultScreen.element);
  }
}
