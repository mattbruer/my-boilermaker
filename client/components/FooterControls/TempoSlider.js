import React from 'react';
import Slider from '@mui/material/Slider';

const TempoSlider = () => {
  return (
    <Slider
      style={{ minWidth: '50%' }}
      defaultValue={50}
      aria-label="Default"
      valueLabelDisplay="auto"
    />
  );
};

export default TempoSlider;
