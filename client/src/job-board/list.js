import React, { useState } from "react";
import {
  Box,
  Typography,
  makeStyles,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Input,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";

export default function List(props) {
  const { listId, title, setBoard, innerRef, isDragging, children } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [changedTitle, setChangedTitle] = useState(title);
  const [showEditInput, setShowEditInput] = useState(false);
  const theme = useTheme();
  const useStyles = makeStyles({
    list: {
      backgroundColor: !isDragging ? theme.palette.secondary.main : "#9e8686",
      marginRight: "30px",
      minHeight: "70vh",
      borderRadius: "5px",
    },
    jobs: {
      height: "100%",
    },
    changeTitle: {
      color: theme.palette.primary.main,
    },
  });
  const classes = useStyles();

  const handleMenuClick = (index) => {
    if (index === 0) setShowEditInput(true);
    if (index === 1) {
      axios
        .delete(`/api/lists/${listId}`)
        .then((res) => {
          setBoard(res.data);
        })
        .catch((err) => console.error(err));
    }
    setAnchorEl(null);
  };

  const updateTitle = (e) => {
    if (e.key === "Enter") {
      setShowEditInput(false);
      axios
        .put(`/api/lists/${listId}`, {
          title: changedTitle,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <Box className={classes.list} width="225px">
      <Box
        pt="10px"
        pb="10px"
        width="100%"
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
      >
        <Box textAlign="center" width="100%">
          {!showEditInput ? (
            <Typography onClick={() => setShowEditInput(true)} color="primary">{changedTitle}</Typography>
          ) : (
            <Input
              className={classes.changeTitle}
              value={changedTitle}
              onChange={(e) => setChangedTitle(e.target.value)}
              onKeyDown={updateTitle}
              variant="filled"
            />
          )}
        </Box>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="primary"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="list-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {["edit", "delete"].map((option, index) => (
            <MenuItem key={option} onClick={() => handleMenuClick(index)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <div className={classes.jobs} {...props} ref={innerRef}>
        {children}
      </div>
    </Box>
  );
}
