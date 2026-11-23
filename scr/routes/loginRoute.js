import { Router } from "express";
import { authenticateUser } from "../controllers/loginController.js";
import { validateBody } from "../middleware/validate.js";
import { loginValidator } from "../validators/auth.validators.js";

const loginRoutes = Router();

loginRoutes.post("/", validateBody(loginValidator), authenticateUser);

export default loginRoutes;
