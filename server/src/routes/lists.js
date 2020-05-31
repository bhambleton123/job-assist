const router = require("express").Router();
const listsController = require("../controllers/lists");

router.post("/", listsController.createList);
router.put("/:id", listsController.updateList);
router.delete("/:id", listsController.deleteList);

module.exports = router;
