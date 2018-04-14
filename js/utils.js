// import genreLevel from "./modules/genre-level";
// import artistLevel from "./modules/artist-level";

export const initialState = {
  level: 0,
  lives: 3,
  time: 300,
  answers: []
};

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

export const compareArrays = (array1, array2) => {
  return array1.every((element) => array2.includes(element));
};

export const compareRandom = () => {
  return Math.random() - 0.5;
};

export const randomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

export const randomElement = (array) => {
  const random = randomIndex(array);
  return array[random];
};

export const state = Object.assign({}, initialState);


