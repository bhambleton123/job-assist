import mongoose, { Schema } from "mongoose";
import { IBoard } from "./board.interface";

export const boardSchema: Schema = new Schema({
  title: String,
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
  userId: String,
});

export const Board = mongoose.model<IBoard>("Board", boardSchema);
