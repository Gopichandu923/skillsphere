import courses from "../models/courses.js";

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

export { addCourse, getCourseDetails };
