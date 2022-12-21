import React, { useState } from 'react';
import styled from 'styled-components';
import { CenteredDiv, PShadow } from '../styledDivs';

const Button = ({ children, onClick }) => {
  const [buttonDown, setButtonDown] = useState(false);

  return (
    <CenteredDiv style={{ height: '100px' }}>
      <Container
        style={{
          padding: buttonDown ? '8px 10px 8px 10px' : '9px 11px 9px 11px',
        }}
        buttonDown={buttonDown}
        onMouseDownCapture={() => {
          // console.log('mousedown');
          setButtonDown(true);
        }}
        onMouseUpCapture={() => {
          console.log('mouseup');
          setButtonDown(false);
        }}
        onClick={() => {
          onClick();
        }}
        onMouseLeave={() => {
          setTimeout(() => setButtonDown(false), 150);
        }}
      >
        <CenteredDiv style={{ border: '0px' }}>
          <PShadow
            style={{
              fontSize: buttonDown ? '20px' : '22px',
            }}
          >
            {children}
          </PShadow>
        </CenteredDiv>
      </Container>
    </CenteredDiv>
  );
};

export default Button;

const Container = styled.div`
  border: 4px groove grey;
  user-select: none;
  border-radius: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 22px black;
`;
