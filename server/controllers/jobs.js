const Job = require("../models/job").Job;
const List = require("../models/list").List;
const Board = require("../models/board").Board;
const CoverLetter = require("../models/coverLetter").CoverLetter;
const scrapeIndeedJobDescription = require("../util/scrapers")
  .scrapeIndeedJobDescription;

const createJob = async (req, res) => {
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

const addCoverLetterToJob = async (req, res) => {
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

const updateJobById = async (req, res) => {
  try {
    const updated = await Job.updateOne(
      { _id: req.params.id, userId: req.user.id },
      {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        link: req.body.link,
        posted: req.body.posted,
        description: req.body.description,
      },
      { omitUndefined: true }
    );
    res.send(updated);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const deleteJobByListId = async (req, res) => {
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

const moveJob = async (req, res) => {
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

module.exports = {
  createJob,
  updateJobById,
  addCoverLetterToJob,
  deleteJobByListId,
  moveJob,
};
