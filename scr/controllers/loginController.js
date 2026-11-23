import { loginUser } from "../services/loginServices.js";

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await loginUser(email, password);
    const user = response.user;
    const token = response.token;
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
   partitioned: true
    });

    return res.status(200).send({ message: "login succesful", response });
  } catch (error) {
    return res.status(error.statusCode || 500).send({ message: error.message });
  }
};
