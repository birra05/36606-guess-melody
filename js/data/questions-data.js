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
  const artistQuestions = [];
  const genreQuestions = [];

  for (let i = 0, l = data.length; i < l - 1; i++) {
    const currentObject = data[i];
    artistQuestions.push({
      rightAnswer: currentObject.artist,
      song: currentObject.src,
      answers: getRandomArray(ItemsLength.ARTIST, data)
    });
    genreQuestions.push({
      rightAnswer: currentObject.name,
      genre: currentObject.genre,
      answers: getRandomArray(ItemsLength.GENRE, data)
    });
  }

  return {artistQuestions, genreQuestions};
};

const questions = getQuestions(audioData);

export default questions;
