"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const password = process.env.password;
mongoose_1.default.connect(`mongodb+srv://tavnik1:${password}@udemynodejs.p5iv3qv.mongodb.net/?retryWrites=true&w=majority`);
