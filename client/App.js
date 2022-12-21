import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserSongs } from './store/songSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserSongs());
  }, []);

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
