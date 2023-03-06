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
exports.UserService = void 0;
const UserModel_1 = require("../models/UserModel");
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.findByCredentials = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.User.findOne({ email }).exec();
            if (!user) {
                throw new Error("Cant find user");
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Doesnt match");
            }
            return user;
        });
        this.generateAuthToken = function (user) {
            const secretCode = process.env.JWT_SECRET || "";
            const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, secretCode);
            return token;
        };
        this.createUser = (name, email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = new UserModel_1.User({ name, email, password });
            if (user.isModified("password")) {
                user.password = yield bcryptjs_1.default.hash(user.password, 8);
                try {
                    // await user.save();
                    UserModel_1.User.create(user);
                    const token = this.generateAuthToken(user);
                    return { user, token };
                }
                catch (e) {
                    return e;
                }
            }
        });
        this.loginUser = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByCredentials(email, password);
            const token = this.generateAuthToken(user);
            user.tokens.push({ token: token });
            this.updateUser(user.id, user.name, user.email, user.password);
            user.save();
            return { user, token };
        });
        this.logoutUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUser(id);
            user.tokens = user.tokens.filter((token) => {
                return token.token !== user.tokens[0].token;
            });
            user.save();
            return user;
        });
        this.logoutAllUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUser(id);
            try {
                user.tokens = [];
                yield user.save();
                return user;
            }
            catch (e) {
                return e;
            }
        });
        this.getUser = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                return req.user;
            }
            catch (e) {
                return e;
            }
        });
        this.updateUser = (id, name, email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = new UserModel_1.User({ name, email, password });
            return this.userRepository.updateUser(id, user);
        });
        this.deleteLoggedUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                return this.userRepository.deleteUser(id);
            }
            catch (e) {
                return e;
            }
        });
        this.upload = (0, multer_1.default)({
            limits: {
                fileSize: 1000000,
            },
            fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                    cb(new Error("Please upload image file"));
                }
                cb(undefined, true);
            },
        });
        this.uploadProfilePic = (this.upload.single("avatar"),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                const buffer = yield (0, sharp_1.default)(req.file.buffer)
                    .resize({ width: 250, height: 250 })
                    .png()
                    .toBuffer();
                req.user.avatar = buffer;
                yield req.user.save();
                res.send();
            }),
            (error, req, res, next) => {
                res.status(400).send({ error: error.message });
            });
        this.deleteProfilePic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.user.avatar = undefined;
                yield req.user.save();
                res.send();
            }
            catch (error) {
                res.status(400).send({ error: error });
            }
        });
        this.getProfilePicById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.User.findById(req.params.id);
                if (!user || !user.avatar) {
                    throw new Error();
                }
                res.set("Content-Type", "image/png");
                res.send(user.avatar);
            }
            catch (e) {
                res.status(404).send();
            }
        });
    }
}
exports.UserService = UserService;
