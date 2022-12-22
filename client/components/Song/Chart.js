import React, { useLayoutEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useResize from 'use-resize';

const Chart = () => {
  const size = useResize();
  const ref = useRef(null);

  return (
    <Container ref={ref}>
      <p>
        {ref.current?.clientWidth > ref.current?.clientHeight
          ? 'landscape'
          : 'portrait'}
      </p>
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 300px);
  border: 5px groove #158ae0;
  border-radius: 5px;
  width: 90%;
  box-shadow: 0px 0px 15px black;
  background-color: white;
`;
