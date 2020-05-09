import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import renderHTML from "react-render-html";

export default function JobSearchCard({ title, location, company }) {
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      width: "60%",
      height: "120px",
      margin: "60px 0 0 0",
    },
  });
  const classes = useStyles({});
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography>{renderHTML(title)}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Expand</Button>
      </CardActions>
    </Card>
  );
}
