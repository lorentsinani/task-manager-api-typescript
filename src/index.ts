import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/UserRoute";
import taskRouter from "./routes/TaskRoute";
import "./db/mongoose";

dotenv.config();
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server listening in port " + port);
});

export default app;
