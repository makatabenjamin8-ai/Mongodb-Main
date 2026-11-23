import { updateUserRole, getAllUserProfile, deleteUserById } from "../services/userServices.js";


export const fetchAllProfile = async (req, res) => {
    try {
        const users = await getAllUserProfile();
        res.status(200).json({ result:users.length, users });
    } catch (error) {
        res.status(404).json({ "message": error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await deleteUserById(req.params.userId);
        if (!user) {
            throw new Error("User not found");
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateRole = async (req, res) => {
    try {
        const user = await updateUserRole(req.params.userId, req.body.role);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User role updated", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}