import express from "express";

import { getAll, create, find, update, remove, getUsers } from "../controllers/book.controller.js";
import authorize from '../middleware/authorize.middleware.js';


const router = express.Router();


router.get("/", authorize('admin','member','superadmin'), getAll);
router.get("/find/:id", authorize('admin','member','superadmin') , find);

router.post("/create", authorize('admin','superadmin') , create);
router.put("/update/:id", authorize('admin','superadmin'), update);
router.delete("/delete/:id", authorize('admin','superadmin'), remove);

// only superadmin
router.get("/users", authorize('superadmin'), getUsers);

export default router;