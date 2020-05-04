const router = require("express").Router();
const scrapers = require("../controllers/scrapers");

router.get("/:title", scrapers.getJobsFromIndeed);

module.exports = router;
