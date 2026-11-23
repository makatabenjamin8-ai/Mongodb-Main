import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
});

export const buildWelcomeEmail = ({ username, email }) =>({
    from: "Welcome to our service <luma@ourservice.com>",
    to: email,
    subject: "Welcome to our LUMA APP !",
    html: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    <h1>Welcome, ${username}!</h1>
    <p>Thank you for signing up for our service. We're excited to have you on board!</p>
    </div>`,
});

export const sendWelcomeEmail = async (user) => {
    const mail = buildWelcomeEmail({
        username: user.username,
        email: user.email,
    });

    try {
        await transporter.sendMail({
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            html: mail.html,
        });
        return { success: true, message: `Welcome email sent to ${user.email}` };
    } catch (error) {
        error.message = `Failed to send welcome email ${error.message}`;
        return { success: false, message: error.message };
    }

};

export const buildPasswordResetEmail = ({ userName,email, resetToken }) => ({
    from: "LUMA <passwordreset@ourservice.com>",
    to: email,
    subject: "Password Reset Request",
    html: 

    `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h1>Password Reset Request</h1>
        <p>Hello ${userName},</p>
        <p>You have requested to reset your password. If you did not make this request, please ignore this email.</p>
        <p>To reset your password, please click the link below:</p>
        <a href="http://127.0.0.1:5500/resetPassword.html?token=${resetToken}" target="_blank" style="background: linear-gradient(90deg, #43e8ff, #47f5e4 48%, #c4f7ff); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        </div>
    `,
});

export const sendPasswordResetEmail = async ({ userName,email, resetToken }) => {
    const mail = buildPasswordResetEmail({
        userName,
        email,
        resetToken,
    });

    try{
        await transporter.sendMail({
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            html: mail.html,
        });
        return { success: true, message: `Password reset email sent to ${email}` };
    } catch (error) {
        error.message = `Failed to send password reset email ${error.message}`;
        return { success: false, message: error.message };
    }
};
