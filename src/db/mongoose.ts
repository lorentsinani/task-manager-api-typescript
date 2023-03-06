import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.password;
mongoose.connect(
  `mongodb+srv://tavnik1:${password}@udemynodejs.p5iv3qv.mongodb.net/?retryWrites=true&w=majority`
);
