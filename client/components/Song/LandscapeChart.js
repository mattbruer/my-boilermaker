import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Measure from './Measure';
import store from '../../store';

const LandscapeChart = () => {
  const { measures } = useSelector((state) => state.songs);

  const { isPlaying, position } = useSelector((state) => state.songs);

  return (
    <div
      style={{
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

const breatheAnimation = (len) => keyframes`
0% { right:0px}
/* 25% {right: ${2 * 192}px}
50% { right: ${4 * 192}px }
75% { right: ${6 * 192}px } */
100% { right: ${len * 192}px }`;

const Container = styled.div`
  display: flex;
  position: relative;
  right: ${(props) => {
    return 192 * props.position + 'px';
  }};
  align-items: center;
  box-shadow: 0px 0px 15px black;
  width: ${(props) => (props.isPlaying ? '10000px' : '100%')};
  min-height: 150px;
  background-color: white;
  overflow-x: ${(props) => (props.isPlaying ? 'hidden' : 'scroll')};
  padding: 20px;
  animation-name: ${(props) => breatheAnimation(props.len)};
  animation-duration: ${(props) => (props.isPlaying ? '8s' : '0s')};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;
