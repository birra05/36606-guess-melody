import {getElementFromTemplate, showTemplate} from '../utils';
import welcome from './welcome';
import header from './header';

const template = `<section class="main main--result">
    ${header}
    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div> 
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const page = getElementFromTemplate(template);
const replayButton = page.querySelector(`.main-replay`);

replayButton.addEventListener(`click`, () => {
  showTemplate(welcome);
});

export default page;

