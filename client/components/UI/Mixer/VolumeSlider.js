import React from "react";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "../../../store/mixerSlice";
import styled from "styled-components";

const VolumeSlider = ({ instrument }) => {
  const dispatch = useDispatch();
  const { volume } = useSelector((state) => state.mixer);
  return (
    <div style={{ display: "flex", color: "white" }}>
      <p>Volume</p>
      <Slider
        style={{
          width: "100%",
          margin: "5px",
          border: "1px solid grey",
        }}
        defaultValue={0}
        min={0}
        max={100}
        value={volume[instrument] || 0}
        onChange={(e) =>
          dispatch(setVolume({ instrument, volume: e.target.value }))
        }
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default VolumeSlider;
