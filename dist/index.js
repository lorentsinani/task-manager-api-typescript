"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const TaskRoute_1 = __importDefault(require("./routes/TaskRoute"));
require("./db/mongoose");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(UserRoute_1.default);
app.use(TaskRoute_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server listening in port " + port);
});
exports.default = app;
