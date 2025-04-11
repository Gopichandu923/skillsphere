import mongoose from "mongoose";

const Courses = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courseLink: {
    type: String,
    required: true,
  },
  podcastLink: {
    type: String,
    required: true,
  },
  roadmap: {
    type: [String],
  },
});

export default mongoose.model("courses", Courses);
