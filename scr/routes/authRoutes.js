import { Router } from "express";
import { confirmToken, forgotPassword, resetPassword } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/forgotpassword", forgotPassword);
authRouter.post("/confirmtoken", confirmToken);
authRouter.post("/resetpassword", resetPassword);


export default authRouter;