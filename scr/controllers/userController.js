import {getUserProfile, updateUserProfile, deleteUserProfile} from "../services/userServices.js";


export const fetchProfile = async (req, res) => {
    try {
        const user = await getUserProfile(req.params.userName);
        if (!user) {
            throw new Error("USERNAME REQIURED");
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ "message": error.message })
    }
}


export const updateUser = async (req, res) => {
    try {
        const user = await updateUserProfile(req.params.userName, req.body);
        if (!user) {
            throw new Error("USERNAME REQIURED");
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const user = await deleteUserProfile(req.params.userName);
        if (!user) {
            throw new Error("USERNAME REQIURED");
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}