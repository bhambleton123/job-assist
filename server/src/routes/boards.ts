import express from "express";
const router = express.Router();
import { getBoard } from "../controllers/boards";

router.get("/", getBoard);

export default router;
