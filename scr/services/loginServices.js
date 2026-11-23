import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { signToken } from "../middleware/jwt.js";

export const loginUser = async (email, password) => {
  if (!email || !password) {
    const error = Error("Email and Password are required");
    error.statusCode = 400;
    throw error;
  }

  email = email.toLowerCase().trim();

  const user = await User.findOne({ email: email });

  if (!user) {
    const error = Error("USER NOT FOUND");
    error.statusCode = 401;
    throw error;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = signToken({
    id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
  });

  return { user:{userName:user.userName,email:user.email,role:user.role},token: token};
};
