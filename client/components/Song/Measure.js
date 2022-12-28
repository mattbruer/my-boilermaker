import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PShadow } from '../styledDivs';
import { editChord } from '../../store/songSlice';
import { checkFirst } from '../../store/helperFunctions';

const Measure = ({ measureNumber }) => {
  const dispatch = useDispatch();
  const { measures, editMode } = useSelector((state) => state.songs);

  const measure = measures[measureNumber];

  const handleChange = (e, pos) => {
    dispatch(
      editChord({ measureNumber, value: e.target.value, position: pos })
    );
  };

  return (
    <MeasureContainer>
      {editMode ? (
        <>
          <input
            style={{
              height: '40px',
              marginLeft: '12px',
              marginRight: '6px',
              width: '50%',
              fontSize: '20px',
            }}
            onChange={(e) => handleChange(e, 0)}
            value={measure[0]}
          />
          <input
            style={{
              height: '40px',
              marginLeft: '6px',
              marginRight: '12px',
              width: '50%',
              fontSize: '20px',
            }}
            onChange={(e) => handleChange(e, 1)}
            value={measure[1]}
          />
        </>
      ) : (
        <>
          <p style={{ width: '50%', marginLeft: '12px' }}>{measure[0]}</p>
          <p>{measure[1]}</p>
        </>
      )}
    </MeasureContainer>
  );
};

export default Measure;

const MeasureContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  min-width: 192px;
  max-width: 192px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  font-size: 30px;
`;
