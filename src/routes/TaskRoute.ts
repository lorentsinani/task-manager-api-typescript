import { TaskRepository } from "./../repositories/TaskRepository";
import Router from "express";
import auth from "../middleware/auth";
import { TaskController } from "../controllers/TaskController";
import { TaskService } from "../services/TaskService";

const taskRepository = new TaskRepository();
const taskRouter = Router();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

taskRouter.post("/tasks", auth, taskController.createTask);

taskRouter.get("/tasks", auth, taskController.getTasks);

taskRouter.get("/tasks/:id", auth, taskController.getTaskById);

taskRouter.patch("/tasks/:id", auth, taskController.updateTask);

taskRouter.delete("/tasks/:id", auth, taskController.deleteTask);

export default taskRouter;
