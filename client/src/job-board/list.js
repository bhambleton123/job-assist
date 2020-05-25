import React from "react";
import { Box, Typography, makeStyles, useTheme } from "@material-ui/core";

export default function List({ title, children }) {
  const theme = useTheme();
  const useStyles = makeStyles({
    list: {
      backgroundColor: theme.palette.secondary.main,
      marginRight: "30px",
      minHeight: "300px",
      borderRadius: "5px",
    },
  });
  const classes = useStyles();
  return (
    <Box className={classes.list} width="200px">
      <Box mt="10px" mb="10px" textAlign="center">
        <Typography color="primary">{title}</Typography>
      </Box>
      {children}
    </Box>
  );
}
