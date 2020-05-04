const router = require("express").Router();
const passport = require("../auth/passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.send(req.user);
});

module.exports = router;
