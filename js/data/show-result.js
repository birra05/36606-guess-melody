const showResult = (stats = [], result) => {
  if (stats.length < 1 || !result) {
    return `Переданы неверные данные`;
  }
  if (result.lives === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  if (result.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }
  const playersStats = stats.slice();
  playersStats.push(result.points);
  const compareResults = (a, b) => b - a;
  playersStats.sort(compareResults);
  const playerPlace = playersStats.indexOf(result.points) + 1;
  const losersStats = playersStats.slice(playerPlace);
  if (losersStats.length === 0) {
    return `Вы сыграли хуже всех`;
  }
  const successPercent = Math.floor((losersStats.length / playersStats.length) * 100);

  return `Вы заняли ${playerPlace} место из ${playersStats.length} игроков. Это лучше, чем у ${successPercent}% игроков`;
};

export default showResult;
