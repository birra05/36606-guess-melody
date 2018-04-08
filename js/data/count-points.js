import {RULES} from '../utils';

const countPoints = (answers = [], lives) => {
  let points = 0;
  const FAST_TIME = 30;

  if (answers.length < 10) {
    return `Переданы неверные данные`;
  }

  if (lives === 0) {
    return `Количество попыток закончилось`;
  }

  answers.forEach((element) => {
    if (element.isCorrect) {
      points += RULES.isCorrect;
      if (element.time < FAST_TIME) {
        points += RULES.isFast;
      }
    } else {
      points += RULES.isFail;
    }
  });
  return points;
};

export default countPoints;


