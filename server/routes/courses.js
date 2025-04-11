import express from "express";
import { addCourse } from "../controllers/courses";

const Route = express.Router();

Route.post("/", addCourse);

export default Route;
