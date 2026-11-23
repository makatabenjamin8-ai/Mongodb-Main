import { registerUser } from "../services/registerService.js";

import { sendWelcomeEmail } from "../services/emailServices.js";

export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const response = await registerUser(userData);
    // const user = response.user;

    const user = {
      username: response?.user?.userName,
      email: response?.user?.email
    }
    const token = response.token;
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true,
    });

    const emailResponse = await sendWelcomeEmail(user);

    if (!emailResponse.success) {
      return res.status(500).json({ message: emailResponse.message });
    }

    res.status(201).json({ message: "User created succesfully", token:token, user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
