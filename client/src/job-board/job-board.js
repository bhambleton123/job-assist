import React, { useEffect, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

  const onDragEnd = (result, board, setBoard) => {
    if (!result.destination) return;
    const { destination, source } = result;
    let updatedBoard = { ...board };

    // Get index of list
    let fromListIndex, toListIndex;
    board.lists.forEach((list, index) => {
      if (list._id === source.droppableId) fromListIndex = index;
      if (list._id === destination.droppableId) toListIndex = index;
    });

    const [job] = updatedBoard.lists[fromListIndex].jobs.splice(
      source.index,
      1
    );
    updatedBoard.lists[toListIndex].jobs.splice(destination.index, 0, job);
    setBoard(updatedBoard);

    axios
      .put("/api/jobs/move", {
        from: {
          job: source.index,
          list: fromListIndex,
        },
        to: {
          job: destination.index,
          list: toListIndex,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setBoard(board);
      });
  };

  const useStyles = makeStyles({
    draggableJob: {
      margin: "10px 10px 0 10px",
      height: "100%",
    },
  });
  const classes = useStyles();
  return (
    <Box
      width="80%"
      height="100%"
      display="flex"
      justifyContent="flex-start"
      mt="100px"
      ml="100px"
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, board, setBoard)}
      >
        {board.lists.map((list, index) => {
          return (
            <List title={list.title} key={list._id}>
              <Droppable droppableId={list._id} key={list._id}>
                {(provided, snapshot) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {list.jobs.map((job, index) => {
                        return (
                          <Draggable
                            key={job._id}
                            draggableId={job._id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={classes.draggableJob}
                                  onClick={() => console.log(job.title)}
                                >
                                  <Job title={job.title} key={job._id}></Job>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                  );
                }}
              </Droppable>
            </List>
          );
        })}
      </DragDropContext>
    </Box>
  );
}
