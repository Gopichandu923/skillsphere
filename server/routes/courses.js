import express from "express";
import {
  addCourse,
  getCourseDetails,
  getRoadmap,
  getAllCourses,
} from "../controllers/courses.js";
import { insertQuestions } from "../controllers/question.js";

const Route = express.Router();

Route.get("/", getAllCourses);
Route.post("/", addCourse);
Route.get("/:id", getCourseDetails);
Route.post("/roadmap", getRoadmap);
Route.post("/question", insertQuestions);

export default Route;
