import React, { useState } from "react";
import { PShadow, CenteredDiv } from "./styledDivs";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import NewSongModal from "./UI/NewSongModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectSong } from "../store/songSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const { allSongs } = useSelector((state) => state.songs);
  const auth = useSelector((state) => state.auth);

  return (
    <CenteredDiv style={styles.container}>
      {openModal && <NewSongModal setOpenModal={setOpenModal} />}
      <CenteredDiv
        style={{
          flexDirection: "column",
          border: "2px groove grey",
          width: "80%",
          borderRadius: "10px",
          boxShadow: "5px 5px 5px black",
          backgroundColor: "white",
        }}
      >
        <PShadow>{auth.email} Songs</PShadow>
        {allSongs.map((s) => (
          <Link key={s.id} to={`/song/${s.id}`}>
            <PShadow>{s.title}</PShadow>
          </Link>
        ))}
        <Button variant="outlined" onClick={() => setOpenModal(true)}>
          New Song
        </Button>
      </CenteredDiv>
    </CenteredDiv>
  );
};

export default Home;

const styles = {
  container: {
    border: "4px groove grey",
    height: "calc(100vh - 65px)",
    marginTop: "65px",
    background: "rgb(241, 237, 70)",
    background:
      "radial-gradient(circle, rgba(241,237,70,1) 0%, rgba(253,29,106,1) 43%, rgba(69,246,252,1) 77%)",
  },
};
