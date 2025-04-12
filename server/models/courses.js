import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  courseLink: [
    {
      type: {
        type: String,
        enum: ["free", "paid"],
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
  podcastLink: String,
  roadmap: {
    type: String,
    required: true,
  },
});

export default mongoose.model("courses", courseSchema);
