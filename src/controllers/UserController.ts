import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser = async (req: Request, res: Response) => {
    res.send(await this.userService.getUser(req));
  };

  createUser = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body;
    res.json(await this.userService.createUser(name, email, password));
  };

  loginUser = async (req: Request, res: Response): Promise<any> => {
    res.send(
      await this.userService.loginUser(req.body.email, req.body.password)
    );
  };

  logoutUser = async (req: any, res: Response): Promise<any> => {
    const id = req.user._id.toString();
    const tokens = req.user.tokens;
    res.json(await this.userService.logoutUser(id));
  };

  logoutAllUser = async (req: any, res: Response): Promise<any> => {
    const id = req.user._id.toString();
    res.json(await this.userService.logoutAllUser(id));
  };

  updateUser = async (req: Request, res: Response): Promise<any> => {
    const { id, name, email, password } = req.body;
    res.json(await this.userService.updateUser(id, name, email, password));
  };

  deleteLoggedUser = async (req: any, res: Response): Promise<void> => {
    const id = req.body.id;
    res.json(await this.userService.deleteLoggedUser(id));
  };

  // uploadProfilePic = (req: Request, res: Response): void => {
  //   res.json(this.userService.uploadProfilePic(req, res));
  // };

  deleteProfilePic = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.deleteProfilePic(req, res));
  };

  getProfilePicById = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.userService.getProfilePicById(req, res));
  };
}
