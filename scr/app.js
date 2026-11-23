import express from "express";
import productRouter from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loginRoute from "./routes/loginRoute.js";
import registerRoute from "./routes/registerRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRouter from "./routes/authRoutes.js";

import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieparser());



app.use(cors({
    origin:'http://127.0.0.1:5500',
credentials: true
}));

app.use("/products", productRouter);
app.use("/user", userRoutes);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/admin", adminRoutes)
app.use("/auth", authRouter);


export default app;
