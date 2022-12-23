import React from "react";
import Slider from "@mui/material/Slider";

const TempoSlider = () => {
  return (
    <Slider
      style={{ width: "100%", margin: "0 3vw 0 3vw" }}
      defaultValue={50}
      aria-label="Default"
      valueLabelDisplay="auto"
    />
  );
};

export default TempoSlider;
