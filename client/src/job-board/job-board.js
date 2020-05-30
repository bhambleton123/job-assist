import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./list";
import Job from "./job/job";
import AddListForm from "./add-list-form";
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

  return (
    <Box
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
            <Droppable droppableId={list._id} key={list._id}>
              {(provided, snapshot) => {
                return (
                  <>
                    <List
                      listId={list._id}
                      setBoard={setBoard}
                      isDragging={snapshot.isDraggingOver}
                      {...provided.droppableProps}
                      innerRef={provided.innerRef}
                      title={list.title}
                      key={list._id}
                    >
                      {list.jobs.map((job, index) => {
                        return (
                          <Draggable
                            key={job._id}
                            draggableId={job._id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <Job
                                  title={job.title}
                                  company={job.company}
                                  description={job.description}
                                  link={job.link}
                                  key={job._id}
                                  innerRef={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                ></Job>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </List>
                  </>
                );
              }}
            </Droppable>
          );
        })}
        {!board.lists.length ? (
          <Box width="100%" textAlign="center">
            <Typography>Add a job to get started!</Typography>
          </Box>
        ) : (
          <Box mr="50px" width="200px">
            <AddListForm board={board} setBoard={setBoard} />
          </Box>
        )}
      </DragDropContext>
    </Box>
  );
}
