import { Job } from "../models/job/job";
import { List } from "../models/list/list";
import { Board } from "../models/board/board";
import { CoverLetter } from "../models/coverLetter/coverLetter";
import { scrapeIndeedJobDescription } from "../util/scrapers";
import { Response } from "express";
import { IAuthRequest } from "../auth/auth-request.interface";

export const createJob = async (req: IAuthRequest, res: Response) => {
  try {
    const count = await Board.countDocuments({ userId: req.user.id });
    const description = await scrapeIndeedJobDescription(req.body.link);
    const newJob = new Job({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      link: req.body.link,
      posted: req.body.posted,
      description,
      userId: req.user.id,
    });
    let newList = new List({ title: "to-do", userId: req.user.id });
    if (count === 0) {
      const newBoard = new Board({ title: "Default", userId: req.user.id });
      newList.jobs.push(newJob);
      newBoard.lists.push(newList);
      await newList.save();
      await newBoard.save();
      await newJob.save();
      res.send(newBoard);
    } else {
      const listCount = await List.countDocuments({ userId: req.user.id });
      const lists = await List.find({ userId: req.user.id })
        .populate("jobs")
        .exec();
      let boards = await Board.find({ userId: req.user.id })
        .populate({
          path: "lists",
          populate: { path: "jobs" },
        })
        .exec();
      if (!listCount) {
        newList.jobs.push(newJob);
        newList.markModified("jobs");
        await newJob.save();
        await newList.save();
        boards[0].lists.push(newList);
        await boards[0].save();
      } else {
        lists[0].jobs.push(newJob);
        await newJob.save();
        await lists[0].save();
      }
      boards = await Board.find({ userId: req.user.id })
        .populate({
          path: "lists",
          populate: { path: "jobs" },
        })
        .exec();
      res.send(boards);
    }
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

export const addCoverLetterToJob = async (req: IAuthRequest, res: Response) => {
  const { jobId } = req.params;
  const { title, body } = req.body;
  try {
    const coverLetter = new CoverLetter({ title, body, userId: req.user.id });
    const job = await Job.findById(jobId).exec();
    job.coverLetters.push(coverLetter);
    await job.save();
    res.send(job);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

export const updateCoverLetterOnJob = async (
  req: IAuthRequest,
  res: Response
) => {
  const { title, body } = req.body;
  const { jobId, coverLetterId } = req.params;

  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: jobId,
        "coverLetters._id": coverLetterId,
      },
      {
        $set: {
          "coverLetters.$.title": title,
          "coverLetters.$.body": body,
        },
      },
      {
        omitUndefined: true,
        useFindAndModify: false,
      } as any
    );
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

export const deleteCoverLetterOnJob = async (
  req: IAuthRequest,
  res: Response
) => {
  const { jobId, coverLetterId } = req.params;

  try {
    const job = await Job.findById(jobId).exec();
    job.coverLetters.id(coverLetterId).remove();
    await job.save();
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

export const updateJobById = async (req: IAuthRequest, res: Response) => {
  const { title, company, location, link, posted, description } = req.body;
  try {
    const updated = await Job.updateOne(
      { _id: req.params.id, userId: req.user.id },
      {
        title: title,
        company: company,
        location: location,
        link: link,
        posted: posted,
        description: description,
      },
      { omitUndefined: true }
    );
    res.send(updated);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

export const deleteJobByListId = async (req: IAuthRequest, res: Response) => {
  try {
    const list = await List.findOne({ _id: req.params.listId }).exec();
    const job = list.jobs[req.params.jobArrangement];
    await Job.deleteOne({ _id: job._id });
    list.jobs.splice(req.params.jobArrangement, 1);
    await list.save();
    res.send({ deleted: job });
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

export const moveJob = async (req: IAuthRequest, res: Response) => {
  try {
    const { from, to } = req.body;
    const board = await Board.findOne({ userId: req.user.id, title: "Default" })
      .populate({
        path: "lists",
        populate: { path: "jobs" },
      })
      .exec();
    const [job] = board.lists[from.list].jobs.splice(from.job, 1);
    await board.lists[from.list].markModified("jobs");
    await board.lists[from.list].save();
    board.lists[to.list].jobs.splice(to.job, 0, job);
    await board.lists[to.list].markModified("jobs");
    await board.lists[to.list].save();
    const saved = await board.save();
    res.send(saved);
  } catch (err) {
    res.status(500);
    res.send({ Error: err });
  }
};
