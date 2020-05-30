import React from "react";
import {
  Paper,
  Typography,
  Box,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import renderHTML from "react-render-html";

export default function JobDetails({
  title,
  company,
  description,
  link,
  location,
}) {
  const theme = useTheme();
  const useStyles = makeStyles({
    paper: {
      position: "absolute",
      width: "50vw",
      height: "100%",
      overflow: "scroll",
      padding: "50px",
      color: theme.palette.secondary.main,
    },
  });
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography>{renderHTML(title)}</Typography>
      <Typography>{company}</Typography>
      <Typography>{"Location: " + location}</Typography>
      <Box>{renderHTML(description)}</Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        fontWeight="bolder"
        width="100%"
      >
        <Typography>Apply &nbsp;</Typography>
        <a href={link} target="_blank">
          here
        </a>
      </Box>
    </Paper>
  );
}
