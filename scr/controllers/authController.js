import {
    confirmResetToken,
    resetUserPassword,
    sendPasswordResetEmail,
} from "../services/authServices.js";

export const forgotPassword = async (req, res) => {
    try {
        const response = await sendPasswordResetEmail(req.body?.email);
        return res.status(200).json({ message: response.message });
    } catch (error) {
        console.error("Error in forgotPassword controller:", error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const response = await resetUserPassword(token, password);

        return res.status(200).json({
            message: response.message,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

export const confirmToken = (req, res) => {
    try {
        const response = confirmResetToken(req.body?.token);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};
