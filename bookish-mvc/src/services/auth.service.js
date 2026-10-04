import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

export const duplicateUserCheck = async (emailId) => {
    const userExist = await User.find({emailId});
    if(userExist.length>0){
        return true;
    }
    return false;
}

export const registerUser = async (data) => {
    const { name, emailId, password, role } = data;

    const hash = await generatePasswordHash(password);

    const newUser = new User({name, emailId, password: hash, role});
    return await newUser.save()
}

const generatePasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const loginUser = async (data) => {
    const {emailId, password} = data;

    const user = await User.findOne({"emailId": emailId});

    if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return user;
        }
    }

    return false;
}