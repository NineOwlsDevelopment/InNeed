const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const options = { timestamps: true };

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

const Skill = mongoose.model("skill", skillSchema);

module.exports = Skill;
