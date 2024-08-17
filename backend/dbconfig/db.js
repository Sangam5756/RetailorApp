import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbcon = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To DB");
  } catch (error) {
    console.log("error in db" + error);
  }
};

export default dbcon;