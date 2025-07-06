const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection à la DB");
  } catch (error) {
    console.error("Error: connectdb", error);
    process.exit();
  }
};

module.exports = connectdb;
