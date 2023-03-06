import { User } from "../models/UserModel";

export class UserRepository {
  findUser = async (id) => {
    const existUser = await User.findById(id);

    if (!existUser) {
      throw new Error("User not found");
    }

    return existUser;
  };

  updateUser = async (id, user) => {
    const existUser = await this.findUser(id);

    return User.findByIdAndUpdate(id, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  deleteUser = async (id) => {
    const user = await this.findUser(id);

    user.remove();
  };
}
