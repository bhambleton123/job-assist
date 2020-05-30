import React from "react";
import {
  makeStyles,
  Box,
  Paper,
  Typography,
  Modal,
  useTheme,
} from "@material-ui/core";
import renderHTML from "react-render-html";

export default function JobModal({
  title,
  company,
  description,
  showModal,
  setShowModal,
}) {
  const theme = useTheme();
  const useStyles = makeStyles({
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
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
    <Modal
      className={classes.modal}
      open={showModal}
      onClose={() => setShowModal(false)}
    >
      <Paper className={classes.paper}>
        <Typography>{renderHTML(title)}</Typography>
        <Typography>{company}</Typography>
        <Box>{renderHTML(description)}</Box>
      </Paper>
    </Modal>
  );
}
