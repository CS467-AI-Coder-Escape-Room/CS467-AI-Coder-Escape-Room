const { WriteConcern } = require("mongodb");
const mongoose = require("mongoose");

// Define Schema
const ScoreSchema = new mongoose.Schema({
    initials: {
      type: String,
    },
    time: {
      type: Number,
    },
  });

module.exports = mongoose.model("Score", ScoreSchema);
