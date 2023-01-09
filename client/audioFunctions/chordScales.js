export const chromFlat = [
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

export const chromSharp = [
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
  'G#',
];

export const chromFlatAsc = [...chromFlat].reverse();
export const chromSharpAsc = [...chromSharp].reverse();
export function getRoot(chord) {
  return chord[1] === 'b' || chord[1] === '#' ? chord[0] + chord[1] : chord[0];
}

export function getQuality(chord) {
  return chord.split(getRoot(chord))[1];
}
