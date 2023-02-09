import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { authenticate } from '../store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MuiModal from './UI/MuiModal';
import Button from '@mui/material/Button';

const AuthForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const { name, displayName, handleSubmit, error } = props;
  const auth = useSelector((state) => state.auth);

  console.log(!!auth.id);
  useEffect(() => {
    !!auth.id && navigate('/home');
    !!auth.id && console.log('login happened');
  }, [auth]);

  return (
    <div
      style={{
        marginTop: '65px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
        backgroundColor: '#0a98f7',
      }}
    >
      <MuiModal open={open} handleClose={handleClose} />
      <form
        style={{
          border: '4px groove grey',
          borderRadius: '5px',
          backgroundColor: 'white',
          padding: '20px',
          textAlign: 'left',
        }}
        onSubmit={handleSubmit}
        name={name}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div style={{ backgroundColor: 'white', margin: '5px' }}>
        <Button onClick={handleOpen}>Forgot Password?</Button>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate({ email, password, formName }));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
