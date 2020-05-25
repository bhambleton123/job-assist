import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./list";
import Job from "./job";
import axios from "axios";

export default function JobBoard() {
  const [board, setBoard] = useState({ lists: [] });
  useEffect(() => {
    axios
      .get("/api/boards")
      .then((res) => {
        setBoard(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Box
      width="80%"
      height="100%"
      display="flex"
      justifyContent="flex-start"
      mt="100px"
      ml="100px"
    >
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        {board.lists.map((list, index) => {
          return (
            <List title={list.title}>
              {list.jobs.map((job, index) => {
                return <Job title={job.title}></Job>;
              })}
            </List>
          );
        })}
      </DragDropContext>
    </Box>
  );
}
