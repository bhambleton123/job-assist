import mongoose, { Schema } from "mongoose";
import { ICoverLetter } from "./coverLetter.interface";

export const coverLetterSchema: Schema = new Schema({
  title: String,
  body: String,
  userId: String,
});

export const CoverLetter = mongoose.model<ICoverLetter>(
  "CoverLetter",
  coverLetterSchema
);
