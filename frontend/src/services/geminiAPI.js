import axios from "axios";

export async function getAIResponse(message, language = 'English') {
  try {
    console.log('Calling Backend API with message:', message);
    
    const response = await axios.post(
      "http://localhost:5000/api/chat",
      { message: message }
    );

    console.log(' Got response from Backend:', response.data.reply?.substring(0, 50) + '...');
    
    return response.data.reply;
  } catch (error) {
    console.error(" Backend API Error:", error);
    console.error(" Error message:", error.message);
    
    if (error.code === 'ERR_NETWORK') {
      return "Error: Cannot connect to backend server. Please make sure the backend is running on http://localhost:5000";
    } else if (error.response?.status === 500) {
      return "Error: Server error. Please check backend logs.";
    } else {
      return `Sorry, I'm having trouble connecting. Please check your internet connection and try again.`;
    }
  }
}

