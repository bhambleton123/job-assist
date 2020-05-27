import React from "react";
import { Box, Typography, makeStyles, useTheme } from "@material-ui/core";
import renderHTML from "react-render-html";

export default function Job({ title, company }) {
  const theme = useTheme();
  const useStyles = makeStyles({
    job: {
      backgroundColor: theme.palette.primaryTwo.main,
      borderRadius: "5px",
    },
    company: {
      fontSize: "13px",
      color: "#9e8686",
      marginLeft: "10px",
    },
  });
  const classes = useStyles();
  return (
    <Box className={classes.job} pl="10px" pr="10px">
      <Typography color="secondary">{renderHTML(title)}</Typography>
      <Typography className={classes.company} color="secondary">
        {company}
      </Typography>
    </Box>
  );
}
