import { TaskService } from "./../services/TaskService";
import { Request, Response } from "express";
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  createTask = async (req: any, res: Response) => {
    const dataObject = { ...req.body, owner: req.user._id };

    res.json(await this.taskService.createTask(dataObject));
  };

  getTasks = async (req: any, res: Response) => {
    const ownerId = req.user._id;
    res.json(await this.taskService.getTasks(ownerId));
  };

  getTaskById = async (req: any, res: Response) => {
    const taskId = req.params.id;
    const ownerId = req.user._id;
    res.json(await this.taskService.getTaskById(taskId, ownerId));
  };

  updateTask = async (req: any, res: Response) => {
    const body = req.body;
    const updates = Object.keys(req.body);
    const taskId = req.params.id;
    const ownerId = req.user._id.toString();
    res.json(await this.taskService.updateTask(updates, taskId, ownerId, body));
  };

  deleteTask = async (req: any, res: Response) => {
    const taskId = req.params.id;
    const ownerId = req.user._id;
    res.json(await this.taskService.deleteTask(taskId, ownerId));
  };
}
