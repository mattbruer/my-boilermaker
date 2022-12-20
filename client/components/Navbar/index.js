import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PShadow, CenteredDiv } from '../styledDivs';
import history from '../../history';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store';

const Navbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const isLoggedIn = !!auth.id;

  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <NavContainer>
      <CenteredDiv>
        <Link to="/home">
          <PShadow>Home</PShadow>
        </Link>
      </CenteredDiv>

      {isLoggedIn ? (
        <>
          <CenteredDiv>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </CenteredDiv>
        </>
      ) : (
        <>
          <CenteredDiv>
            <Link to="/login">
              <PShadow>Login</PShadow>
            </Link>
          </CenteredDiv>
          <CenteredDiv>
            <Link to="/signup">
              <PShadow>Signup</PShadow>
            </Link>
          </CenteredDiv>
        </>
      )}
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.div`
  display: flex;
  height: 64px;
  justify-content: space-evenly;
  position: fixed;
  top: 0px;
  width: 100%;
  box-shadow: 0px 2px 2px black;
  border-bottom: 1px groove grey;
`;
