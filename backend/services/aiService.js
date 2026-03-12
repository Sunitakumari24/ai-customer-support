


const axios = require("axios");

async function getAIResponse(message, imageBase64 = null) {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const parts = [];
    
    // Add text if present
    if (message && message.trim()) {
      parts.push({ text: message });
    }
    
    // Add image if present
    if (imageBase64) {
      parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: imageBase64
        }
      });
    }

    const response = await axios.post(url, {
      contents: [
        {
          parts: parts
        }
      ]
    });

    const text = response.data.candidates[0].content.parts[0].text;
    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

module.exports = { getAIResponse };