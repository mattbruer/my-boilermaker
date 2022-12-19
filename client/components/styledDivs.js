import styled from 'styled-components';

export const PShadow = styled.p`
  text-shadow: 1px 6px 6px black;
  font-size: 44px;
  color: white;
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: 5px;
  width: 100%;
  background: rgb(241, 237, 70);
  background: radial-gradient(
    circle,
    rgba(241, 237, 70, 1) 0%,
    rgba(253, 29, 106, 1) 43%,
    rgba(69, 246, 252, 1) 77%
  );
  box-shadow: 0px 2px 12px black;
`;
