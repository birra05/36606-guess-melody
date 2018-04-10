import {getElementFromTemplate, showTemplate} from '../utils';
import welcome from './welcome';
import header from './header';

const template = `<section class="main main--result">
    ${header}
    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div> 
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

const page = getElementFromTemplate(template);
const replayButton = page.querySelector(`.main-replay`);

replayButton.addEventListener(`click`, () => {
  showTemplate(welcome);
});

export default page;
