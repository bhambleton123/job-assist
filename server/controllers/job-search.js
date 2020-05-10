const scrapeIndeed = require("../util/scrapers").scrapeIndeed;
const scrapeIndeedJobDescription = require("../util/scrapers")
  .scrapeIndeedJobDescription;
const redisClient = require("../util/caching/redis-client");

const getJobsFromIndeed = async (req, res) => {
  if (!req.query.role) {
    res.sendStatus(400);
  } else {
    redisClient.get(
      `Title=${req.query.role.toLowerCase()}&Posted=${
        req.query.posted
      }&Experience=${
        req.query.experience
      }&Location=${req.query.location.toLowerCase()}&Pages=${req.query.pages}`,
      async (err, data) => {
        if (data) {
          res.send(JSON.parse(data.toString()));
        } else {
          const jobs = await scrapeIndeed(
            `https://www.indeed.com/jobs?q=${req.query.role}&fromage=${
              req.query.posted ? req.query.posted : 3
            }&explvl=${
              req.query.exprience ? req.query.experience : ""
            }&limit=50&l=${req.query.location ? req.query.location : ""}`,
            req.query.page ? req.query.page : 0
          );
          redisClient.set(
            `Title=${req.query.role.toLowerCase()}&Posted=${
              req.query.posted
            }&Experience=${
              req.query.experience
            }&Location=${req.query.location.toLowerCase()}&Pages=${
              req.query.pages
            }`,
            JSON.stringify(jobs),
            "EX",
            60,
            (err) => {
              if (err) {
                res.status(500).send(err);
              }
              res.send(jobs);
            }
          );
        }
      }
    );
  }
};

const getJobDescriptionFromIndeed = async (req, res) => {
  try {
    const description = await scrapeIndeedJobDescription(
      req.query.url.toString()
    );
    res.send(description);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { getJobsFromIndeed, getJobDescriptionFromIndeed };
