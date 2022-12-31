import { Howl } from 'howler';

const sound = new Howl({
  src: ['https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/E5.mp3'],
});
sound.volume(0.5);
sound.stereo(-1);

const soundd = new Howl({
  src: ['https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/D2.mp3'],
});
soundd.stereo(-1);
soundd.volume(0.5);

// const sounddd = new Howl({
//   src: ['https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/A2.mp3'],
// });
// sounddd.stereo(-1);
// sounddd.volume(0);

const sound6 = new Howl({
  src: ['https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/G2.mp3'],
});
sound6.stereo(-1);
sound6.volume(0.5);
const sound7 = new Howl({
  src: ['https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/B5.mp3'],
});
sound7.stereo(-1);
sound7.volume(0.5);
const sound8 = new Howl({
  src: ['https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/e5.mp3'],
});
sound8.stereo(-1);
sound8.volume(0.5);
const sound2 = new Howl({
  src: ['/mando/G9.mp3'],
});
sound2.stereo(1);
sound2.volume(0.5);
const sound3 = new Howl({
  src: ['/mando/A4.mp3'],
});
sound3.stereo(1);
sound3.volume(0.5);
const sound4 = new Howl({
  src: ['/mando/D7.mp3'],
});
sound4.stereo(1);
sound4.volume(0.5);
const sound5 = new Howl({
  src: ['/mando/E5.mp3'],
});
sound5.stereo(1);
sound5.volume(0.5);

export const play = () => {
  let num = 0;
  const interval = setInterval(() => {
    num % 2 === 0
      ? sound.play()
      : (() => {
          soundd.play();
          // sounddd.play();
          // setTimeout(() => {
          //   soundd.volume(0);
          //   sounddd.volume(0.5);
          // }, 250);
        })();
    setTimeout(() => {
      sound2.play();
      sound3.play();
      sound4.play();
      sound5.play();
      setTimeout(() => {
        sound6.play();
      }, 20);
      setTimeout(() => {
        sound7.play();
      }, 40);
      setTimeout(() => {
        sound8.play();
      }, 60);
    }, 500);
    num++;
  }, 1000);
  return interval;
};

// play();

const playEngine = () => {};

class Song {
  constructor() {}
}