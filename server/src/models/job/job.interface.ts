import { Document } from "mongoose";
import { ICoverLetter } from "../coverLetter/coverLetter.interface";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  link: string;
  posted: string;
  description: string;
  coverLetters: [ICoverLetter];
  userId: string;
  listId: string;
}
