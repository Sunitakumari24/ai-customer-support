

const { getAIResponse } = require("../services/aiService");

exports.chatWithAI = async (req, res) => {
  const { message, image } = req.body;

  try {
    const reply = await getAIResponse(message, image);

    res.json({
      reply: reply
    });

  } catch (error) {

    console.error("AI ERROR:", error);   // IMPORTANT

    res.status(500).json({
      error: error.message
    });
  }
};