const { string } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 120,
    },
    status: {
      type: String,
      enum: ["interview", "delined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
