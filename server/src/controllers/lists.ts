import { Board } from "../models/board/board";
import { List } from "../models/list/list";
import { Job } from "../models/job/job";
import { IAuthRequest } from "../auth/auth-request.interface";
import { Response } from "express";

export const createList = async (req: IAuthRequest, res: Response) => {
  try {
    const boardCount = await Board.countDocuments({
      userId: req.user.id,
      title: "Default",
    });
    if (boardCount === 0) {
      const board = new Board({ userId: req.user.id, title: "Default" });
      await board.save();
    }
    const board: any = await Board.findOne({
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

export const updateList = async (req: IAuthRequest, res: Response) => {
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

export const deleteList = async (req: IAuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const list: any = await List.findOne({ _id: id }).populate("jobs").exec();
    const board: any = await Board.findOne({
      userId: req.user.id,
      title: "Default",
    })
      .populate("lists")
      .exec();
    let listIndex = null;
    board.lists.forEach((list: any, index: any) => {
      if (list._id.toString() === id) listIndex = index;
    });
    if (listIndex === null) {
      res.status(400);
      res.send({ error: "Could not find list by id" });
    } else {
      const jobIds = list.jobs.map((job: any) => job._id);
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
