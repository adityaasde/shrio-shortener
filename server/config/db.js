import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log("DB is Connected!");
    } else {
      console.log("Failed to connect DB!");
      process.exit(1);
    }
  } catch (error) {
    console.log("DB Error :", error.message);
  }
};
