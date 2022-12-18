import React from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

import Hi from './components/Hi';
import Home from './components/Home';
const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/hi" element={<Hi />} />
      <Route path="/home" element={<Home />} />
    </AppRoutes>
  );
};

export default Routes;
