import {addCourse,getAllCourses,getCourseById} from "../Controllers/course.js";
import  express from "express";
import { auth } from "../Middlewares/auth.js";

const router = express.Router();

router.get('/',getAllCourses);
router.get('/:id',getCourseById);
router.post('/',auth,addCourse);

export default router;