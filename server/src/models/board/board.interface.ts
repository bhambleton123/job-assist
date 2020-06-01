import { Document } from "mongoose";
import { IList } from "../list/list.interface";

export interface IBoard extends Document {
  title: string;
  lists: IList[];
  userId: string;
}
