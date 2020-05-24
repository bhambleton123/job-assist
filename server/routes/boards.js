const router = require("express").Router();
const boardsController = require("../controllers/boards");

router.get("/", boardsController.getBoard);

module.exports = router;
