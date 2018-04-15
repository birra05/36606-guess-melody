import artistLevel from './modules/artist-level';
import genreLevel from './modules/genre-level';
import resultTemplate from './modules/result-template';
import questions from './data/questions-data';

export const InitialState = {
  LIVES: 3,
  TIME: 300
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

export const compareArrays = (arr1, arr2) => {
  if (arr1.length === arr2.length) {
    return arr1.every((element) => arr2.includes(element));
  }
  return false;
};

export const saveResult = (state, userAnswers, rightAnswers) => {
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

export const showNextLevel = (state) => {
  let nextLevel;
  let questionsArray;
  if (state.level <= 5) {
    nextLevel = artistLevel;
    questionsArray = questions.artistQuestions[state.level - 1];
  } else {
    nextLevel = genreLevel;
    questionsArray = questions.genreQuestions[state.level - questions.genreQuestions.length];
  }

  if (state.answers.length < 10 && state.lives > 0 && state.time > 0) {
    showTemplate(nextLevel(state, questionsArray));
  } else {
    showTemplate(resultTemplate(state));
  }
};

export const countPoints = (answers = [], lives) => {
  const FAST_TIME = 30;
  const Rules = {
    IS_CORRECT: 1,
    IS_FAST: 1,
    IS_FAIL: -2
  };

  if (answers.length !== 10) {
    throw new Error(`Массив ответов должен содержать 10 элементов`);
  }

  if (!Number.isInteger(lives) || lives <= 0 || lives > 3) {
    throw new Error(`Передано неверное количество жизней`);
  }

  let points = 0;
  answers.forEach((element) => {
    if (element.isCorrect) {
      points += Rules.IS_CORRECT;
      if (element.time < FAST_TIME) {
        points += Rules.IS_FAST;
      }
    } else {
      points += Rules.IS_FAIL;
    }
  });
  return points;
};

export const showResult = (stats = [], result) => {
  // if (stats.length < 1 || typeof result !== `object`) {
  //   throw new Error(`Ожидается массив данных других игроков и объект результата текущего игрока`);
  // }
  if (result.lives === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  if (result.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  const otherPlayersStats = stats.slice();
  otherPlayersStats.push(result.points);
  const compareResults = (a, b) => b - a;
  otherPlayersStats.sort(compareResults);
  const playerPlace = otherPlayersStats.indexOf(result.points) + 1;
  const successPercent = Math.floor(((otherPlayersStats.length - playerPlace) / otherPlayersStats.length) * 100);

  return `Вы заняли ${playerPlace} место из ${otherPlayersStats.length} игроков. Это лучше, чем у ${successPercent}% игроков`;
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


