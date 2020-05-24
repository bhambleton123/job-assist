const router = require("express").Router();
const jobsController = require("../controllers/jobs");

router.post("/", jobsController.createJob);
router.put("/:id", jobsController.updateJobById);
router.delete(
  "/:jobArrangement/list/:listId",
  jobsController.deleteJobByListId
);

router.put(
  "/move/list/:fromList/job/:fromJob/toList/:to",
  jobsController.moveJob
);

module.exports = router;
