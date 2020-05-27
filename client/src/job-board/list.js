import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";

export default function List(
  { listId, title, setBoard, innerRef, children },
  props
) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
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

  const handleMenuClick = (index) => {
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
          <Typography color="primary">{title}</Typography>
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
