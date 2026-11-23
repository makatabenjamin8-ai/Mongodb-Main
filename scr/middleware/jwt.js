import jwt from "jsonwebtoken";

export const signToken = (payload, options = {}) => {
  const SECRET = process.env.SECRET;
  return jwt.sign(payload, SECRET, { expiresIn: "3h", ...options });
};

export const verifyToken = (token) => {
  const SECRET = process.env.SECRET;
  return jwt.verify(token, SECRET);
};
