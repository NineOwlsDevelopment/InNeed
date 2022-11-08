const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const options = { timestamps: true };

const titleValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Title must be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];

const descriptionValidator = [
  validate({
    validator: "isLength",
    arguments: [200, 5000],
    message: "Description must be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];

// Required skills for the job
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    uuid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  options
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: titleValidator,
    },

    company: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    salaryLow: {
      type: Number,
      required: true,
    },

    salaryHigh: {
      type: Number,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time"],
      default: "full-time",
    },

    description: {
      type: String,
      required: true,
      validate: descriptionValidator,
    },

    skills: [skillSchema],

    education: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      enum: ["0-3 years", "3-5 years", "10+ years"],
      default: "0-3 years",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    uuid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  options
);

const Job = mongoose.model("job", jobSchema);

module.exports = Job;
