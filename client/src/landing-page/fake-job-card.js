import React from "react";
import { Box, makeStyles } from "@material-ui/core";

export default function FakeJobCard() {
  const useStyles = makeStyles({
    card: {
      backgroundColor: "#C4C4C4",
      borderRadius: "20px 20px",
    },
  });
  const classes = useStyles();
  return (
    <Box className={classes.card} width="58vw" height="120px" mb="20px"></Box>
  );
}
