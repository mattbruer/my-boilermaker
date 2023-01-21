// import store from "../store";
import store from '../store';
import { Howl } from 'howler';
import { guitarPlay } from './guitar';
import { mandoPlay } from './mando';
import {
  advancePosition,
  playSong,
  pushPasses,
  toggleRec,
} from '../store/songSlice';
import { buildGuitarPlayroll } from './guitar';
import { buildMandoPlayroll } from './mando';

let flattenedSong;
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext({
  sampleRate: 96000,
  latencyHint: 0,
});
let source;
let stream2;

function monitor() {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false,
        // latency: { exact: 0.003 },
      },
    })
    .then((stream) => {
      stream2 = stream;
      source = audioContext.createMediaStreamSource(stream2);
      source.connect(audioContext.destination);
    });
}
function checkHeadphones() {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    // Check the connected devices
    const headphones = devices.find((d) => d.label.includes('Headphones'));
    if (headphones) {
      monitor();
    } else {
      stream2?.getTracks().forEach((t) => t.stop());
    }
  });
}

checkHeadphones();

navigator.mediaDevices.addEventListener('devicechange', () => {
  console.log('it changed');
  checkHeadphones();
});

export function flattenSong(song) {
  const newMeasures = [];
  song.measures.forEach((m) => {
    newMeasures.push(m[0], m[1]);
  });
  newMeasures.forEach((chord, i) => {
    if (chord === '') {
      newMeasures[i] = newMeasures[i - 1];
    }
  });
  buildGuitarPlayroll(newMeasures, store.getState().songs.capo);

  buildMandoPlayroll(newMeasures);
  flattenedSong = newMeasures;
}

let expectedTime;
let prevTime;
export function getExpectedTime() {
  return expectedTime;
}
export function getPrevTime() {
  return prevTime;
}

export function initExpectedTime() {
  expectedTime = Date.now() + 60000 / store.getState().songs.tempo;
}
export function play() {
  const { isPlaying, position, selectedPass, recordingArmed } =
    store.getState().songs;

  const now = Date.now();
  if (!isPlaying) {
    passes.forEach((p, i) => {
      p.stop();
    });
  }

  if (isPlaying) {
    guitarPlay();
    mandoPlay();
    if (position === 0 && passes[0] && !recordingArmed) {
      passes.forEach((p, i) => {
        p.volume(selectedPass === i ? 1 : 0).play();
      });
    }

    store.dispatch(advancePosition());

    setTimeout(() => {
      isPlaying && play();
    }, expectedTime - now);
    prevTime = expectedTime;
    expectedTime += 60000 / store.getState().songs.tempo;
  }
}

let mediaRecorders = [];

export function record() {
  mediaRecorders[mediaRecorders.length - 1].start();
  if (mediaRecorders[mediaRecorders.length - 2]) {
    mediaRecorders[mediaRecorders.length - 2].stop();
  }
}

const passes = [];

export function getPasses() {
  if (passes.length > 0) {
    return passes;
  }
}

export function prepareToRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false,
        // latency: { exact: 0.003 },
      },
    })
    .then((stream) => {
      const recorder = new MediaRecorder(stream);

      recorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        store.dispatch(pushPasses(audioUrl));

        passes.push(new Howl({ src: [audioUrl], html5: true }));

        stream.getTracks().forEach((track) => track.stop());
      });
      mediaRecorders.push(recorder);

      const audioChunks = [];
      mediaRecorders[mediaRecorders.length - 1].addEventListener(
        'dataavailable',
        (event) => {
          audioChunks.push(event.data);
        }
      );
    });
}
export function stopRec() {
  if (mediaRecorders.length > 0) {
    mediaRecorders[mediaRecorders.length - 1].stop();
  }
}
///????don't work :(
export function stopAllRec() {
  mediaRecorders?.forEach((r) => {
    if (r.state === 'recording') {
      r.stop();
    }
  });
}
// const sound = new Howl({
//   src: ["https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/E5.mp3"],
// });
// sound.volume(0.5);
// sound.stereo(-1);

// const soundd = new Howl({
//   src: ["https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/D2.mp3"],
// });
// soundd.stereo(-1);
// soundd.volume(0.5);

// // const sounddd = new Howl({
// //   src: ['https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/A2.mp3'],
// // });
// // sounddd.stereo(-1);
// // sounddd.volume(0);

// const sound6 = new Howl({
//   src: ["https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/G2.mp3"],
// });
// sound6.stereo(-1);
// sound6.volume(0.5);
// const sound7 = new Howl({
//   src: ["https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/B5.mp3"],
// });
// sound7.stereo(-1);
// sound7.volume(0.5);
// const sound8 = new Howl({
//   src: ["https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/e5.mp3"],
// });
// sound8.stereo(-1);
// sound8.volume(0.5);
// const sound2 = new Howl({
//   src: ["/mando/G9.mp3"],
// });
// sound2.stereo(1);
// sound2.volume(0.5);
// const sound3 = new Howl({
//   src: ["/mando/A4.mp3"],
// });
// sound3.stereo(1);
// sound3.volume(0.5);
// const sound4 = new Howl({
//   src: ["/mando/D7.mp3"],
// });
// sound4.stereo(1);
// sound4.volume(0.5);
// const sound5 = new Howl({
//   src: ["/mando/E5.mp3"],
// });
// sound5.stereo(1);
// sound5.volume(0.5);

// export const play = () => {
//   let num = 0;
//   const interval = setInterval(() => {
//     num % 2 === 0
//       ? sound.play()
//       : (() => {
//           soundd.play();
//           // sounddd.play();
//           // setTimeout(() => {
//           //   soundd.volume(0);
//           //   sounddd.volume(0.5);
//           // }, 250);
//         })();
//     setTimeout(() => {
//       sound2.play();
//       sound3.play();
//       sound4.play();
//       sound5.play();
//       setTimeout(() => {
//         sound6.play();
//       }, 20);
//       setTimeout(() => {
//         sound7.play();
//       }, 40);
//       setTimeout(() => {
//         sound8.play();
//       }, 60);
//     }, 500);
//     num++;
//   }, 1000);
//   return interval;
// };

// export class PlayRoll {
//   constructor(song) {
//     this.capo = song.capo;
//     this.measures = song.measures;
//     this.guitar = [];
//     this.mando = [];

//     this.init();
//   }
//   init() {
//     console.log('hi');
//   }
// }
