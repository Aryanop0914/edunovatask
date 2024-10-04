const mongoose = require("mongoose");
const dbconnect = async (MONGO_URI) => {
  try {
    const response = await mongoose.connect(MONGO_URI, {
      dbName: "edunovaTask",
    });
    if (response) {
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    console.log("Database Connection Error", err);
  }
};

module.exports = dbconnect;
