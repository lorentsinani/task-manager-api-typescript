import { UserRepository } from "./../repositories/UserRepository";
import { UserService } from "./../services/UserService";
import { UserController } from "./../controllers/UserController";
import { Router } from "express";
import auth from "../middleware/auth";

const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// userRouter.get("/users/:id", userController.getUser);
userRouter.get("/users/me", auth, userController.getUser);

userRouter.post("/users", userController.createUser);

userRouter.post("/users/login", userController.loginUser);

userRouter.post("/users/logout", auth, userController.logoutUser);

userRouter.post("/users/logoutAll", auth, userController.logoutAllUser);

userRouter.patch("/users/me", auth, userController.updateUser);

userRouter.delete("/users/me", auth, userController.deleteLoggedUser);

// userRouter.post("/users/me/avatar", auth, userController.uploadProfilePic);

userRouter.delete("/users/me/avatar", auth, userController.deleteProfilePic);

userRouter.get("/users/:id/avatar", userController.getProfilePicById);

export default userRouter;
