import express from 'express';
import dotenv from 'dotenv';

import Book from "./src/models/book.model.js";
import connectDB from "./src/config/database.js";

import authRoutes from "./src/routes/auth.route.js";
import bookRoutes from "./src/routes/book.route.js";

import { verifyJWT } from './src/middleware/auth.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/books", verifyJWT, bookRoutes);

connectDB((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})


