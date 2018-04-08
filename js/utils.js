export const getElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};

export const showTemplate = (template) => {
  const appContainer = document.querySelector(`.app`);
  const mainContainer = appContainer.querySelector(`.main`);
  appContainer.replaceChild(template, mainContainer);
};

export const INITIAL_GAME = {
  level: 0,
  lives: 3,
  time: 300
};

export const RULES = {
  isCorrect: 1,
  isFast: 1,
  isFail: -2
};
