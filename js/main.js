const template = document.querySelector(`#templates`).content;
const content = template.querySelectorAll(`.main`);
const templates = Array.from(content);
const mainContainer = document.querySelector(`.main`);

const showTemplate = (index) => {
  mainContainer.innerHTML = ``;
  mainContainer.appendChild(templates[index]);
};

let currentIndex = 0;
showTemplate(currentIndex);

document.addEventListener(`keydown`, (event) => {
  const previous = event.keyCode === 37 && event.altKey;
  const next = event.keyCode === 39 && event.altKey;

  if (previous || next) {
    event.preventDefault();

    if (previous && currentIndex > 0) {
      showTemplate(--currentIndex);
    }

    if (next && currentIndex < templates.length - 1) {
      showTemplate(++currentIndex);
    }
  }
});


