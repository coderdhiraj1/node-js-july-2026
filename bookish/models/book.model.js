import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    publishedDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

export default Book;