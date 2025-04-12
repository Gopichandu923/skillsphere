import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (array) {
          return array.length === 4;
        },
        message: "Options array must contain exactly 4 choices.",
      },
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return this.options.includes(value);
        },
        message: "Answer must be one of the provided options.",
      },
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("question", questionSchema);
export default Question;
