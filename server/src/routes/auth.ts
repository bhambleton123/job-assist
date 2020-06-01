import express from "express";
const router = express.Router();
import passport from "../auth/passport";
import { IAuthRequest } from "../auth/auth-request.interface";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  (req: IAuthRequest, res: any) => {
    if (req.user) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/error");
    }
  }
);

router.get("/user", (req, res) => res.send(req.user ? req.user : null));

router.get("/logout", (req, res) => {
  req.logout();
  res.send("user logged out");
});

export default router;
