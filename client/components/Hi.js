import React from 'react';
import { useSelector } from 'react-redux';

const Hi = () => {
  const state = useSelector((state) => state);

  return <div style={{ marginTop: '65px' }}>{JSON.stringify(state)}</div>;
};

export default Hi;
