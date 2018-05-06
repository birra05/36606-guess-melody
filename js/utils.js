export const InitialState = {
  LIVES: 3,
  TIME: 300,
};

export const LEVELS_NUMBER = 10;

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

export const setTimer = (time) => {
  if (!Number.isInteger(time) || time <= 0) {
    throw new Error(`Ожидается целое число больше нуля`);
  }

  return {
    time,
    tick() {
      this.time--;
      if (this.time === 0) {
        return true;
      }
      return false;
    }
  };
};


