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
      {ref.current?.clientWidth > ref.current?.clientHeight ? (
        <LandscapeChart />
      ) : (
        <PortraitChart />
      )}
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 300px);

  width: 100%;
`;