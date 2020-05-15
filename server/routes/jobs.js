const router = require("express").Router();
const jobsController = require("../controllers/jobs");

router.post("/", jobsController.createJob);
router.put("/:id", jobsController.updateJobById);
router.delete("/:id", jobsController.deleteJobById);

module.exports = router;
