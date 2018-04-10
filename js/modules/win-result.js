import {getElementFromTemplate, showTemplate} from '../utils';
import welcome from './welcome';
import header from './header';

const template = `<section class="main main--result">
    ${header}
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За 3 минуты и 25 секунд <br> вы набрали 12 баллов (8 быстрых), <br> совершив 3 ошибки</div> 
    <span class="main-comparison">Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

const page = getElementFromTemplate(template);
const replayButton = page.querySelector(`.main-replay`);

replayButton.addEventListener(`click`, () => {
  showTemplate(welcome);
});

export default page;

