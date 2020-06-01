import express from "express";
const router = express.Router();
import {
  createJob,
  addCoverLetterToJob,
  moveJob,
  updateCoverLetterOnJob,
  deleteCoverLetterOnJob,
  updateJobById,
  deleteJobByListId,
} from "../controllers/jobs";

router.post("/", createJob);
router.post("/:jobId/cover-letter", addCoverLetterToJob);
router.put("/move", moveJob);
router.put("/:jobId/cover-letter/:coverLetterId", updateCoverLetterOnJob);
router.delete("/:jobId/cover-letter/:coverLetterId", deleteCoverLetterOnJob);
router.put("/:id", updateJobById);
router.delete("/:jobArrangement/list/:listId", deleteJobByListId);

export default router;
