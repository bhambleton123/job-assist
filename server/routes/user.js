const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/cover-letter", userController.createCoverLetter);

module.exports = router;
