import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL_ATLAS;

const connect = () => {
  mongoose.connect(url).then(() => {
    console.log("succesfully connected to database");
  });
};
export { connect };
