import React, { useState } from "react";
import { IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core";
import axios from "axios";

export default function ProfileButton({ setUser, profilePic }) {
  const useStyles = makeStyles({
    profilePic: {
      width: "45px",
      height: "45px",
      borderRadius: "30px 30px",
    },
    menu: {
      paddingTop: "100px",
    },
  });
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    axios
      .get("/api/auth/logout")
      .then((res) => {
        setUser(null);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <img className={classes.profilePic} src={profilePic} />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={logOut}>Log out</MenuItem>
      </Menu>
    </>
  );
}
