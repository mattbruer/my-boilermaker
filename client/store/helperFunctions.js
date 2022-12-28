export const sendToken = () => ({
  headers: {
    authorization: window.localStorage.getItem('token'),
  },
});

// export const notes = ['A', 'A#', 'Ab', 'B', 'C', 'D', 'E', 'F', 'G'];

// export function checkFirst(input) {
//   return notes.some((note) => {
//     return input.startsWith(note);
//   });
// }
