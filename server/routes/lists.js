const router = require("express").Router();
const listsController = require("../controllers/lists");

router.post("/", listsController.createList);

module.exports = router;
