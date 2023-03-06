"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const express = require("express");
const TaskModel_1 = __importDefault(require("../models/TaskModel"));
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
        this.createTask = (dataObject) => __awaiter(this, void 0, void 0, function* () {
            const task = new TaskModel_1.default(dataObject);
            try {
                yield task.save();
                return task;
            }
            catch (e) {
                return e;
            }
        });
        this.getTasks = (ownerId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield TaskModel_1.default.find({ owner: ownerId });
                return tasks;
            }
            catch (e) {
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
        });
        this.getTaskById = (taskId, ownerId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskRepository.findTask(taskId, ownerId);
                return task;
            }
            catch (e) {
                return e;
            }
        });
        this.updateTask = (updates, taskId, ownerId, body) => __awaiter(this, void 0, void 0, function* () {
            //updates, _id, owner
            const allowedUpdates = ["description", "completed"];
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
            if (!isValidOperation) {
                throw new Error(`Operation is not valid`);
            }
            try {
                const task = yield this.taskRepository.findTask(taskId, ownerId);
                updates.forEach((update) => {
                    task ? (task[update] = body[update]) : Array;
                });
                yield (task === null || task === void 0 ? void 0 : task.save());
                return task;
            }
            catch (e) {
                return e;
            }
        });
        this.deleteTask = (taskId, ownerId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskRepository.deleteTask(taskId, ownerId);
                return task;
            }
            catch (e) {
                return e;
            }
        });
    }
}
exports.TaskService = TaskService;
