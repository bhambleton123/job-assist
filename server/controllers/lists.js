const Board = require("../models/board").Board;
const List = require("../models/list").List;

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

module.exports = { createList };
