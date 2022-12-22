import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editTitle, selectSong } from '../../store/songSlice';
import { CenteredDiv, PShadow } from '../styledDivs';
import Measure from './Measure';
import Chart from './Chart';
import ControlBar from '../FooterControls/ControlBar';

const Song = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { allSongs, editMode, selectedSong, lines } = useSelector(
    (state) => state.songs
  );

  useEffect(() => {
    allSongs.length && dispatch(selectSong(+params.songId));
  }, [allSongs]);

  const [song] = allSongs.filter((s) => s.id === selectedSong);

  return (
    <Container>
      <CenteredDiv style={{ flexDirection: 'column' }}>
        {editMode ? (
          <input
            style={{
              marginTop: '20px',
              marginBottom: '20px',
              fontSize: '20px',
              height: '40px',
            }}
            value={song.title}
            onChange={(e) => dispatch(editTitle(e.target.value))}
          />
        ) : (
          <PShadow style={{ marginTop: '20px', marginBottom: '20px' }}>
            {song && song.title}
          </PShadow>
        )}
        <Chart />
        {/* {lines &&
          lines.map((l, index) => (
            <div
              style={{
                width: '100vw',
                marginBottom: '10px',
                padding: '5px',
                height: '100px',
              }}
            >
              <Measure measureNumber={index} />
            </div>
          ))} */}
      </CenteredDiv>
      <ControlBar />
    </Container>
  );
};

export default Song;

const Container = styled.div`
  margin-top: 64px;
  height: calc(100vh - 106px);
  background-color: #204368;
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 12%,
    rgba(253, 29, 29, 1) 56%,
    rgba(217, 214, 21, 1) 99%
  );
`;
