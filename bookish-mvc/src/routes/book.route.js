import express from "express";

import { getAll, create, find, update, remove } from "../controllers/book.controller.js";


const router = express.Router();

router.get("/", getAll);
router.post("/create", create);
router.get("/find/:id", find);
router.put("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;