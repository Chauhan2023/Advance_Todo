const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  list: {
    type: [],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Upload", Schema);
