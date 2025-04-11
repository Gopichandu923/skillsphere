import courses from "../models/courses.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const addCourse = async (req, res) => {
  try {
    const { name, courseLink, podcastLink, roadmap } = req.body;
    if (!name || !courseLink || !podcastLink || !roadmap) {
      res.json({ message: "mention all the feilds" });
    }
    const nwe_course = new courses({ name, courseLink, podcastLink, roadmap });
    nwe_course.save();
    res.status(201).json({ message: "successfully added the course" });
  } catch (err) {
    console.log(`internal server error ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id  " + id);
    const Course = await courses.findOne({ id });
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
    res.status(200).json(response.text); //returns array of strings
  } catch (err) {
    console.log(`internal server error ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addCourse, getCourseDetails, getRoadmap };
