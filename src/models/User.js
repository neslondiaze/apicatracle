import mongoose from "mongoose";
const { Shema, model } = "mongoose";

//import bcrypt from "bcryptjs";

//Schema de usuarios
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

/* userSchema.method.encryptPassword = (password) => {
  return bcrypt.hashSyns(password, bcrypt.genSaltSync(10));
};
userSchema.method.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}; */

export const User = model("user", userSchema);
