import { Router } from "express"
const registerRoute = Router();

import { createUser } from "../controllers/registerController.js";
import { validateBody } from "../middleware/validate.js";
import { registerValidator } from "../validators/auth.validators.js";

registerRoute.post("/", validateBody(registerValidator), createUser)

export default registerRoute;