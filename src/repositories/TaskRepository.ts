import Task from "../models/TaskModel";

export class TaskRepository {
  updateTask = async (taskId, updates) => {
    // const task = await Task.findByIdAndUpdate(taskId)
  };

  findTask = async (taskId, ownerId) => {
    const task = Task.findOne({ _id: taskId, owner: ownerId });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  };

  deleteTask = async (taskId, ownerId) => {
    const task = Task.findOneAndDelete({ _id: taskId, owner: ownerId });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  };
}
