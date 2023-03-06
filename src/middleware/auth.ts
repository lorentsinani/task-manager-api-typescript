import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/UserModel";
import { Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const secretcode = process.env.JWT_SECRET;

const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!secretcode) {
      throw new Error("No secret code found");
    }
    const decoded = jwt.verify(token, secretcode) as JwtPayload;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
