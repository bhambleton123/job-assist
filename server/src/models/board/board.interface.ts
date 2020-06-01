import { Document } from "mongoose";

export interface IBoard extends Document {
  title: string;
  lists: any[];
  userId: string;
}
