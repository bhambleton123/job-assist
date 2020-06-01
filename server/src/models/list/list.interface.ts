import { Document } from "mongoose";
import { IJob } from "../job/job.interface";

export interface IList extends Document {
  title: string;
  jobs: IJob[];
  userId: string;
}
