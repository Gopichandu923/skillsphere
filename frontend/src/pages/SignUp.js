import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/SignUp.css";
import { SignUpUser } from "../api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Sanitize: trim whitespace for name, email, contact
    const sanitizedValue =
      id === "name" || id === "email" || id === "contact"
        ? value.trimStart()
        : value;
    setFormData((prev) => ({
      ...prev,
      [id]: sanitizedValue,
    }));
  };

  const validateForm = () => {
    const { name, email, contact, password, confirmPassword } = formData;

    // Check for empty fields
    if (!name || !email || !contact || !password || !confirmPassword) {
      return "All fields are required";
    }

    // Validate name
    if (name.trim().length < 2) {
      return "Full name must be at least 2 characters";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Validate contact (basic phone number check)
    const contactRegex = /^\+?\d{10,15}$/;
    if (!contactRegex.test(contact.replace(/\s/g, ""))) {
      return "Please enter a valid phone number (10-15 digits)";
    }

    // Validate password
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setIsLoading(false);
      return;
    }

    try {
      const details = {
        name: formData.name.trim(),
        email: formData.email,
        contact: formData.contact.replace(/\s/g, ""), // Remove spaces for API
        password: formData.password,
      };

      const response = await SignUpUser(details);

      // Backend may return 200 for errors, so check message
      if (
        response.status === 200 &&
        response.data.message.includes("required")
      ) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        return;
      }
      if (response.status === 200 && response.data.message.includes("exist")) {
        toast.error("Email already registered", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        return;
      }

      // Success (201 or other success case)
      toast.success("Account created successfully! Redirecting to sign in...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 2500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.message === "Network Error"
          ? "Unable to connect to the server"
          : "Failed to create account. Please try again.");
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

  return (
    <div className="signup-container">
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
      <div className="form-box">
        <h2>Create an Account</h2>
        <p>Join SkillSphere and start your journey</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            placeholder="+1234567890"
            value={formData.contact}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Repeat your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="extra">
          <p>
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
