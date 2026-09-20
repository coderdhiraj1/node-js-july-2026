import express from 'express';
import dotenv from 'dotenv';

import Book from "./src/models/book.model.js";
import bookRoutes from "./src/routes/book.route.js";
import connectDB from "./src/config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/books",bookRoutes);

connectDB((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})


