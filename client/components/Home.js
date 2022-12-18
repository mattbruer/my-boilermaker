import React from 'react';
import { PShadow, CenteredDiv } from './styledDivs';
const Home = () => {
  return (
    <CenteredDiv
      style={{
        border: '1px solid red',
        height: 'calc(100vh - 64px)',
        marginTop: '65px',
      }}
    >
      <PShadow>Home</PShadow>
    </CenteredDiv>
  );
};

export default Home;
