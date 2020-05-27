const Board = require("../models/board").Board;
const List = require("../models/list").List;
const Job = require("../models/job").Job;

const createList = async (req, res) => {
  try {
    const boardCount = await Board.countDocuments({
      userId: req.user.id,
      title: "Default",
    });
    if (boardCount === 0) {
      const board = new Board({ userId: req.user.id, title: "Default" });
      await board.save();
    }
    const board = await Board.findOne({
      userId: req.user.id,
      title: "Default",
    }).exec();
    const list = new List({
      title: req.body.title,
      userId: req.user.id,
    });
    await list.save();
    board.lists.push(list);
    await board.save();
    const updatedBoard = await Board.findOne({
      userId: req.user.id,
      title: "Default",
    }).populate({
      path: "lists",
      populate: {
        path: "jobs",
      },
    });
    res.send(updatedBoard);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const updateList = async (req, res) => {
  try {
    const updatedList = await List.updateOne(
      { userId: req.user.id, _id: req.params.id },
      { title: req.body.title },
      { omitUndefined: true }
    );
    res.send(updatedList);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findOne({ _id: id }).populate("jobs").exec();
    const board = await Board.findOne({
      userId: req.user.id,
      title: "Default",
    })
      .populate("lists")
      .exec();
    let listIndex = null;
    board.lists.forEach((list, index) => {
      if (list._id.toString() === id) listIndex = index;
    });
    if (listIndex === null) {
      res.status(400);
      res.send({ error: "Could not find list by id" });
    } else {
      const jobIds = list.jobs.map((job) => job._id);
      await Job.deleteMany({
        _id: {
          $in: jobIds,
        },
      });
      board.lists.splice(listIndex, 1);
      board.markModified("lists");
      await board.save();
      const updatedBoard = await Board.findOne({
        userId: req.user.id,
        title: "Default",
      })
        .populate({ path: "lists", populate: { path: "jobs" } })
        .exec();
      await List.deleteOne({ _id: list._id }).exec();
      res.send(updatedBoard);
    }
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

module.exports = { createList, updateList, deleteList };
