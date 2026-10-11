import mongoose from "mongoose";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import { formatDate } from "../utils/datetime.util.js";


const fetchBooks = async () => {
    const books = await Book.find().populate('createdBy', 'name emailId');
    return books;
}

const checkDuplicateISBN = async (isbn) => {
    const isbnCheck = await Book.find({isbn});
    if(isbnCheck.length>0){
        return true;
    }
    return false;
}

const createBook = async (data, currentUserId) => {
    console.log("Current User ID:", currentUserId);
    const newBook = new Book({ ...data, createdBy: currentUserId });
    const savedBook = await newBook.save();
    return savedBook;
}

const findBook = async (id) => {
    const book = await Book.findById(id);
    return book;
}

const isObjectIdValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

const updateBook = async(id, data) => {
    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });
    return updatedBook;
}

const removeBook = async(id) => {
    return await Book.findByIdAndDelete(id);
}

const getUsersWithBooks = async (currentUserId) => {
    // latest first + should not self records
    const users = await User
        .find({_id: {$ne: new mongoose.Types.ObjectId(currentUserId)}})
        .select('_id name emailId role createdAt updatedAt')
        .sort({ createdAt: -1 })
        .populate('books')
        .lean();

    return users.map(user => ({
        ...user,
        createdAt: formatDate(user.createdAt),
        updatedAt: formatDate(user.updatedAt)
    }));
}

export { fetchBooks, createBook, checkDuplicateISBN, findBook, isObjectIdValid, updateBook, removeBook, getUsersWithBooks };