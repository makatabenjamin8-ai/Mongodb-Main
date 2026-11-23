import bcrypt from "bcrypt";
import { signToken, verifyToken } from "../middleware/jwt.js";
import { sendPasswordResetEmail as deliverPasswordResetEmail } from "./emailServices.js";
import User from "../models/userModel.js";

const invalidResetTokenError = () => {
    const error = Error("Invalid or expired token");
    error.statusCode = 401;
    return error;
};

export const sendPasswordResetEmail = async (email) => {
    if (typeof email !== "string" || !email.trim()) {
        const error = Error("Email is required");
        error.statusCode = 400;
        throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    const genericMessage = "If an account with that email exists, a password reset email has been sent.";

    if (!user) {
        return { message: genericMessage };
    }

    const resetToken = signToken(
        {
            id: user._id.toString(),
            userName: user.userName,
            email: user.email,
            purpose: "password-reset",
        },
        { expiresIn: "5m" }
    );

    const emailResult = await deliverPasswordResetEmail({
        userName: user.userName,
        email: user.email,
        resetToken,
    });

    if (!emailResult.success) {
        const error = Error("Unable to send password reset email");
        error.statusCode = 500;
        throw error;
    }

    return { message: genericMessage };
};

export const confirmResetToken = (token) => {
    if (!token || typeof token !== "string") {
        const error = Error("Token is required");
        error.statusCode = 400;
        throw error;
    }

    try {
        const decoded = verifyToken(token);
        if (decoded.purpose !== "password-reset") {
            throw invalidResetTokenError();
        }
        return { valid: true };
    } catch (error) {
        if (error.statusCode === 401) {
            throw error;
        }
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError"
        ) {
            throw invalidResetTokenError();
        }
        throw error;
    }
};

export const resetUserPassword = async (token, password) => {
    if (typeof token !== "string" || !token || typeof password !== "string" || !password) {
        const error = Error("Token and new password are required");
        error.statusCode = 400;
        throw error;
    }

    confirmResetToken(token);
    const decoded = verifyToken(token);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
        decoded.id,
        { password: hashedPassword },
        { new: true, runValidators: true }
    );

    if (!user) {
        const error = Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return { message: "Password reset successfully" };
};
