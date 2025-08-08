import { log } from "console";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      log("MongoDB Connected Successfully");
    });

    connection.on("error", (err) => {
      log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    log("Something went wrong");
    log(error);
  }
}
