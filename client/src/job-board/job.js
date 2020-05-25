import React from "react";
import { Box, Typography, makeStyles, useTheme } from "@material-ui/core";
import renderHTML from "react-render-html";

export default function Job({ title }) {
  const theme = useTheme();
  const useStyles = makeStyles({
    job: {
      backgroundColor: theme.palette.primaryTwo.main,
      borderRadius: "5px",
    },
  });
  const classes = useStyles();
  return (
    <Box className={classes.job} pl="10px" pr="10px">
      <Typography color="secondary">{renderHTML(title)}</Typography>
    </Box>
  );
}
