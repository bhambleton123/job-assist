const router = require("express").Router();
const jobsController = require("../controllers/jobs");

router.get("/", jobsController.getBoard);
router.post("/job", jobsController.createJob);

module.exports = router;
