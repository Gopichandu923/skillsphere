import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllCourses } from "../api";
import "../css/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SkillSphere | Courses";
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await GetAllCourses();
        setCourses(response.data);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          (err.message === "Network Error"
            ? "Unable to connect to the server"
            : "Failed to fetch courses. Please try again.");
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="courses-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="courses-header">
        <h2 className="courses-title">Explore Our Courses</h2>
        <p className="courses-subtitle">
          Discover a wide range of topics to boost your skills
        </p>
      </div>

      {isLoading ? (
        <div className="courses-loading">Loading courses...</div>
      ) : courses.length === 0 ? (
        <p className="courses-empty">No courses available</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={course._id}
              className="course-card"
              onClick={() => handleCourseClick(course._id)}
            >
              <img
                src={course.image}
                alt={course.name}
                className="course-image"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x150?text=No+Image";
                }}
              />
              <h3 className="course-name">{course.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
