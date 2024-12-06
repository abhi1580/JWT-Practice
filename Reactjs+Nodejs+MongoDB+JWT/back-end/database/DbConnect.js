const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const ConnectDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDB;
