const mongoose = require("mongoose");
// require('dotenv').config()

const mongo_uri = process.env.MONGO_URI
exports.connect = () => {

  mongoose
    .connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.error("database connection failed");
    });
};

