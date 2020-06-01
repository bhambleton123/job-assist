import { IUser } from "../models/user/user.interface";
import { Request } from "express";

export interface IAuthRequest extends Request {
  user: IUser;
}
