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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.createTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dataObject = Object.assign(Object.assign({}, req.body), { owner: req.user._id });
            res.json(yield this.taskService.createTask(dataObject));
        });
        this.getTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ownerId = req.user._id;
            res.json(yield this.taskService.getTasks(ownerId));
        });
        this.getTaskById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskId = req.params.id;
            const ownerId = req.user._id;
            res.json(yield this.taskService.getTaskById(taskId, ownerId));
        });
        this.updateTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const updates = Object.keys(req.body);
            const taskId = req.params.id;
            const ownerId = req.user._id.toString();
            res.json(yield this.taskService.updateTask(updates, taskId, ownerId, body));
        });
        this.deleteTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskId = req.params.id;
            const ownerId = req.user._id;
            res.json(yield this.taskService.deleteTask(taskId, ownerId));
        });
    }
}
exports.TaskController = TaskController;
