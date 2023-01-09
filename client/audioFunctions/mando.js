import { disablePlay } from '../store/uiSlice';
import { Howl } from 'howler';
import store from '../store';
import {
  chromSharpAsc,
  chromFlatAsc,
  getRoot,
  getQuality,
} from './chordScales';

const tuning = ['G', 'D', 'A', 'E'];

const voicings = {
  'F#': [6, 4, 1, 2],
  'F#7': [6, 4, 1, 2],
  Gb: [6, 4, 1, 2],
  Gb7: [6, 4, 1, 2],
  Gm: [7, 5, 1, 3],
  Gm7: [7, 5, 1, 3],
  B: [4, 1, 2],
  B7: [4, 1, 2],
  Cm: [5, 1, 3],
  Cm7: [5, 1, 3],
};

function populateVoicings() {
  const baseShapes = Object.keys(voicings);
  baseShapes.forEach((shape) => {
    let newRoot;
    const root = getRoot(shape);
    const qual = getQuality(shape);
    ///////
    const scale = chromFlatAsc.includes(root) ? chromFlatAsc : chromSharpAsc;
    const rootIndex = scale.indexOf(root);
    for (let i = 1; i < 9; i++) {
      newRoot = chromFlatAsc[rootIndex + i];
      let newChord = newRoot + qual;
      let newShape = voicings[shape].map((fret) => fret + i);
      if (voicings[newChord]) {
        if (
          Math.max.apply(null, voicings[newChord]) >
          Math.max.apply(null, newShape)
        ) {
          voicings[newChord] = newShape;
        }
      } else {
        voicings[newChord] = newShape;
      }
      newRoot = chromSharpAsc[rootIndex + i];
      newChord = newRoot + qual;
      newShape = voicings[shape].map((fret) => fret + i);
      if (voicings[newChord]) {
        if (
          Math.max.apply(null, voicings[newChord]) >
          Math.max.apply(null, newShape)
        ) {
          voicings[newChord] = newShape;
        }
      } else {
        voicings[newChord] = newShape;
      }
    }
  });
  console.log(voicings);
}
populateVoicings();
// function findChopChord(chord) {
//   const root = getRoot(chord);
//   let scale = chromFlatAsc.includes(root) ? chromFlatAsc : chromSharpAsc;
//   console.log(chromSharpAsc.indexOf('F#'));
//   console.log(scale.indexOf(root));
// }

const mandoNotes = {};
const statusObj = {};
let playroll;

function mandoCheck() {
  Object.values(statusObj).every((n) => n) &&
    ///todo
    store.dispatch(disablePlay(false));
}
export function buildMandoPlayroll(measures) {
  const arr = [];
  measures.forEach((chord) => {
    arr.push(voicings[chord]);
    arr.push(voicings[chord]);
    voicings[chord].forEach((fret, string) => {
      const note = tuning[string] + fret;

      if (!mandoNotes[note]) {
        statusObj[note] = false;
        mandoNotes[note] = new Howl({
          src: [`/mando/${note}.mp3`],
          onload: () => {
            statusObj[note] = true;

            mandoCheck();
          },
        });
      }
    });
  });
  playroll = arr;
}

export function mandoPlay() {
  const pos = store.getState().songs.position;
  // console.log(playroll);
  pos % 2 !== 0 &&
    playroll[pos].forEach((fret, string) => {
      mandoNotes[tuning[string] + fret].stereo(-0.5).volume(0.5).play();
    });
}
