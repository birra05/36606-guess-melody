import audioData from './audio-data';

export const artistLevelQuestions = [
  {
    rightAnswer: audioData[1].artist,
    song: audioData[1].src,
    questions: [audioData[0], audioData[1], audioData[2]]
  },
  {
    rightAnswer: audioData[2].artist,
    song: audioData[2].src,
    questions: [audioData[1], audioData[2], audioData[3]]
  },
  {
    rightAnswer: audioData[3].artist,
    song: audioData[3].src,
    questions: [audioData[2], audioData[3], audioData[4]]
  },
  {
    rightAnswer: audioData[4].artist,
    song: audioData[4].src,
    questions: [audioData[3], audioData[4], audioData[5]]
  },
  {
    rightAnswer: audioData[5].artist,
    song: audioData[5].src,
    questions: [audioData[4], audioData[5], audioData[6]]
  }
];

export const genreLevelQuestions = [
  {
    rightAnswer: audioData[1].name,
    genre: audioData[1].genre,
    questions: [audioData[0], audioData[1], audioData[2], audioData[3]]
  },
  {
    rightAnswer: audioData[2].name,
    genre: audioData[2].genre,
    questions: [audioData[1], audioData[2], audioData[3], audioData[4]]
  },
  {
    rightAnswer: audioData[3].name,
    genre: audioData[3].genre,
    questions: [audioData[2], audioData[3], audioData[4], audioData[5]]
  },
  {
    rightAnswer: audioData[4].name,
    genre: audioData[4].genre,
    questions: [audioData[3], audioData[4], audioData[5], audioData[6]]
  },
  {
    rightAnswer: audioData[5].name,
    genre: audioData[5].genre,
    questions: [audioData[4], audioData[5], audioData[6], audioData[0]]
  }
];
