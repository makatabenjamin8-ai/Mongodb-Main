import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String, required: true, unique: true
    },

    fullName: {
        type: String, required: true
    },

    email: { 
        type: String, required: true, unique: true 
    },

    password: {
        type: String, required: true
    },

    phone: {
        type: String, unique: true
    },

    gender: {
        type: String, enum: ["male", "female"]
    },

    role: {
        type: String, enum: ["superadmin", "admin", "user"], 
        default: "user"
    },

    address: {
        type: String
    },
    
    age: {
        type: Number
    }
})

const User = mongoose.model("users", userSchema)
export default User; 