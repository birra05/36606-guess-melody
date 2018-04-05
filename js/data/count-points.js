import {RULES} from '../utils';

export const countPoints = (answers = [], lives) => {
  let points = 0;

  if (answers.length < 10 || lives === 0) {
    return -1;
  }

  answers.forEach((element) => {
    if (element.isCorrect) {
      points += RULES.isCorrect;
      if (element.time < RULES.fastTime) {
        points += RULES.isFast;
      }
    } else {
      points += RULES.isFail;
    }
  });
  return points;
};


