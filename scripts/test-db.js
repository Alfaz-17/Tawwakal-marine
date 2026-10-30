const mongoose = require("mongoose");
const DB_URI = "mongodb+srv://coronamarine5050_db_user:3dOLIHk6jDzkrMG4@cluster0.kbc0w4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(DB_URI);
    console.log("Connected successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
