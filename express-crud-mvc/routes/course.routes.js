import { Router } from 'express';
import { index, getCourseById, create, update, destroy } from '../controllers/course.controller.js';

const router = Router();

router.get("/", index)
router.get("/find{/:id}", getCourseById) // optional parameter
router.post("/add", create)
router.put("/update/:id", update) // mandatory param
router.delete("/delete/:id", destroy)

export default router;