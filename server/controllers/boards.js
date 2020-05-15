const Board = require("../models/board").Board;

const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      userId: req.user.id,
      title: "Default",
    })
      .populate({
        path: "lists",
        populate: {
          path: "jobs",
        },
      })
      .exec();
    res.send(board);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

module.exports = { getBoard };
