const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

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
app.use(express.urlencoded({ extended: true }));

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