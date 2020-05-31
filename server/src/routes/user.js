const router = require("express").Router();
const userController = require("../controllers/user");

router.get("/cover-letter", userController.getCoverLetters);
router.post("/cover-letter", userController.createCoverLetter);
router.put("/cover-letter/:coverLetterId", userController.updateCoverLetter);
router.delete("/cover-letter/:coverLetterId", userController.deleteCoverLetter);

module.exports = router;
