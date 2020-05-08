import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";

export default function ProfileButton({ profilePic }) {
  const useStyles = makeStyles({
    profilePic: {
      width: "45px",
      height: "45px",
      borderRadius: "30px 30px",
    },
  });
  const classes = useStyles();
  return (
    <IconButton>
      <img className={classes.profilePic} src={profilePic} />
    </IconButton>
  );
}
