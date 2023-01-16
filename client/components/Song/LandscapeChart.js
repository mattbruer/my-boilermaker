import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Measure from './Measure';
import store from '../../store';
import { getExpectedTime, getPrevTime } from '../../audioFunctions/play';

const LandscapeChart = () => {
  const { measures } = useSelector((state) => state.songs);

  const { isPlaying, position, tempo } = useSelector((state) => state.songs);

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        padding: '50px 0px 50px 0px',
        overflow: isPlaying ? 'hidden' : 'scroll',
      }}
    >
      {/* <div
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
        }}
      >
        <svg height={'100%'}>
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="100%"
            stroke="red"
            strokeWidth={'3px'}
          />
        </svg>
      </div> */}

      <Container
        len={measures.length}
        position={position}
        isPlaying={isPlaying}
        tempo={tempo}
      >
        {measures.map((m, index) => (
          <Measure key={index} measureNumber={index} />
        ))}
        {isPlaying && (
          <>
            {measures.map((m, index) => (
              <Measure key={index} measureNumber={index} />
            ))}
            {measures.map((m, index) => (
              <Measure key={index} measureNumber={index} />
            ))}
            {measures.map((m, index) => (
              <Measure key={index} measureNumber={index} />
            ))}
            {measures.map((m, index) => (
              <Measure key={index} measureNumber={index} />
            ))}
          </>
        )}
      </Container>
    </div>
  );
};

export default LandscapeChart;

const scrollAnimation = (position, len) => {
  // const now = Date.now();
  // const exp = getExpectedTime();

  return keyframes`
  0% { right: ${(position - 1) * 48 + 192 * len + 'px'} }
  /* 25% {right: ${2 * 192}px}
  50% { right: ${4 * 192}px }
  75% { right: ${6 * 192}px } */
  100% { right: ${position * 48 + 192 * len + 'px'} }`;
};
/* right: ${(props) =>
  props.isPlaying
    ? (props.position - 1) * 48 + 192 * props.len + 'px'
    : '0px'}; */

const Container = styled.div`
  display: flex;
  position: relative;

  align-items: center;
  box-shadow: 0px 0px 15px black;
  width: ${(props) => (props.isPlaying ? '10000px' : '100%')};
  min-height: 150px;
  background-color: white;
  overflow-x: ${(props) => (props.isPlaying ? 'hidden' : 'scroll')};
  padding: 20px;
  animation-name: ${(props) => scrollAnimation(props.position, props.len)};
  animation-duration: ${(props) =>
    props.isPlaying ? `${(getExpectedTime() - Date.now()) / 2}ms` : '0s'};
  animation-timing-function: linear;
`;
