import React, { useState } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

export default function AddListForm({ board, setBoard }) {
  const [input, setInput] = useState("");
  const useStyles = makeStyles({
    form: {
      display: "flex",
      height: "50px",
      padding: "5px 0 5px 10px",
    },
    icon: {
      width: "40px",
      height: "40px",
      marginLeft: "5px",
      marginRight: "5px",
    },
    input: {
      width: "225px",
    },
  });

  const submit = () => {
    if (!input.length) return;
    axios
      .post("/api/lists", { title: input })
      .then((res) => {
        setInput("");
        setBoard(res.data);
      })
      .catch((err) => console.error(err));
  };

  const classes = useStyles();
  return (
    <Paper className={classes.form} component="form">
      <InputBase
        className={classes.input}
        value={input}
        placeholder="New list"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit();
          }
        }}
      />
      <Divider orientation="vertical" />
      <IconButton onClick={submit} className={classes.icon}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
}
