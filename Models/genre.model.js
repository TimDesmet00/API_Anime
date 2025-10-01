const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Un nom de genre est requis"],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Genre", GenreSchema);
