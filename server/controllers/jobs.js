const Job = require("../models/job").Job;
const List = require("../models/list").List;
const Board = require("../models/board").Board;
const scrapeIndeedJobDescription = require("../util/scrapers")
  .scrapeIndeedJobDescription;

const createJob = async (req, res) => {
  Board.countDocuments({ userId: req.user.id }, async (err, count) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
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
    const newList = new List({ title: "to-do", userId: req.user.id });
    if (count === 0) {
      const newBoard = new Board({ title: "Default", userId: req.user.id });
      newList.jobs.push(newJob);
      newBoard.lists.push(newList);
      await newList.save();
      await newBoard.save();
      await newJob.save();
      res.send(newBoard);
    } else {
      const lists = await List.find({ userId: req.user.id })
        .populate("jobs")
        .exec();
      const boards = await Board.find({ userId: req.user.id })
        .populate({
          path: "lists",
          populate: { path: "jobs" },
        })
        .exec();
      if (lists.length === 0) {
        newList.push(newJob);
        boards[0].lists.push(newList);
        await boards[0].save();
        await newList.save();
      } else {
        lists[0].jobs.push(newJob);
        await newJob.save();
        await lists[0].save();
      }
      res.send(boards);
    }
  });
};

module.exports = { createJob };
