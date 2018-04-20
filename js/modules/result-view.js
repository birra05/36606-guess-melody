import AbstractView from '../abstract-view';
import HeaderView from '../components/header-view';

export default class ResultView extends AbstractView {
  constructor(result) {
    super();
    this.result = result;
    this.header = new HeaderView();
  }
  get template() {
    return (
      `<section class="main main--result">
        ${this.header.template}
        <h2 class="title">${this.result.title}</h2>
        <div class="main-stat">${this.result.stat}</div> 
        ${this.result.comparison ? `<span class="main-comparison">${this.result.comparison}</span>` : ``}
        <span role="button" tabindex="0" class="main-replay">${this.result.button}</span>
      </section>`
    );
  }

  replay() {}

  bind() {
    const replayButton = this.element.querySelector(`.main-replay`);

    replayButton.addEventListener(`click`, () => {
      this.replay();
    });
  }
}
