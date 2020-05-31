const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coverLetterSchema = new Schema({
  title: String,
  body: String,
  userId: String,
});

const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);

module.exports = { coverLetterSchema, CoverLetter };
