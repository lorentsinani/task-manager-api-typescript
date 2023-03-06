import mongoose, { Document } from "mongoose";

import { ITask } from "./Task";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  tokens: { token: String }[];
  avatar: Buffer;
  tasks: ITask[];
  generateAuthToken(): Promise<string>;
}
