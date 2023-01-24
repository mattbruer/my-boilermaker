import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editTitle, selectSong, selectPass } from '../../store/songSlice';
import { CenteredDiv, PShadow } from '../styledDivs';
import Measure from './Measure';
import Chart from './Chart';
import ControlBar from '../FooterControls/ControlBar';
import Mixer from '../UI/Mixer/Mixer';
import CapoModal from '../UI/CapoModal';
import { flattenSong } from '../../audioFunctions/play';

const Song = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { allSongs, editMode, selectedSong, selectedPass } = useSelector(
    (state) => state.songs
  );
  const { toggleMixerModal } = useSelector((state) => state.mixer);
  const { toggleCapoModal } = useSelector((state) => state.ui);
  const { passes } = useSelector((state) => state.songs);
  //work on this useEffect unnecessay selectSongs
  useEffect(() => {
    allSongs.length && dispatch(selectSong(+params.songId));
  }, [allSongs]);
  const [song] = allSongs.filter((s) => s.id === selectedSong);

  useEffect(() => {
    selectedSong && flattenSong(song);
  }, [selectedSong]);
  return (
    <Container>
      {toggleMixerModal && <Mixer />}
      {toggleCapoModal && <CapoModal />}

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
          <>
            <PShadow style={{ marginTop: '20px', marginBottom: '20px' }}>
              {song && song.title}
            </PShadow>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {passes.length > 0 && <h2>Recorded Passes</h2>}
              <div>
                {passes.map((pass, i) => {
                  return (
                    <button
                      style={{
                        width: '40px',
                        backgroundColor: selectedPass.includes(i)
                          ? 'red'
                          : 'white',
                        height: '40px',
                        borderRadius: '3px',
                        margin: '2px',
                        boxShadow: '2px 2px 5px black',
                      }}
                      key={i}
                      onClick={() => {
                        dispatch(selectPass(i));
                      }}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
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
  background-color: #0a98f7;
`;
