import React from 'react';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { changeTempo } from '../../store/songSlice';

const TempoSlider = () => {
  const dispatch = useDispatch();
  const { tempo } = useSelector((state) => state.songs);
  return (
    <Slider
      style={{ width: '100%', margin: '0 3vw 0 3vw' }}
      value={tempo}
      min={1}
      max={300}
      onChange={(e) => dispatch(changeTempo(e.target.value))}
      aria-label="Default"
      valueLabelDisplay="auto"
    />
  );
};

export default TempoSlider;
