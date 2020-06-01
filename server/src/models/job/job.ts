import mongoose, { Schema } from "mongoose";
import { coverLetterSchema } from "../coverLetter/coverLetter";
import { IJob } from "./job.interface";

export const jobSchema: Schema = new Schema({
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

export const Job = mongoose.model<IJob>("Job", jobSchema);
