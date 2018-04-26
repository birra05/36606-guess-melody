const preprocessAnswers = (answers) => answers.map((answer) => {
  return {
    artist: answer.title,
    image: answer.image.url
  };
});

export const adaptServerData = (data) => {
  for (let element of data) {
    switch (element.type) {
      case `genre`:
        element.rightAnswer = element.answers.find((answersElement) => answersElement.genre === element.genre).genre;
        break;
      case `artist`:
        element.rightAnswer = element.answers.find((answersElement) => answersElement.isCorrect).title;
        element.answers = preprocessAnswers(element.answers);
        break;
    }
  }
  return data;
};
