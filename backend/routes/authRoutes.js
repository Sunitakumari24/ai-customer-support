const express = require("express");
const router = express.Router();
const { signup, login, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "http://localhost:5173/login",
    session: false 
  }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Redirect to frontend with token and user data
    const userData = encodeURIComponent(JSON.stringify({
      name: req.user.name,
      email: req.user.email,
    }));
    
    res.redirect(`http://localhost:5173/auth/google/success?token=${token}&user=${userData}`);
  }
);

// Protected routes
router.get("/profile", authMiddleware, getProfile);

module.exports = router;