import { Document } from "mongoose";

export interface ICoverLetter extends Document {
  title: string;
  body: string;
  userId: string;
}
