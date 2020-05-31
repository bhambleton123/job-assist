const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const coverLetterSchema = require("./coverLetter").coverLetterSchema;

const jobSchema = new Schema({
  title: String,
  company: String,
  location: String,
  link: String,
  posted: String,
  description: String,
  coverLetters: [coverLetterSchema],
  userId: String,
  listId: String,
});

const Job = mongoose.model("Job", jobSchema);

module.exports = { jobSchema, Job };
