import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin','member','superadmin'],
        default: 'member'
    }
}, {
    timestamps: true
});

// virtual popuplate books
userSchema.virtual("books", {
    ref: "Book",
    localField: "_id",
    foreignField: "createdBy"
}); 

const User = mongoose.model("User", userSchema);

export default User;