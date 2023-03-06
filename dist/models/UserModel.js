"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const validator_1 = __importDefault(require("validator"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain 'password'");
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number");
            }
        },
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    avatar: {
        type: Buffer,
    },
}, {
    timestamps: true,
});
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner",
});
// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   delete userObject.tokens;
//   delete userObject.avatar;
//   return userObject;
// };
// userSchema.methods.generateAuthToken = async function (user): Promise<string> {
//   const secretCode = process.env.JWT_SECRET || "";
//   const token = jwt.sign({ _id: user._id.toString() }, secretCode);
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };
// userSchema.statics.findByCredentials = async function (
//   email: string,
//   password: string
// ): Promise<IUser> {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("Unable to login");
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Unable to login");
//   }
//   return user;
// } as IUserModel["findByCredentials"];
// // Hash the plain text password before saving
// userSchema.pre<IUser>("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });
// userSchema.pre<IUser>("remove", async function (next) {
//   const user = this;
//   await Task.deleteMany({ owner: user._id });
//   next();
// });
exports.User = mongoose_1.default.model("User", userSchema);
