import React from "react";
import styled from "styled-components";
import { CenteredDiv, PShadow } from "../styledDivs";
import {
  Edit,
  PlayArrowOutlined,
  Tune,
  Add,
  Remove,
} from "@mui/icons-material";
import TempoSlider from "./TempoSlider";
import { toggleEditMode } from "../../store/songSlice";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

const ControlBar = () => {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.songs.editMode);
  return (
    <Container>
      <CenteredDiv style={{ justifyContent: "space-around" }}>
        {editMode ? (
          <>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleEditMode(!editMode))}
            >
              {editMode ? "save" : <Edit />}
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleEditMode(!editMode))}
            >
              <Add />
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleEditMode(!editMode))}
            >
              <Remove />
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              onClick={() => dispatch(toggleEditMode(!editMode))}
            >
              <Tune />
            </Button>
          </>
        ) : (
          <CenteredDiv style={{ flexDirection: "column" }}>
            <CenteredDiv style={{ margin: "10px" }}>
              <Button
                style={buttonStyle}
                variant="outlined"
                onClick={() => dispatch(toggleEditMode(!editMode))}
              >
                {editMode ? "save" : <Edit />}
              </Button>
              <Button
                style={buttonStyle}
                variant="outlined"
                onClick={() => dispatch(toggleEditMode(!editMode))}
              >
                <Tune />
              </Button>
              <Button style={buttonStyle} variant="outlined">
                <PlayArrowOutlined />
              </Button>
            </CenteredDiv>

            <CenteredDiv
              style={{
                width: "90vw",
                marginBottom: "5px",
              }}
            >
              <p style={{ fontSize: "20px", margin: "15px", color: "white" }}>
                Tempo
              </p>
              <TempoSlider />
            </CenteredDiv>
          </CenteredDiv>
        )}
      </CenteredDiv>
    </Container>
  );
};

export default ControlBar;

const Container = styled.div`
  position: fixed;
  display: flex;
  height: 120px;
  bottom: 0;

  width: 100%;
  background-color: #29c7d8;
  user-select: none;
  box-shadow: 0px -5px 15px black;
`;

const buttonStyle = {
  backgroundColor: "white",
  boxShadow: "5px -2px 10px black",
  height: "40px",
  width: "100%",
  margin: "0 2vw 0 2vw",
};
