import { Board } from "../models/board/board";

export const getBoard = async (req: any, res: any) => {
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
