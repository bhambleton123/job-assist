const router = require("express").Router();
const scrapers = require("../controllers/job-search");

router.get("/:title", scrapers.getJobsFromIndeed);

module.exports = router;
