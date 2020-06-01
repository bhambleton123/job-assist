import express from "express";
const router = express.Router();
import {
  getJobsFromIndeed,
  getJobDescriptionFromIndeed,
} from "../controllers/job-search";

router.get("/list", getJobsFromIndeed);
router.get("/description", getJobDescriptionFromIndeed);

export default router;
