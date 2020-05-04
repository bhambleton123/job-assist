const router = require("express").Router();
const passport = require("../auth/passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/error");
  }
});

router.get("/user", (req, res) =>
  res.send(req.user ? req.user : { User: "Not logged in" })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.send("user logged out");
});

module.exports = router;
