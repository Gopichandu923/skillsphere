import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL_ATLAS;

const connect = async () => {
  if (!url) {
    console.error("❌ MONGO_URL_ATLAS is not defined in the .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Successfully connected to the database");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

export { connect };
