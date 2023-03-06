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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.userService.getUser(req));
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            res.json(yield this.userService.createUser(name, email, password));
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.userService.loginUser(req.body.email, req.body.password));
        });
        this.logoutUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.user._id.toString();
            const tokens = req.user.tokens;
            res.json(yield this.userService.logoutUser(id));
        });
        this.logoutAllUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.user._id.toString();
            res.json(yield this.userService.logoutAllUser(id));
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, name, email, password } = req.body;
            res.json(yield this.userService.updateUser(id, name, email, password));
        });
        this.deleteLoggedUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            res.json(yield this.userService.deleteLoggedUser(id));
        });
        // uploadProfilePic = (req: Request, res: Response): void => {
        //   res.json(this.userService.uploadProfilePic(req, res));
        // };
        this.deleteProfilePic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.userService.deleteProfilePic(req, res));
        });
        this.getProfilePicById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.userService.getProfilePicById(req, res));
        });
    }
}
exports.UserController = UserController;
