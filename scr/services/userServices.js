import User from '../models/userModel.js';
import bcrypt from 'bcrypt'


export const getUserProfile = async (userName) => {
    try {
        const user = await User.findOne({ userName }).select('-password');

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        throw new Error("Error fetching user profile: " + error.message);
    }
};



export const getAllUserProfile = async () => {
    try {
        const user = await User.find({}).select('-password');
        return user;
    } catch (error) {
        throw new Error("Error fetching user profile: " + error.message);
    }
};


export const updateUserProfile = async (userName, updateData) => {
return await User.findOneAndUpdate({ userName }, 
    updateData, 
    { new: true }
).select('-password')
}

export const updateUserRole = async (userId, role) => {
    return await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
    ).select('-password');
}


export const deleteUserProfile = async (userName) => {
    return await User.findOneAndDelete({ userName });
};

export const deleteUserById = async (userId) =>{
    return await User.findByIdAndDelete(userId);
}