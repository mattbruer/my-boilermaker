import React from 'react';
import styled from 'styled-components';
import { CenteredDiv, PShadow } from '../styledDivs';
import {
  Edit,
  PlayArrowOutlined,
  Tune,
  Add,
  Remove,
} from '@mui/icons-material';
import TempoSlider from './TempoSlider';
import { toggleEditMode } from '../../store/songSlice';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

const ControlBar = () => {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.songs.editMode);
  return (
    <Container>
      <CenteredDiv style={{ justifyContent: 'space-around' }}>
        <Button
          style={buttonStyle}
          variant="outlined"
          onClick={() => dispatch(toggleEditMode(!editMode))}
        >
          {editMode ? 'save' : <Edit />}
        </Button>
        {editMode ? (
          <>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleEditMode(!editMode))}
            >
              <Add />
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleEditMode(!editMode))}
            >
              <Remove />
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleEditMode(!editMode))}
            >
              <Tune />
            </Button>
          </>
        ) : (
          <>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleEditMode(!editMode))}
            >
              <Tune />
            </Button>
            <Button style={buttonStyle} variant="outlined">
              <PlayArrowOutlined />
            </Button>
            <CenteredDiv
              style={{
                width: '40vw',
                marginRight: '10px',
              }}
            >
              <p style={{ fontSize: '20px', margin: '15px', color: 'white' }}>
                Tempo
              </p>
              <TempoSlider />
            </CenteredDiv>
          </>
        )}
      </CenteredDiv>
    </Container>
  );
};

export default ControlBar;

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 55px;
  width: 100%;
  background-color: #3b8689;
  user-select: none;
  box-shadow: 0px -5px 15px black;
`;

const buttonStyle = {
  backgroundColor: 'white',
  boxShadow: '5px -2px 10px black',
  height: '45px',
};
