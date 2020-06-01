import mongoose, { Schema } from "mongoose";
import { IList } from "./list.interface";

export const listSchema: Schema = new Schema({
  title: String,
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  userId: String,
});

export const List = mongoose.model<IList>("List", listSchema);

module.exports = { listSchema, List };
