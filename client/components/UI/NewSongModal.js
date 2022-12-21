import React from 'react';
import { CenteredDiv, PShadow } from '../styledDivs';
import Modal from './Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { newSong } from '../../store/songSlice';
import Button from './Button';

const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Db', 'Ab', 'Eb', 'Bb'];

const NewSongModal = ({ setOpenModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(newSong({ title }));
  };
  return (
    <Modal>
      <CenteredDiv style={{ flexDirection: 'column' }}>
        <CenteredDiv style={{ flexDirection: 'column' }}>
          <PShadow>Start a New Song</PShadow>
          <TextField
            style={{ marginTop: '10px', marginBottom: '10px' }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleChange}
          />
        </CenteredDiv>

        <Button
          onClick={() => {
            handleSubmit();
            setOpenModal(false);
          }}
        >
          GO!
        </Button>
      </CenteredDiv>
    </Modal>
  );
};

export default NewSongModal;

const styles = {
  keys: {
    border: '1px groove grey',
    borderRadius: '5px',
    width: '40px',
    height: '40px',
  },
  keysContainer: {
    padding: '3px',
  },
};
