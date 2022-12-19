import React from 'react';
import { PShadow, CenteredDiv } from './styledDivs';
const Home = () => {
  return (
    <CenteredDiv
      style={{
        border: '1px solid red',
        height: 'calc(100vh - 64px)',
        marginTop: '65px',
        background: 'rgb(241, 237, 70)',
        background:
          'radial-gradient(circle, rgba(241,237,70,1) 0%, rgba(253,29,106,1) 43%, rgba(69,246,252,1) 77%)',
        backgroundColor: 'red',
      }}
    >
      <PShadow>Home</PShadow>
    </CenteredDiv>
  );
};

export default Home;