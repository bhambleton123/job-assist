import React from "react";
import { Box, Typography, makeStyles, useTheme } from "@material-ui/core";

export default function List({ title, innerRef, children }, props) {
  const theme = useTheme();
  const useStyles = makeStyles({
    list: {
      backgroundColor: theme.palette.secondary.main,
      marginRight: "30px",
      minHeight: "70vh",
      borderRadius: "5px",
    },
    jobs: {
      height: "100%",
    },
  });
  const classes = useStyles();
  return (
    <Box className={classes.list} width="225px">
      <Box pt="10px" pb="10px" textAlign="center">
        <Typography color="primary">{title}</Typography>
      </Box>
      <div className={classes.jobs} {...props} ref={innerRef}>
        {children}
      </div>
    </Box>
  );
}
