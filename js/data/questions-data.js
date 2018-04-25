import audioData from './audio-data';

const getRandomArray = (n, data) => {
  const random = () => Math.random() - 0.5;
  return data.slice().sort(random).slice(0, n);
};

const ItemsLength = {
  ARTIST: 3,
  GENRE: 4
};

const getQuestions = (data) => {
  const questions = [];

  for (let i = 0, l = data.length; i < l - 1; i++) {
    const currentObject = data[i];
    questions.push({
      type: `artist`,
      rightAnswer: currentObject.artist,
      song: currentObject.src,
      answers: getRandomArray(ItemsLength.ARTIST, data)
    });
    questions.push({
      type: `genre`,
      rightAnswer: currentObject.name,
      genre: currentObject.genre,
      answers: getRandomArray(ItemsLength.GENRE, data)
    });
  }

  return questions;
};

const questions = getQuestions(audioData).slice().sort(() => Math.random() - 0.5);

export default questions;
