import React from "react";
import { Box, Typography, makeStyles, useTheme } from "@material-ui/core";
import renderHTML from "react-render-html";

export default function Job(props) {
  const theme = useTheme();
  const useStyles = makeStyles({
    job: {
      backgroundColor: theme.palette.primaryTwo.main,
      borderRadius: "5px",
      padding: "0 10px 0 10px",
      margin: "0 10px 10px 10px",
    },
    company: {
      fontSize: "13px",
      color: "#9e8686",
      marginLeft: "10px",
    },
  });

  const handleJobClick = () => {
    console.log(props.title);
  };
  const classes = useStyles();
  return (
    <div
      className={classes.job}
      onClick={handleJobClick}
      {...props}
      ref={props.innerRef}
    >
      <Typography color="secondary">{renderHTML(props.title)}</Typography>
      <Typography className={classes.company} color="secondary">
        {props.company}
      </Typography>
    </div>
  );
}
