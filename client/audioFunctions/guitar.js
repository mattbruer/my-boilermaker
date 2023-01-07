import { Howl } from 'howler';
import store from '../store';
import { disablePlay } from '../store/uiSlice';

//memoization...sorta?
const guitarNotes = {};
const statusObj = {};
let playrollChordTones;
let playroll;
let flattenedSong;

export function guitarCheck() {
  Object.values(statusObj).every((n) => n) &&
    store.dispatch(disablePlay(false));
}

function loadNotes(playroll) {
  playroll.forEach((chord) => {
    chord.forEach((fret, string) => {
      let note = tuning[string] + fret;
      if (!guitarNotes[note] && fret !== null) {
        statusObj[note] = false;
        guitarNotes[note] = new Howl({
          src: [
            `https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/${note}.mp3`,
          ],
          onload: () => {
            statusObj[note] = true;

            guitarCheck();
          },
        });
      }
    });
  });
}

function applyCapo(voicing, capo) {
  return voicing.map((note) => {
    if (note !== null) {
      return note + capo;
    }
  });
}

export function buildGuitarPlayroll(song, capo) {
  flattenedSong = song.map((chord) => transposeToCapo(chord, capo));

  playroll = flattenedSong.map((chord) => applyCapo(getVoicing(chord), capo));

  playrollChordTones = flattenedSong.map(
    (chord) => openVoicingChordTones[chord] || closedVoicingChordTones[chord]
  );
  loadNotes(playroll);

  let spreadCTs = [];
  playrollChordTones.forEach((ch) => {
    spreadCTs.push(ch.slice(0, 3));
    spreadCTs.push(ch.slice(3));
  });
  playrollChordTones = spreadCTs;

  let spread = [];
  playroll = playroll.map((ch) =>
    ch.map((note, string) => {
      return tuning[string] + note;
    })
  );

  playroll.forEach((ch) => {
    spread.push(ch.slice(0, 3));
    spread.push(ch.slice(3));
  });
  playroll = spread;
}

function checkHalfSteps(note, choices) {
  let choice;
  choices.forEach((n) => {
    if (note[0] === n[0] && Math.abs(+note[1] - +n[1]) === 1) {
      choice = n;
    }
  });
  return choice;
}
function checkWholeSteps(note, choices) {
  let choice;
  choices.forEach((n) => {
    if (note[0] === n[0] && Math.abs(+note[1] - +n[1]) === 2) {
      choice = n;
    }
  });
  return choice;
}

function silenceRingingNotes(note) {
  const string = note[0];

  const notesToSilence = Object.keys(guitarNotes).filter(
    (str) => str[0] === string
  );

  notesToSilence.forEach((n) => guitarNotes[n].fade(0.5, 0, 60));
}

let prevBassNote;

export function guitarPlay() {
  let pos = store.getState().songs.position;
  if (pos % 2 === 0) {
    if (pos === 0) {
      let note = playroll[0][playrollChordTones[0].indexOf(root)];
      silenceRingingNotes(note);
      guitarNotes[note].volume(1).play();
      prevBassNote = note;
    } else {
      let choices = playroll[pos].filter((note) => note !== prevBassNote);
      let half = checkHalfSteps(prevBassNote, choices);
      let whole = checkWholeSteps(prevBassNote, choices);
      // let whole = null;
      if (half) {
        silenceRingingNotes(half);
        guitarNotes[half].volume(1).play();
        prevBassNote = half;
      } else if (whole) {
        silenceRingingNotes(whole);
        guitarNotes[whole].volume(1).play();
        prevBassNote = whole;
      } else {
        let len = choices.length;
        let note = choices[Math.floor(Math.random() * len)];
        silenceRingingNotes(note);
        guitarNotes[note].volume(1).play();
        prevBassNote = note;
      }
    }
  }
  pos % 2 !== 0 &&
    playroll[pos].forEach((note, i) => {
      setTimeout(() => {
        silenceRingingNotes(note);
        guitarNotes[note].volume(0.5).play();
      }, i * 40);
    });
}

const [root, third, fifth, seventh] = ['root', 'third', 'fifth', 'seventh'];

const openVoicings = {
  A: [0, 0, 2, 2, 2, 0],
  A7: [0, 0, 2, 0, 2, 0],
  Am: [0, 0, 2, 2, 1, 0],
  Am7: [0, 0, 2, 0, 1, 0],
  B7: [2, 2, 1, 2, 0, 2],
  C: [3, 3, 2, 0, 1, 0],
  C7: [0, 3, 2, 3, 1, 0],
  D: [2, 0, 0, 2, 3, 2],
  D7: [2, 0, 0, 2, 1, 2],
  E: [0, 2, 2, 1, 0, 0],
  E7: [0, 2, 0, 1, 0, 0],
  Em: [0, 2, 2, 0, 0, 0],
  Em7: [0, 2, 0, 0, 3, 0],
  G: [3, 2, 0, 0, 3, 3],
  G7: [3, 2, 0, 0, 0, 1],
};

const openVoicingChordTones = {
  A: [fifth, root, fifth, root, third, fifth],
  A7: [fifth, root, fifth, seventh, third, fifth],
  Am: [null, root, fifth, root, third, fifth],
  Am7: [fifth, root, fifth, seventh, third, fifth],
  B7: [fifth, root, third, seventh, root, fifth],
  C: [fifth, root, third, fifth, root, third],
  C7: [third, root, third, seventh, root, third],
  D: [third, fifth, root, fifth, root, third],
  D7: [null, fifth, root, fifth, seventh, third],
  E: [root, fifth, root, third, fifth, root],
  E7: [root, fifth, seventh, third, fifth, root],
  Em: [root, fifth, root, third, fifth, root],
  Em7: [root, fifth, seventh, third, fifth, root],
  G: [root, third, fifth, root, fifth, root],
  G7: [root, third, fifth, root, third, seventh],
};

const closedVoicings = {
  F: [1, 3, 3, 2, 1, 1],
  F7: [1, 3, 1, 2, 1, 1],
  Fm: [1, 3, 3, 1, 1, 1],
  Fm7: [1, 3, 1, 1, 1, 1],
  Bb: [1, 1, 3, 3, 3, 1],
  Bb7: [1, 1, 3, 1, 3, 1],
  Bbm: [1, 1, 3, 3, 2, 1],
  Bbm7: [1, 1, 3, 1, 2, 1],
};

const closedVoicingChordTones = {
  F: [root, fifth, root, third, fifth, root],
  F7: [root, fifth, seventh, third, fifth, root],
  Fm: [root, fifth, root, third, fifth, root],
  Fm7: [root, fifth, seventh, third, fifth, root],
  Bb: [fifth, root, fifth, root, third, fifth],
  Bb7: [fifth, root, fifth, seventh, third, fifth],
  Bbm: [fifth, root, fifth, root, third, fifth],
  Bbm7: [fifth, root, fifth, seventh, third, fifth],
};

function getRoot(chord) {
  return chord[1] === 'b' || chord[1] === '#' ? chord[0] + chord[1] : chord[0];
}

function getQuality(chord) {
  return chord.split(getRoot(chord))[1];
}

function fretsToNotes(voicing) {
  return voicing.map((fret, i) => noteMap[i][fret]);
}

function getVoicing(chord) {
  if (openVoicings[chord]) {
    return openVoicings[chord];
  }
  if (closedVoicings[chord]) {
    return closedVoicings[chord];
  }
  return buildClosedVoicing(chord);
}

function rootString(chord) {
  return (
    openVoicingChordTones[chord]?.indexOf(root) ||
    closedVoicingChordTones[chord]?.indexOf(root)
  );
}

function buildClosedVoicing(chord) {
  const root = getRoot(chord);
  const qual = getQuality(chord);

  let result;
  let i = 0;
  try {
    while (!result && i < 10) {
      if (noteMap[0][i].includes(root)) {
        result = closedVoicings['F' + qual].map((fret) => fret + (i - 1));
        closedVoicings[chord] = result;
        closedVoicingChordTones[chord] = closedVoicingChordTones['F' + qual];
      }
      if (noteMap[1][i].includes(root)) {
        result = closedVoicings['Bb' + qual].map((fret) => fret + (i - 1));

        closedVoicings[chord] = result;
        closedVoicingChordTones[chord] = closedVoicingChordTones['Bb' + qual];
      }
      i++;
    }
    return result;
  } catch (error) {
    return 'that chord is not supported';
  }
}

function transposeToCapo(chord, capo) {
  if (capo === 0) {
    return chord;
  } else {
    const root = getRoot(chord);
    const qual = getQuality(chord);
    let newRoot = chromFlat.includes(root)
      ? chromFlat[chromFlat.indexOf(root) + capo]
      : chromSharp[chromSharp.indexOf(root) + capo];

    return newRoot + qual;
  }

  // return getVoicing(newRoot + qual).map((fret) => fret + capo);
}

const tuning = ['E', 'A', 'D', 'G', 'B', 'e'];

export function validateChords(progression) {
  // const progression = getProgression();
  let flatProg = [];
  progression.forEach((measure) => {
    flatProg.push(...measure);
  });

  return flatProg.every((chord, i) => {
    const root = getRoot(chord);
    const qual = getQuality(chord);
    if (i === 0 && chord === '') {
      window.alert('There must be a chord on beat 1.');
      return false;
    }
    if (chord === '') {
      return true;
    }
    if (!(chromFlat.includes(root) || chromSharp.includes(root))) {
      window.alert(`Sorry, ${chord} is not supported in this app.`);
      return false;
    }

    if (!['', 'm', '7', 'm7'].includes(qual)) {
      window.alert(`Sorry, ${chord} is not supported in this app.`);
      return false;
    }
    // getVoicing(chord).forEach((fret, string) => {
    //   const note = `${tuning[string]}${fret}`;
    //   if (!guitarNotes[note] && fret !== null) {
    //     guitarNotes[note] = new Howl({
    //       src: [
    //         `https://mvbguitarsamples.s3.us-east-2.amazonaws.com/guitar/${note}.mp3`,
    //       ],
    //     });
    //   }
    // });
    return true;
  });
}

const chromFlat = [
  'G',
  'Gb',
  'F',
  'E',
  'Eb',
  'D',
  'Db',
  'C',
  'B',
  'Bb',
  'A',
  'Ab',
  'G',
  'Gb',
  'F',
  'E',
  'Eb',
  'D',
  'Db',
  'C',
  'B',
  'Bb',
  'A',
  'Ab',
];

const chromSharp = [
  'G#',
  'G',
  'F#',
  'F',
  'E',
  'D#',
  'D',
  'C#',
  'C',
  'B',
  'A#',
  'A',
  'G#',
  'G',
  'F#',
  'F',
  'E',
  'D#',
  'D',
  'C#',
  'C',
  'B',
  'A#',
  'A',
];

const noteMap = [
  [
    ['E'],
    ['F'],
    ['F#', 'Gb'],
    ['G'],
    ['G#', 'Ab'],
    ['A'],
    ['A#', 'Bb'],
    ['B'],
    ['C'],
    ['C#', 'Db'],
    ['D'],
    ['D#', 'Eb'],
  ],
  [
    ['A'],
    ['A#', 'Bb'],
    ['B'],
    ['C'],
    ['C#', 'Db'],
    ['D'],
    ['D#', 'Eb'],
    ['E'],
    ['F'],
    ['F#', 'Gb'],
    ['G'],
    ['G#', 'Ab'],
  ],
  [
    ['D'],
    ['D#', 'Eb'],
    ['E'],
    ['F'],
    ['F#', 'Gb'],
    ['G'],
    ['G#', 'Ab'],
    ['A'],
    ['A#', 'Bb'],
    ['B'],
    ['C'],
    ['C#', 'Db'],
  ],
  [
    ['G'],
    ['G#', 'Ab'],
    ['A'],
    ['A#', 'Bb'],
    ['B'],
    ['C'],
    ['C#', 'Db'],
    ['D'],
    ['D#', 'Eb'],
    ['E'],
    ['F'],
    ['F#', 'Gb'],
  ],
  [
    ['B'],
    ['C'],
    ['C#', 'Db'],
    ['D'],
    ['D#', 'Eb'],
    ['E'],
    ['F'],
    ['F#', 'Gb'],
    ['G'],
    ['G#', 'Ab'],
    ['A'],
    ['A#', 'Bb'],
  ],
  [
    ['E'],
    ['F'],
    ['F#', 'Gb'],
    ['G'],
    ['G#', 'Ab'],
    ['A'],
    ['A#', 'Bb'],
    ['B'],
    ['C'],
    ['C#', 'Db'],
    ['D'],
    ['D#', 'Eb'],
  ],
];
