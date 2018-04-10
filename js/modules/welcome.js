// Welcome
import {getElementFromTemplate, showTemplate} from '../utils';
import artistLevel from './artist-level';
import header from './header';

const template = `<section class="main main--welcome">
    ${header}
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`;

const page = getElementFromTemplate(template);
const button = page.querySelector(`.main-play`);

button.addEventListener(`click`, () => {
  showTemplate(artistLevel);
});

export default page;
