import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/CourseDetails.css";
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
      toast.error(errorMessage, toastConfig);
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
          className="btn btn-secondary"
          onClick={() => navigate("/courses")}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-details-container">
      <ToastContainer {...toastConfig} />

      <h2 className="course-title">{course.name}</h2>

      <div className="course-card">
        <img
          src={course.image || placeholderImage}
          alt={course.name}
          className="course-image"
          loading="lazy"
        />

        <div className="course-content">
          <h3 className="section-heading">Learning Resources</h3>

          <ResourceSection
            title="Course Links"
            items={course.courseLink}
            renderItem={(link) => (
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`resource-link ${link.type}-link`}
                aria-label={`${link.type} resource link`}
              >
                {link.type === "free" ? "Free" : "Paid"} Resource: {link.link}
              </a>
            )}
            emptyMessage="No course links available"
          />

          <ResourceSection
            title="Podcast"
            items={course.podcastLink ? [course.podcastLink] : []}
            renderItem={(link) => (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link podcast-link"
                aria-label="Listen to podcast"
              >
                Listen to Podcast
              </a>
            )}
            emptyMessage="No podcast available"
          />

          <ResourceSection
            title="Roadmap"
            items={course.roadmap ? [course.roadmap] : []}
            renderItem={(link) => (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link roadmap-link"
                aria-label="View learning roadmap"
              >
                View Learning Roadmap
              </a>
            )}
            emptyMessage="No roadmap available"
          />
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={handleQuestionsClick}>
          View Questions
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/courses")}
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
};

const ResourceSection = ({ title, items, renderItem, emptyMessage }) => (
  <div className="resource-section">
    <h4 className="resource-title">{title}</h4>
    {items?.length > 0 ? (
      <ul className="resource-list">
        {items.map((item, index) => (
          <li key={index} className="resource-item">
            {renderItem(item)}
          </li>
        ))}
      </ul>
    ) : (
      <p className="empty-message">{emptyMessage}</p>
    )}
  </div>
);

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  limit: 3,
};

const placeholderImage = "https://via.placeholder.com/300?text=Image+Not+Found";

export default CourseDetails;
