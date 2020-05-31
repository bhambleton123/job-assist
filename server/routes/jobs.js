const router = require("express").Router();
const jobsController = require("../controllers/jobs");

router.post("/", jobsController.createJob);
router.post("/:jobId/cover-letter", jobsController.addCoverLetterToJob);
router.put("/move", jobsController.moveJob);
router.put(
  "/:jobId/cover-letter/:coverLetterId",
  jobsController.updateCoverLetterOnJob
);
router.delete(
  "/:jobId/cover-letter/:coverLetterId",
  jobsController.deleteCoverLetterOnJob
);
router.put("/:id", jobsController.updateJobById);
router.delete(
  "/:jobArrangement/list/:listId",
  jobsController.deleteJobByListId
);

module.exports = router;
