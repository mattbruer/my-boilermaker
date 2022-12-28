import React, { useLayoutEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useResize from 'use-resize';
import LandscapeChart from './LandscapeChart';
import PortraitChart from './PortraitChart';

const Chart = () => {
  const size = useResize();
  const ref = useRef(null);

  return (
    <Container ref={ref}>
      <div
        style={{
          position: 'fixed',
          left: '40px',
          border: '1px solid red',
          width: '2px',
          height: '200px',
          zIndex: 2000,
          boxShadow: '3px 3px 4px black',
        }}
      ></div>
      {ref.current?.clientWidth > ref.current?.clientHeight ? (
        <LandscapeChart />
      ) : (
        <LandscapeChart />
      )}
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  width: 100%;
`;
