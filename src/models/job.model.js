const { string } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Job", JobSchema);
