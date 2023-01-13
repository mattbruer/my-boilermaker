import React from 'react';
import Modal from '../Modal';
import StereoSlider from '../Mixer/StereoSlider';
import styled from 'styled-components';
const Mixer = () => {
  return (
    <Modal style={style}>
      <InstContainer>
        <p style={{ textAlign: 'center', marginBottom: '5px' }}>Mando</p>
        <StereoSlider instrument="mando" />
        <StereoSlider instrument="mando" />
      </InstContainer>
      <InstContainer>
        <p style={{ textAlign: 'center', marginBottom: '5px' }}>Guitar</p>
        <StereoSlider instrument="guitar" />
        <StereoSlider instrument="guitar" />
      </InstContainer>
    </Modal>
  );
};

export default Mixer;

const style = {
  width: '80%',
  height: '50vh',
  margin: '10vh 10% 0 10%',
  marginTop: '10vh',
  zIndex: '1001',
  position: 'fixed',
  backgroundColor: 'black',
  border: '5px groove aqua',
  borderRadius: '50px',
  overflow: 'scroll',
  color: 'white',
};

const InstContainer = styled.div`
  margin-bottom: 20px;
`;
