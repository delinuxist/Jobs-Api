const mongoose = require("mongoose");

const connectDb = (URI) => {
  return mongoose.connect(URI);
};

module.exports = connectDb;
