const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
require("dotenv").config();

const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");

// Connect MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware (for passport)
app.use(
  session({
    secret: process.env.JWT_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get("/", (req, res) => {
  res.send("Backend API running");
});

// Chat Routes
app.use("/api/chat", chatRoutes);

// Auth Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});