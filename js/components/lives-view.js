import AbstractView from '../abstract-view';

export default class LivesView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<div class="main-mistakes">
    ${new Array(3 - this.state.lives).fill(`<img class="main-mistake" src="../img/wrong-answer.png" width="35" height="49">`).join(``)}
    </div>`;
  }
}
