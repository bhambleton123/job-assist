const Job = require("../db/models").Job;
const List = require("../db/models").List;
const scrapeIndeedJobDescription = require("../util/scrapers")
  .scrapeIndeedJobDescription;

const createJob = async (req, res) => {
  const description = await scrapeIndeedJobDescription(req.body.link);

  try {
    const list = await List.findOne({
      where: {
        userId: req.user.id,
        arrangement: 1,
      },
    });
    const job = await Job.create({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      link: req.body.link,
      description: description.toString(),
      posted: req.body.posted,
      userId: req.user.id,
      listId: list.id,
    });
    res.send(job);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = { createJob };
