import Joi from "joi";

export const registerValidator = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    fullName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().pattern(/^[0-9]{11}$/).required().messages({
        "string.pattern.base": "Phone number must be a 11-digit number",
    }),
    gender: Joi.string().valid("male", "female"),
    role: Joi.string().valid("user"),
    address: Joi.string().min(1).max(256),
    age: Joi.number().min(1),
});

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})


export const updateUserPasswordValidator = Joi.object({
    newPassword: Joi.string().min(8).required(),
    confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
        "any.only": "Confirm password must match new password",
    }),
})

export const deleteUserValidator = Joi.object({
    userId: Joi.string().min(1).required(),
});

export const updateRoleValidator = Joi.object({
    role: Joi.string().valid("user", "admin").required(),
}).unknown(false);

export const updateUserValidator = Joi.object({
    userName: Joi.string().min(3).max(30).optional(),
    fullName: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]{11}$/).messages({
        "string.pattern.base": "Phone number must be a 11-digit number",
    }).optional(),
    gender: Joi.string().valid("male", "female").optional(),
    address: Joi.string().min(1).max(256).optional() ,
    age: Joi.number().min(1).optional(),
});

export const updateUserStatusValidator = Joi.object({
   isActive: Joi.boolean().required().strict(),
});