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

router.post("/", createJob as any);
router.post("/:jobId/cover-letter", addCoverLetterToJob as any);
router.put("/move", moveJob as any);
router.put(
  "/:jobId/cover-letter/:coverLetterId",
  updateCoverLetterOnJob as any
);
router.delete(
  "/:jobId/cover-letter/:coverLetterId",
  deleteCoverLetterOnJob as any
);
router.put("/:id", updateJobById as any);
router.delete("/:jobArrangement/list/:listId", deleteJobByListId as any);

export default router;
