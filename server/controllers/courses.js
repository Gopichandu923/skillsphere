import courses from "../models/courses";

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
