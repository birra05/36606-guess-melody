const countPoints = (answers = [], lives) => {
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

export default countPoints;


