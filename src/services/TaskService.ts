const express = require("express");
import Task from "../models/TaskModel";
import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  createTask = async (dataObject): Promise<any> => {
    const task = new Task(dataObject);

    try {
      await task.save();
      return task;
    } catch (e) {
      return e;
    }
  };

  getTasks = async (ownerId): Promise<any> => {
    try {
      const tasks = await Task.find({ owner: ownerId });

      return tasks;
    } catch (e) {
      return e;
    }

    // const match: Object = {};
    // const sort: Object = {};

    // if (req.query.completed) {
    //   //   match.completed = req.query.completed === "true";
    // }

    // if (req.query.sortBy) {
    //   const parts = req.query.sortBy.split(":");
    //   sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    // }

    // try {
    //   // const tasks = await Task.find({ owner: req.user._id }); -> works also
    //   await req.user.populate({
    //     path: "tasks",
    //     match,
    //     options: {
    //       limit: parseInt(req.query.limit),
    //       skip: parseInt(req.query.skip),
    //       sort,
    //     },
    //   });
    //   res.send(req.user.tasks);
    // } catch (e) {
    //   res.status(500).send(e);
    // }
  };

  getTaskById = async (taskId, ownerId): Promise<any> => {
    try {
      const task = await this.taskRepository.findTask(taskId, ownerId);

      return task;
    } catch (e) {
      return e;
    }
  };

  updateTask = async (updates, taskId, ownerId, body): Promise<any> => {
    //updates, _id, owner

    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      throw new Error(`Operation is not valid`);
    }

    try {
      const task = await this.taskRepository.findTask(taskId, ownerId);

      updates.forEach((update) => {
        task ? (task[update] = body[update]) : Array;
      });
      await task?.save();
      return task;
    } catch (e) {
      return e;
    }
  };

  deleteTask = async (taskId, ownerId): Promise<any> => {
    try {
      const task = await this.taskRepository.deleteTask(taskId, ownerId);

      return task;
    } catch (e) {
      return e;
    }
  };
}
