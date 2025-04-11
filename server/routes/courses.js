import express from "express";
import { addCourse, getCourseDetails } from "../controllers/courses.js";

const Route = express.Router();

Route.post("/", addCourse);
Route.get("/:id", getCourseDetails);

export default Route;
