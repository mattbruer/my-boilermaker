import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CenteredDiv, PShadow } from '../styledDivs';
import {
  Edit,
  PlayArrowOutlined,
  Tune,
  Add,
  StopOutlined,
  Remove,
} from '@mui/icons-material';
import TempoSlider from './TempoSlider';
import { toggleMixer } from '../../store/mixerSlice';
import { toggleCapoModal, disablePlay } from '../../store/uiSlice';
import {
  validateChords,
  guitarCheck,
  guitarPlay,
} from '../../audioFunctions/guitar';
import {
  toggleEditMode,
  addMeasure,
  removeMeasure,
  saveChanges,
  playSong,
  stopSong,
} from '../../store/songSlice';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { flattenSong } from '../../audioFunctions/play';

const ControlBar = () => {
  const dispatch = useDispatch();
  const { editMode, measures, isPlaying, allSongs, selectedSong } = useSelector(
    (state) => state.songs
  );
  const { playDisabled } = useSelector((state) => state.ui);
  const { toggleMixerModal } = useSelector((state) => state.mixer);
  const [song] = allSongs.filter((s) => s.id === selectedSong);

  // useEffect(() => {
  //   guitarCheck();
  // }, []);

  return (
    <Container>
      <CenteredDiv style={{ justifyContent: 'space-around' }}>
        {editMode ? (
          <>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => {
                // const playroll = new PlayRoll(song);
                const valid = validateChords(measures);
                flattenSong(song);
                valid && dispatch(saveChanges(song));
                guitarCheck();
              }}
            >
              Save
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleCapoModal(true))}
            >
              Capo
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(addMeasure())}
            >
              <Add />
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(removeMeasure())}
            >
              <Remove />
            </Button>
          </>
        ) : (
          <CenteredDiv style={{ flexDirection: 'column' }}>
            <CenteredDiv style={{ margin: '10px' }}>
              <Button
                disabled={isPlaying}
                style={buttonStyle}
                variant="outlined"
                onClick={() => {
                  dispatch(toggleEditMode(!editMode));
                  dispatch(disablePlay(true));
                }}
              >
                <Edit />
              </Button>
              <Button
                disabled={!isPlaying && playDisabled}
                onClick={() => {
                  isPlaying
                    ? dispatch(stopSong())
                    : (() => {
                        dispatch(playSong());
                      })();
                }}
                style={buttonStyle}
                variant="outlined"
              >
                {isPlaying ? <StopOutlined /> : <PlayArrowOutlined />}
              </Button>
              <Button
                style={buttonStyle}
                variant="outlined"
                onClick={() => dispatch(toggleMixer(!toggleMixerModal))}
              >
                <Tune />
              </Button>
            </CenteredDiv>

            <CenteredDiv
              style={{
                width: '90vw',
                marginBottom: '5px',
              }}
            >
              <p style={{ fontSize: '20px', margin: '15px', color: 'white' }}>
                Tempo
              </p>
              <TempoSlider />
            </CenteredDiv>
          </CenteredDiv>
        )}
      </CenteredDiv>
    </Container>
  );
};

export default ControlBar;

const Container = styled.div`
  position: fixed;
  display: flex;
  height: 120px;
  bottom: 0;

  width: 100%;
  background-color: black;
  user-select: none;
  box-shadow: 0px -5px 15px black;
`;

const buttonStyle = {
  backgroundColor: 'white',
  boxShadow: '5px -2px 10px black',
  height: '40px',
  width: '100%',
  margin: '0 2vw 0 2vw',
};
