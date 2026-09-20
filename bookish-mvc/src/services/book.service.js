import mongoose from "mongoose";
import Book from "../models/book.model.js";

const fetchBooks = async () => {
    const books = await Book.find();
    return books;
}

const checkDuplicateISBN = async (isbn) => {
    const isbnCheck = await Book.find({isbn});
    if(isbnCheck.length>0){
        return true;
    }
    return false;
}

const createBook = async (data) => {
    const newBook = new Book(data);
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

export { fetchBooks, createBook, checkDuplicateISBN, findBook, isObjectIdValid, updateBook, removeBook };