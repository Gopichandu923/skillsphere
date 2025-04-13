import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css1/CourseDetails.css";
import { GetCourseById } from "../api";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCourse = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await GetCourseById(id);
      if (!response.data?.Course) {
        throw new Error("Course data not found");
      }
      setCourse(response.data.Course);
    } catch (err) {
      let errorMessage;
      if (err.response?.status === 400) {
        errorMessage = "Invalid course ID provided.";
      } else if (err.response?.status === 404) {
        errorMessage = "Course not found.";
      } else {
        errorMessage =
          err.message === "Network Error"
            ? "Unable to connect to the server"
            : "Failed to fetch course details. Please try again.";
      }
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTimeout(() => navigate("/courses"), 3000);
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleQuestionsClick = () => {
    navigate(`/questions/${id}`);
  };

  if (isLoading) {
    return (
      <div className="course-details-container" aria-live="polite">
        <div className="loading">Loading course details...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-details-container" aria-live="assertive">
        <p className="no-course">{error || "Course not found"}</p>
        <button
          className="back-button"
          onClick={() => navigate("/courses")}
          aria-label="Return to courses list"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-details-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
      <h2>{course.name}</h2>
      <div className="course-details-card">
        <img
          src={
            course.image ||
            "https://via.placeholder.com/300?text=Image+Not+Found"
          }
          alt={course.name}
          className="course-image"
          loading="lazy"
        />
        <div className="course-content">
          <h3>Learning Resources</h3>
          {course.courseLink?.length > 0 ? (
            <div className="links-section">
              <h4>Course Links</h4>
              <ul>
                {course.courseLink.map((link) => (
                  <li key={link._id || link.link}>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        link.type === "free" ? "free-link" : "paid-link"
                      }
                      aria-label={`${
                        link.type === "free" ? "Free" : "Paid"
                      } resource link`}
                    >
                      {link.type === "free" ? "Free" : "Paid"} Resource:{" "}
                      {link.link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No course links available</p>
          )}
          {course.podcastLink ? (
            <div className="links-section">
              <h4>Podcast</h4>
              <a
                href={course.podcastLink}
                target="_blank"
                rel="noopener noreferrer"
                className="podcast-link"
                aria-label="Listen to podcast"
              >
                Listen to Podcast
              </a>
            </div>
          ) : (
            <p>No podcast available</p>
          )}
          {course.roadmap ? (
            <div className="links-section">
              <h4>Roadmap</h4>
              <a
                href={course.roadmap}
                target="_blank"
                rel="noopener noreferrer"
                className="roadmap-link"
                aria-label="View learning roadmap"
              >
                View Learning Roadmap
              </a>
            </div>
          ) : (
            <p>No roadmap available</p>
          )}
        </div>
      </div>
      <div className="course-actions">
        <button
          className="questions-button"
          onClick={handleQuestionsClick}
          aria-label="View questions for this course"
        >
          View Questions
        </button>
        <button
          className="back-button"
          onClick={() => navigate("/courses")}
          aria-label="Return to courses list"
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
