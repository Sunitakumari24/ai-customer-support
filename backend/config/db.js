const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    console.error("\n⚠️  Please whitelist your IP address in MongoDB Atlas:");
    console.error("   1. Go to https://cloud.mongodb.com");
    console.error("   2. Navigate to: Security > Network Access");
    console.error("   3. Click 'Add IP Address'");
    console.error("   4. Add your current IP or use 0.0.0.0/0 for development\n");
    // Don't exit process, let server run without DB
    // process.exit(1);
  }
};

module.exports = connectDB;
