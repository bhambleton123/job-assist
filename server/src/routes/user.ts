import express from "express";
const router = express.Router();
import {
  getCoverLetters,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
} from "../controllers/user";

router.get("/cover-letter", getCoverLetters as any);
router.post("/cover-letter", createCoverLetter as any);
router.put("/cover-letter/:coverLetterId", updateCoverLetter as any);
router.delete("/cover-letter/:coverLetterId", deleteCoverLetter as any);

export default router;
