import { UserRepository } from "./../repositories/UserRepository";
import { User } from "../models/UserModel";
import multer from "multer";
import sharp from "sharp";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error("Cant find user");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Doesnt match");
    }

    return user;
  };

  generateAuthToken = function (user): string {
    const secretCode = process.env.JWT_SECRET || "";
    const token = jwt.sign({ _id: user._id.toString() }, secretCode);

    return token;
  };

  createUser = async (name, email, password): Promise<any> => {
    const user = new User({ name, email, password });
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);

      try {
        // await user.save();
        User.create(user);
        const token = this.generateAuthToken(user);
        return { user, token };
      } catch (e) {
        return e;
      }
    }
  };

  loginUser = async (email: string, password: string) => {
    const user = await this.findByCredentials(email, password);
    const token = this.generateAuthToken(user);

    user.tokens.push({ token: token });

    this.updateUser(user.id, user.name, user.email, user.password);
    user.save();
    return { user, token };
  };

  logoutUser = async (id): Promise<any> => {
    const user = await this.userRepository.findUser(id);
    user.tokens = user.tokens.filter((token) => {
      return token.token !== user.tokens[0].token;
    });
    user.save();
    return user;
  };

  logoutAllUser = async (id): Promise<any> => {
    const user = await this.userRepository.findUser(id);
    try {
      user.tokens = [];

      await user.save();
      return user;
    } catch (e) {
      return e;
    }
  };

  getUser = async (req) => {
    try {
      return req.user;
    } catch (e) {
      return e;
    }
  };

  updateUser = async (id, name, email, password): Promise<any> => {
    const user = new User({ name, email, password });
    return this.userRepository.updateUser(id, user);
  };

  deleteLoggedUser = async (id): Promise<any> => {
    try {
      return this.userRepository.deleteUser(id);
    } catch (e) {
      return e;
    }
  };

  upload = multer({
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

  uploadProfilePic =
    (this.upload.single("avatar"),
    async (req, res): Promise<void> => {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

      req.user.avatar = buffer;
      await req.user.save();
      res.send();
    },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    });

  deleteProfilePic = async (req, res): Promise<void> => {
    try {
      req.user.avatar = undefined;
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(400).send({ error: error });
    }
  };

  getProfilePicById = async (req, res): Promise<void> => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || !user.avatar) {
        throw new Error();
      }

      res.set("Content-Type", "image/png");
      res.send(user.avatar);
    } catch (e) {
      res.status(404).send();
    }
  };
}
