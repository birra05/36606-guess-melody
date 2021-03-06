import AbstractView from '../abstract-view';
import HeaderView from '../components/header-view';
import Application from '../application';

export default class WelcomeScreen extends AbstractView {
  constructor() {
    super();
    this.header = new HeaderView();
  }

  get template() {
    return (
      `<section class="main main--welcome">
        ${this.header.template}
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
          Ошибиться можно 3 раза.<br>
          Удачи!
        </p>
      </section>`
    );
  }

  bind() {
    const button = this.element.querySelector(`.main-play`);
    button.addEventListener(`click`, () => {
      Application.showGame();
    });
  }
}
