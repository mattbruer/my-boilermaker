import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserSongs } from './store/songSlice';

const App = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserSongs());
  }, [auth]);

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
