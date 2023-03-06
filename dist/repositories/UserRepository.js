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
exports.UserRepository = void 0;
const UserModel_1 = require("../models/UserModel");
class UserRepository {
    constructor() {
        this.findUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const existUser = yield UserModel_1.User.findById(id);
            if (!existUser) {
                throw new Error("User not found");
            }
            return existUser;
        });
        this.updateUser = (id, user) => __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.findUser(id);
            return UserModel_1.User.findByIdAndUpdate(id, {
                name: user.name,
                email: user.email,
                password: user.password,
            });
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUser(id);
            user.remove();
        });
    }
}
exports.UserRepository = UserRepository;
