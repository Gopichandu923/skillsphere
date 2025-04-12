/*// controllers/question.js
import { readFile } from "fs/promises"; // For reading JSON file
import path from "path";
import { fileURLToPath } from "url";
import Question from "../models/questions.js";
import Course from "../models/courses.js";

// Resolve __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON data (synchronous read is avoided for better performance)
//const questionsDataPath = path.join(__dirname, "./test.json");
let questionsData;
try {
  const jsonContent = await readFile(questionsDataPath, "utf-8");
  questionsData = JSON.parse(jsonContent);
} catch (error) {
  console.error("Error loading JSON data:", error.message);
  throw new Error("Failed to load questions data");
}

const insertQuestions = async (req, res) => {
  try {
    const { courseName } = req.body;

    // Validate course name
    if (!courseName) {
      return res.status(400).json({ message: "Course name is required." });
    }

    // Find the course by name
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Check for existing questions to avoid duplicates (optional)
    const existingQuestions = await Question.countDocuments({
      course: course._id,
    });
    if (existingQuestions > 0) {
      return res
        .status(400)
        .json({ message: "Questions already exist for this course." });
    }

    // Attach course ID to each question
    const questionsWithCourse = questionsData.map((q) => ({
      question: q.question,
      options: q.options,
      answer: q.answer,
      course: course._id,
    }));

    // Insert into DB
    const inserted = await Question.insertMany(questionsWithCourse, {
      ordered: false,
    });

    res.status(201).json({
      message: `${inserted.length} questions inserted successfully.`,
      data: inserted,
    });
  } catch (error) {
    console.error("Insert questions error:", error);
    res.status(500).json({
      message: "Error inserting questions",
      error: error.message,
    });
  }
};

export { insertQuestions };
*/
