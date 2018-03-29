const template = document.querySelector(`#templates`).content;
const templates = Array.from(template.querySelectorAll(`.main`));
const appContainer = document.querySelector(`.app`);

const KeyCode = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
};

const showTemplate = (index) => {
  appContainer.replaceChild(templates[index], appContainer.children[0]);
};

let currentIndex = 0;
showTemplate(currentIndex);

document.addEventListener(`keydown`, (event) => {
  if (event.altKey) {
    event.preventDefault();
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        if (currentIndex > 0) {
          showTemplate(--currentIndex);
        }
        break;
      case KeyCode.ARROW_RIGHT:
        if (currentIndex < templates.length - 1) {
          showTemplate(++currentIndex);
        }
        break;
      default:
        break;
    }
  }
});


