import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Book from './models/book.model.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());

// READ
app.get("/", async (req, res) => {
    const books = await Book.find();
    res.json({
        success: books.length > 0 ? true: false,
        message: books.length > 0 ? "Books retrieved successfully" : "No books found!",
        data: books
    })
});

// CREATE
app.post("/add", async(req, res) => {
    const { title, author, isbn, publishedDate } = req.body;

    const newBook = new Book({
        title,
        author,
        isbn,
        publishedDate
    });
    const savedBook = await newBook.save();

    res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: savedBook
    });

})

// find book by id
app.get("/book/:id", async (req, res) => {

    const { id } = req.params;


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "ID is invalid!"
        });
    }

    const book = await Book.findById(id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found!"
        });
    }

    res.json({
        success: true,
        message: "Book retrieved successfully",
        data: book
    });
});

// update
app.put("/book/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, publishedDate } = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "ID is invalid!"
        });
    }
    
    const updatedBook = await Book.findByIdAndUpdate(id, {
        title,
        author,
        isbn,
        publishedDate
    }, { new: true });
    
    if (!updatedBook) {
        return res.status(404).json({
            success: false,
            message: "Book not found!"
        });
    }
    
    res.json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook
    });
});

// delete
app.delete("/book/delete/:id", async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "ID is invalid!"
        });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
        return res.status(404).json({
            success: false,
            message: "Book not found!"
        });
    }

    res.json({
        success: true,
        message: "Book deleted successfully",
        data: deletedBook
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.error(`Failed to connect to the database. Error: ${error.message}`);
    process.exit(1);
});