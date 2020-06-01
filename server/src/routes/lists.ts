import express from "express";
const router = express.Router();
import { createList, updateList, deleteList } from "../controllers/lists";

router.post("/", createList as any);
router.put("/:id", updateList as any);
router.delete("/:id", deleteList as any);

export default router;
