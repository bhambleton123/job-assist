const router = require("express").Router();
const scrapers = require("../controllers/job-search");

router.get("/list", scrapers.getJobsFromIndeed);
router.get("/description", scrapers.getJobDescriptionFromIndeed);

module.exports = router;
