import express from "express";

import { getAll, create, find, update, remove } from "../controllers/book.controller.js";
import authorize from '../middleware/authorize.middleware.js';


const router = express.Router();


router.get("/", authorize('admin','member'), getAll);
router.get("/find/:id", authorize('admin','member') , find);

router.post("/create", authorize('admin') , create);
router.put("/update/:id", authorize('admin'), update);
router.delete("/delete/:id", authorize('admin'), remove);

export default router;