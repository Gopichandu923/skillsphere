import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionDisplay = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Replace with your actual API endpoint
  const API_URL = "https://your-api.com/questions";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      alert("No more questions!");
    }
  };

  if (loading) return <div className="p-4">Loading questions...</div>;
  if (questions.length === 0)
    return <div className="p-4">No questions found.</div>;

  const currentQuestion = questions[index];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold">
        Q{index + 1}. {currentQuestion.question}
      </h2>
      <div className="space-y-2">
        {currentQuestion.options.map((option, i) => (
          <div key={i} className="flex items-center space-x-2">
            <input type="radio" id={`option-${i}`} name="option" />
            <label htmlFor={`option-${i}`}>{option}</label>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleNext}
      >
        Next Question
      </button>
    </div>
  );
};

export default QuestionDisplay;
