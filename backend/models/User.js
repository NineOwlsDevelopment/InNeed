const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const options = { timestamps: true };

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];

// User skills
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

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      validate: nameValidator,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      validate: nameValidator,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    skills: [skillSchema],

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

const User = mongoose.model("user", userSchema);

module.exports = User;
