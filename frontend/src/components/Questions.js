import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetQuestionsByCourse } from "../api";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await GetQuestionsByCourse(id);
      if (!Array.isArray(response.data) || response.data.length === 0) {
        throw new Error("No questions available for this course");
      }

      const validatedQuestions = response.data.filter(
        (q) =>
          q._id &&
          q.question &&
          Array.isArray(q.options) &&
          q.options.length > 0 &&
          q.answer
      );

      if (validatedQuestions.length === 0) {
        throw new Error("Invalid question data received");
      }

      setQuestions(validatedQuestions);
      const initialAnswers = validatedQuestions.reduce((acc, question) => {
        acc[question._id] = null;
        return acc;
      }, {});
      setUserAnswers(initialAnswers);
    } catch (err) {
      setError(err.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswerSelect = useCallback((questionId, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  }, []);

  const calculateScore = useCallback(() => {
    return questions.reduce((score, question) => {
      return userAnswers[question._id] === question.answer ? score + 1 : score;
    }, 0);
  }, [questions, userAnswers]);

  const handleSubmit = useCallback(() => {
    if (window.confirm("Are you sure you want to submit your answers?")) {
      setSubmitted(true);
    }
  }, []);

  const handleReset = useCallback(() => {
    setSubmitted(false);
    setUserAnswers(
      questions.reduce((acc, question) => {
        acc[question._id] = null;
        return acc;
      }, {})
    );
  }, [questions]);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading questions...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
        {error}
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        No valid questions found for this course.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Course Test</h2>

      {!submitted ? (
        <div
          style={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          {questions.map((question, index) => (
            <div
              key={question._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "5px",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ marginTop: 0 }}>
                {index + 1}. {question.question}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {question.options.map((option, idx) => (
                  <li key={idx} style={{ marginBottom: "10px" }}>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        checked={userAnswers[question._id] === option}
                        onChange={() =>
                          handleAnswerSelect(question._id, option)
                        }
                        style={{ marginRight: "10px" }}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Test Completed! Your score: {calculateScore()} out of{" "}
            {questions.length} <br />
            {Math.round((calculateScore() / questions.length) * 100)}%
          </h3>

          {questions.map((question, index) => {
            const userAnswer = userAnswers[question._id];
            const isCorrect = userAnswer === question.answer;
            return (
              <div
                key={question._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  backgroundColor: isCorrect ? "#e6ffed" : "#ffe6e6",
                }}
              >
                <h4 style={{ marginTop: 0 }}>
                  {index + 1}. {question.question}
                </h4>
                <p>
                  <strong>Your answer:</strong> {userAnswer ?? "Not answered"}
                </p>
                <p>
                  <strong>Correct answer:</strong> {question.answer}
                </p>
                <p>{isCorrect ? "✓ Correct" : "✗ Incorrect"}</p>
              </div>
            );
          })}
        </div>
      )}

      <div
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
          padding: "15px 0",
          borderTop: "1px solid #eee",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.values(userAnswers).every(
              (answer) => answer === null
            )}
            style={{
              padding: "10px 20px",
              backgroundColor: Object.values(userAnswers).every(
                (answer) => answer === null
              )
                ? "#ccc"
                : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: Object.values(userAnswers).every(
                (answer) => answer === null
              )
                ? "not-allowed"
                : "pointer",
            }}
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Retake Test
          </button>
        )}
        <button
          onClick={() => navigate(`/courses/${id}`)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Course Details
        </button>
      </div>
    </div>
  );
};

export default Questions;
