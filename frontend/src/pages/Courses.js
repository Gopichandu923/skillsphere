import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Courses.css";
import { GetAllCourses } from "../api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await GetAllCourses();
        console.log("Courses response:", response.data); // Optional: for debugging
        setCourses(response.data);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          (err.message === "Network Error"
            ? "Unable to connect to the server"
            : "Failed to fetch courses. Please try again.");
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    // Optional: Navigate to course details page
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
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
      <h2>Explore Our Courses</h2>
      <p>Discover a wide range of topics to boost your skills</p>
      {isLoading ? (
        <div className="loading">Loading courses...</div>
      ) : courses.length === 0 ? (
        <p className="no-courses">No courses available</p>
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
                    "https://via.placeholder.com/150?text=Image+Not+Found";
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
