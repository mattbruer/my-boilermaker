const [root, third, fifth, seventh] = ['root', 'third', 'fifth', 'seventh'];

const openVoicings = {
  A: [0, 0, 2, 2, 2, 0],
  A7: [0, 0, 2, 0, 2, 0],
  Am: [0, 0, 2, 2, 1, 0],
  Am7: [0, 0, 2, 0, 1, 0],
  B7: [null, 2, 1, 2, 0, 2],
  C: [3, 3, 2, 0, 1, 0],
  C7: [0, 3, 2, 3, 1, 0],
  D: [null, 0, 0, 2, 3, 2],
  D7: [null, 0, 0, 2, 1, 2],
  E: [0, 2, 2, 1, 0, 0],
  E7: [0, 2, 0, 1, 0, 0],
  Em: [0, 2, 2, 0, 0, 0],
  Em7: [0, 2, 0, 0, 0, 0],
  G: [3, 2, 0, 0, 3, 3],
  G7: [3, 2, 0, 0, 0, 1],
};

const openVoicingChordTones = {
  A: [fifth, root, fifth, root, third, fifth],
  A7: [fifth, root, fifth, seventh, third, fifth],
  Am: [fifth, root, fifth, root, third, fifth],
  Am7: [fifth, root, fifth, seventh, third, fifth],
  B7: [null, root, third, seventh, root, fifth],
  C: [fifth, root, third, fifth, root, third],
  C7: [third, root, third, seventh, root, third],
  D: [null, fifth, root, fifth, root, third],
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
}

function rootString(chord) {
  return closedVoicingChordTones[chord]?.indexOf(root);
}

function findClosedVoicing(chord) {
  const root = getRoot(chord);
  const choices = Object.keys(closedVoicings).filter(
    (ch) => getQuality(chord) === getQuality(ch)
  );
  const strings = choices.map((c) => rootString(c));

  const lowestRoot = strings.map((s) => {
    let res;
    for (let i = 0; i < 10; i++) {
      if (noteMap[s][i].includes(root)) {
        res = i;
      }
    }
    return res;
  });
  console.log(lowestRoot.indexOf(Math.min.apply(null, lowestRoot)));

  // const choice = Math.min(lowestRoot);
  return strings;
}

const tuning = ['E', 'A', 'D', 'G', 'B', 'e'];

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

console.log(findClosedVoicing('F#7'));
