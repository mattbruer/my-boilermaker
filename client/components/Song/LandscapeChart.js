import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Measure from "./Measure";
const LandscapeChart = () => {
  const { measures } = useSelector((state) => state.songs);

  return (
    <Container>
      {measures.map((m, index) => (
        <>
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
          <Measure measureNumber={index} />
        </>
      ))}
    </Container>
  );
};

export default LandscapeChart;

const Container = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 15px black;
  width: 100%;
  min-height: 150px;
  background-color: white;
  overflow-x: scroll;
  padding: 20px;
`;
