import React from 'react';
import { CenteredDiv } from '../styledDivs';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCapoModal } from '../../store/uiSlice';
import { setCapo } from '../../store/songSlice';
const CapoModal = () => {
  const dispatch = useDispatch();
  const { capo } = useSelector((state) => state.songs);
  return (
    <Modal style={style}>
      <CenteredDiv style={{ flexDirection: 'column' }}>
        <h2>Guitar Capo</h2>
        <select
          value={capo}
          onChange={(e) => dispatch(setCapo(+e.target.value))}
          style={{ fontSize: '20px' }}
        >
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <button onClick={() => dispatch(toggleCapoModal(false))}>Close </button>
      </CenteredDiv>
    </Modal>
  );
};

export default CapoModal;

const style = {
  width: '200px',
  height: '25vh',
  margin: '23vh calc((100vw - 200px)/2) 0 calc((100vw - 200px)/2)',

  zIndex: '1001',
  position: 'fixed',
  backgroundColor: 'grey',
  border: '5px groove aqua',
  borderRadius: '50px',
  overflow: 'scroll',
  color: 'white',
};
