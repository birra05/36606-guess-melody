import artistLevel from './modules/artist-level';
import genreLevel from './modules/genre-level';
import resultTemplate from './modules/result-template';

export const initialState = {
  level: 0,
  lives: 3,
  time: 300,
  answers: [],
  playerResult: {}
};

export const playersStats = [];

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

export const saveResult = (userAnswers, rightAnswers) => {
  const rightAnswer = compareArrays(userAnswers, rightAnswers);

  if (rightAnswer) {
    state.answers.push({
      isCorrect: true,
      time: 20
    });
  } else {
    state.answers.push({
      isCorrect: false,
      time: 20
    });
    state.lives--;
  }
  state.level++;
  state.time -= state.answers[state.answers.length - 1].time;
};

const timeValue = (time) => {
  return new Date(time * 1000).toUTCString().split(/ /)[4].slice(3);
};

export const getMinutes = (time) => {
  return timeValue(time).substring(0, 2);
};

export const getSeconds = (time) => {
  return timeValue(time).substring(3);
};

export const getPlayerResult = (playerPoints, playerLives, playerTime) => {
  return {
    points: playerPoints,
    lives: playerLives,
    time: playerTime
  };
};

export const showNextLevel = () => {
  const randomLevel = randomElement([artistLevel, genreLevel]);
  if (state.answers.length < 10 && state.lives > 0 && state.time > 0) {
    showTemplate(randomLevel(state));
  } else {
    showTemplate(resultTemplate(state));
  }
};


