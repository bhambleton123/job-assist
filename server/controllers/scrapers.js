const scrapeIndeed = require("../util/scrapers").scrapeIndeed;

const getJobsFromIndeed = async (req, res) => {
  try {
    const jobs = await scrapeIndeed(
      `https://www.indeed.com/jobs?q=${req.params.title}&fromage=${
        req.query.posted ? req.query.posted : 3
      }&explvl=${
        req.query.exprience ? req.query.experience : "entry_level"
      }&limit=50`,
      req.query.pages ? req.query.pages : 1
    );
    res.send(jobs);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { getJobsFromIndeed };
