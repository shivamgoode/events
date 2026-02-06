import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL || "/",
    failureRedirect: process.env.CLIENT_URL || "/",
  }),
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL || "/");
  });
});

router.get("/me", (req, res) => {
  res.json(req.user || null);
});

export default router;
