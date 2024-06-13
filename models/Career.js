const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    terms: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", CareerSchema);
