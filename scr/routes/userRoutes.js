import {
  fetchProfile,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { authenticate } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { updateUserValidator } from "../validators/auth.validators.js";

import express from "express";

const userRoutes = express.Router();

userRoutes
  .route("/:userName")
  .get(authenticate, fetchProfile)
  .patch(authenticate, validateBody(updateUserValidator), updateUser)
  .delete(authenticate, deleteUser);

export default userRoutes;
  