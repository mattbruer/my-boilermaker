import React from 'react';
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '../../../store/mixerSlice';
import styled from 'styled-components';

const StereoSlider = ({ instrument }) => {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.mixer);
  return (
    <div style={{ display: 'flex', color: 'white' }}>
      <p>Balance</p>
      <Slider
        style={{
          width: '100%',
          margin: '5px',
          border: '1px solid grey',
        }}
        defaultValue={0}
        min={-100}
        max={100}
        value={balance[instrument] || 0}
        onChange={(e) =>
          dispatch(setBalance({ instrument, balance: e.target.value }))
        }
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default StereoSlider;
