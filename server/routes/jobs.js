const router = require("express").Router();
const jobsController = require("../controllers/jobs");

router.post("/", jobsController.createJob);
router.put("/:id", jobsController.updateJobById);
router.delete(
  "/:jobArrangement/list/:listId",
  jobsController.deleteJobByListId
);

module.exports = router;
