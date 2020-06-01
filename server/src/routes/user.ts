import express from "express";
const router = express.Router();
import {
  getCoverLetters,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
} from "../controllers/user";

router.get("/cover-letter", getCoverLetters);
router.post("/cover-letter", createCoverLetter);
router.put("/cover-letter/:coverLetterId", updateCoverLetter);
router.delete("/cover-letter/:coverLetterId", deleteCoverLetter);

export default router;
