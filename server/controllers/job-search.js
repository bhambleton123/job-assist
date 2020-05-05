const scrapeIndeed = require("../util/scrapers").scrapeIndeed;
const redisClient = require("../util/caching/redis-client");

const getJobsFromIndeed = async (req, res) => {
  redisClient.get(
    `Title=${req.params.title.toLowerCase()}&Posted=${
      req.query.posted
    }&Experience=${
      req.query.experience
    }&Location=${req.query.location.toLowerCase()}&Pages=${req.query.pages}`,
    async (err, data) => {
      if (data) {
        res.send(JSON.parse(data.toString()));
      } else {
        const jobs = await scrapeIndeed(
          `https://www.indeed.com/jobs?q=${req.params.title}&fromage=${
            req.query.posted ? req.query.posted : 3
          }&explvl=${
            req.query.exprience ? req.query.experience : "entry_level"
          }&limit=50&l=${req.query.location ? req.query.location : ""}`,
          req.query.page ? req.query.page : 0
        );
        redisClient.set(
          `Title=${req.params.title.toLowerCase()}&Posted=${
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
            res.send(jobs);
          }
        );
      }
    }
  );
};

module.exports = { getJobsFromIndeed };
