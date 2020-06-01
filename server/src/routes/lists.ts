import express from "express";
const router = express.Router();
import { createList, updateList, deleteList } from "../controllers/lists";

router.post("/", createList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

export default router;
