import {showTemplate} from './utils';
import WelcomeScreen from './modules/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './modules/game-screen';
import ResultScreen from './modules/result-screen';
import Loader from './loader';

let questionsData;

export default class Application {
  static start() {
    Loader.loadData().
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
    if (typeof model.state.points === `number`) {
      Loader.saveResults(model.state).
          then(() => Loader.loadResults()).
          then((data) => {
            resultScreen.getPlayersStats(data);
            showTemplate(resultScreen.element);
          });
    }
  }
}
