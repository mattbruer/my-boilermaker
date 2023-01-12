import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { forgotPassword } from '../../store';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MuiModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Account email:</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
            <button type="submit">Email reset password link</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default MuiModal;
