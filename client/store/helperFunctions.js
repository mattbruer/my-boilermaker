export const sendToken = () => ({
  headers: {
    authorization: window.localStorage.getItem('token'),
  },
});
