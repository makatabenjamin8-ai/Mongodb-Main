import { Router } from "express";

import { fetchAllProfile, updateRole, deleteUser } from "../controllers/adminController.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeAdmin } from "../middleware/admin.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import { deleteUserValidator, updateRoleValidator } from "../validators/auth.validators.js";


const adminRoutes = Router();


adminRoutes.use( authenticate, authorizeAdmin);

adminRoutes.get("/users", fetchAllProfile);
adminRoutes.delete("/users/:userId", validateParams(deleteUserValidator), deleteUser);
adminRoutes.patch(
    "/users/:userId/role",
    validateParams(deleteUserValidator),
    validateBody(updateRoleValidator),
    updateRole
);

export default adminRoutes;