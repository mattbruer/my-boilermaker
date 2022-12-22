import React, { useEffect } from 'react';
import { Routes as AppRoutes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { me } from './store/authSlice';
import { Login, Signup } from './components/AuthForm';
import Hi from './components/Hi';
import Home from './components/Home';
import Song from './components/Song/Song';

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const { auth } = useSelector((state) => state);

  const isLoggedIn = !!auth.id;

  return (
    <AppRoutes>
      <>
        <Route path="/hi" element={<Hi />} />
        <Route path="/home" element={<Home />} />
        <Route path="/song/:songId" element={<Song />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    </AppRoutes>
  );
};

export default Routes;
