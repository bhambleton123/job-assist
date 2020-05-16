const router = require("express").Router();
const listsController = require("../controllers/lists");

router.post("/", listsController.createList);
router.put("/:id", listsController.updateList);

module.exports = router;
