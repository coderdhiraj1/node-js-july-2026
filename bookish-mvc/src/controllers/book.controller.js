import { fetchBooks, createBook, checkDuplicateISBN, findBook, isObjectIdValid, updateBook, removeBook } from "../services/book.service.js";


const getAll = async (req, res) => {
    const books = await fetchBooks();   
    res.json({
        success: books.length > 0 ? true: false,
        message: books.length > 0 ? "Books retrieved successfully" : "No books found!",
        data: books
    })
}

const create = async (req, res) => {
    try { 
        const { title, author, isbn, publishedDate } = req.body;

        // check for duplicate ISBN
        const isDupISBN = await checkDuplicateISBN(isbn);
        if(isDupISBN){
            return res.status(400).json({
                success: false,
                message: "This ISBN already exist!",
            });
        }

        const savedBook = await createBook({ title, author, isbn, publishedDate });
        
        return res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: savedBook
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
}

const find = async (req, res) => {
    const { id } = req.params;

    if(!isObjectIdValid(id)){
        return res.status(400).json({
            success: false,
            message: "ID is invalid!"
        });
    }

    const book = await findBook(id);

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
}

const update = async (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, publishedDate } = req.body;
    
    if(!isObjectIdValid(id)){
        return res.status(400).json({
            success: false,
            message: "ID is invalid!"
        });
    }
    
    const updatedBook = await updateBook(id, { title, author, isbn, publishedDate });
    
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
}

const remove = async (req, res) => {
    const { id } = req.params;
    
    if(!isObjectIdValid(id)){
        return res.status(400).json({
            success: false,
            message: "ID is invalid!"
        });
    }

    const deletedBook = await removeBook(id);

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
}

export { getAll, create, find, update, remove };