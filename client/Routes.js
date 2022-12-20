import React, { useEffect } from 'react';
import { Routes as AppRoutes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { me } from './store/authSlice';
import { Login, Signup } from './components/AuthForm';
import Hi from './components/Hi';
import Home from './components/Home';

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const { auth } = useSelector((state) => state);

  const isLoggedIn = !!auth.id;

  return (
    <AppRoutes>
      {console.log(isLoggedIn)}
      {isLoggedIn ? (
        <>
          <Route path="/hi" element={<Hi />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </AppRoutes>
  );
};

export default Routes;
