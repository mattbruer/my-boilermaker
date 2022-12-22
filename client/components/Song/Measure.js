import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PShadow } from '../styledDivs';

const Measure = ({ measureNumber }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { allSongs, selectedSong, measures, editMode } = useSelector(
    (state) => state.songs
  );

  const measure = measures[measureNumber];

  return <MeasureContainer></MeasureContainer>;
};

export default Measure;

const MeasureContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 25%;

  border-left: 1px solid black;
  border-right: 1px solid black;
`;
