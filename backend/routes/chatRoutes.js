const express = require("express");
const router = express.Router();
const { chat } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

// Chat endpoint
router.post("/", chat);

module.exports = router;
