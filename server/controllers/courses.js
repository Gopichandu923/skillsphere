import courses from "../models/courses.js";
import { GoogleGenAI } from "@google/genai";
import Question from "../models/questions.js";
import dotenv from "dotenv";

dotenv.config();

const addCourse = async (req, res) => {
  try {
    const { name, courseLink, podcastLink, roadmap, image } = req.body;
    if (!name || !courseLink || courseLink.length === 0 || !roadmap) {
      return res.status(400).json({
        message:
          "Please provide all required fields: name, at least one courseLink, and roadmap",
      });
    }
    if (!Array.isArray(courseLink)) {
      return res.status(400).json({
        message:
          "courseLink must be an array of objects with type and link properties",
      });
    }

    const new_course = new courses({
      name,
      courseLink,
      podcastLink: podcastLink || "",
      roadmap,
      image: image || "",
    });

    await new_course.save();
    res.status(201).json({
      message: "Successfully added the course",
      course: new_course,
    });
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const Courses = await courses.find({}, { name: 1, image: 1, _id: 1 });
    if (Courses.length > 0) {
      res.status(200).json(Courses);
    } else {
      res.status(401).json({ message: "courses not found" });
    }
  } catch (err) {
    console.log(`internal server error ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const Course = await courses.findOne({ _id: id });
    if (Course) {
      res.status(200).json({ Course });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (err) {
    console.log(`internal server error ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRoadmap = async (req, res) => {
  try {
    const { query } = req.body;
    const key = process.env.GEMINI_AI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: query,
    });
    console.log(response.text);
    res.status(200).json(response.text);
  } catch (err) {
    console.log(`internal server error ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getQuestionsByCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await Question.find({ course: id });
    if (questions.length > 0) {
      res.status(200).json({ questions });
    } else {
      res.status(404).json({ message: "questions not found" });
    }
  } catch (err) {
    console.log(`internal server error ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  addCourse,
  getCourseDetails,
  getRoadmap,
  getAllCourses,
  getQuestionsByCourse,
};
