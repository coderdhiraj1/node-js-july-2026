import jwt from 'jsonwebtoken';
import { duplicateUserCheck, registerUser, loginUser } from "../services/auth.service.js";
import { registerSchema, loginSchema } from '../validators/auth.validator.js'


const login = async (req, res) => {

    const { emailId, password } = req.body;

    // body validation
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validation.error.flatten().fieldErrors
        });
    }

    // login check
    const user = await loginUser(req.body);
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Email or password is invalid!",
        });
    }

    const payload = {
        "_id": user._id,
        "name": user.name,
        "emailId": user.emailId,
        "role": user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRY
    });

    res.json({
        success: true,
        message: "Login successful!",
        data: {
            user,
            token: token
        }
    });
}


const register = async (req, res) => {

    const { name, emailId, password, confirmPassword, role } = req.body;

    // body validation
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validation.error.flatten().fieldErrors
        });
    }

    // user creation and email check
    const isUserExist = await duplicateUserCheck(emailId);
    if(isUserExist){
        return res.status(400).json({
            success: false,
            message: "User with this email already exist.",
        });
    }

    // register user
    const newUser = await registerUser({name, emailId, password, role});

    res.status(201).json({
        success: true,
        message: "Registration successful!",
        data: newUser
    })
}


export { login, register };