import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import { signToken } from "../middleware/jwt.js";

export const registerUser = async (userData) => {
  let {
    userName,
    fullName,
    email,
    password,
    phone,
    age,
    address,
    gender,
  } = userData;

  let hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = Error("Email Has Already Been Used By Another User");
    error.statusCode = 400;
    throw error;
  }

    const user = await User.create({
      userName,
      fullName,
      email,
      password: hashedPassword,
      phone,
      age,
      address,
      gender,
    });

  const token = signToken({
    id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
  });
    

  return {user :{userName:user.userName,email:user.email,role:user.role},token: token};
};
