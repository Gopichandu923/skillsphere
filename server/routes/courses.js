import express from "express";
import {
  addCourse,
  getCourseDetails,
  getRoadmap,
  getAllCourses,
} from "../controllers/courses.js";

const Route = express.Router();

Route.get("/", getAllCourses);
Route.post("/", addCourse);
Route.get("/:id", getCourseDetails);
Route.post("/roadmap", getRoadmap);

export default Route;
