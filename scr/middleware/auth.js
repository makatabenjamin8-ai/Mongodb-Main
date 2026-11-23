import jwt from "jsonwebtoken";
import { signToken, verifyToken } from "./jwt.js";

const readCookie = (cookieHeader, name) => {
  const cookie = cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
};

const getAuthenticatedUser = (token) => {
  if (!token) {
    const error = new Error("Authentication required");
    error.status = 401;
    throw error;
  }

  try {
    return verifyToken(token);
  } catch {
    const error = new Error("Invalid or expired token");
    error.statusCode = 401;
    throw error;
  }
};



export const authenticate = (req, res, next) => {
  try {

    const token = req.cookies?.token ?? readCookie(req.headers.cookie, "token");

    console.log({ token });

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const decoded = getAuthenticatedUser(token);

    if (!decoded) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }
    
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};


export const authenticateSocket = (socket, next) => {
  try {
    const token = readCookie(socket.handshake.headers.cookie, "token");
    socket.data.user = getAuthenticatedUser(token);
    return next();
  } catch (error) {
    return next(new Error(error.message));
  }
}