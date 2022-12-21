import React from 'react';
import styled from 'styled-components';

const Modal = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Modal;

const Container = styled.div`
  z-index: 1000;
  position: fixed;
  background-color: white;
  border: 4px groove grey;
  border-radius: 50px;
  padding: 30px;
  box-shadow: 5px 5px 5px black;
`;
