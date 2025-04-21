import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/SignUp.css";
import { SignUpUser } from "../api";

const SignUp = () => {
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
    setFormData((prev) => ({
      ...prev,
      [id]: ["name", "email", "contact"].includes(id)
        ? value.trimStart()
        : value,
    }));
  };

  const validateForm = () => {
    const { name, email, contact, password, confirmPassword } = formData;

    if (!name || !email || !contact || !password || !confirmPassword) {
      return "All fields are required";
    }
    if (name.trim().length < 2)
      return "Full name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address";
    if (!/^\+?\d{10,15}$/.test(contact.replace(/\s/g, "")))
      return "Please enter a valid phone number (10-15 digits)";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      showToast(validationError, "error");
      setIsLoading(false);
      return;
    }

    try {
      const details = {
        name: formData.name.trim(),
        email: formData.email,
        contact: formData.contact.replace(/\s/g, ""),
        password: formData.password,
      };

      const response = await SignUpUser(details);

      if (
        response.status === 200 &&
        response.data.message.includes("required")
      ) {
        showToast(response.data.message, "error");
        return;
      }
      if (response.status === 200 && response.data.message.includes("exist")) {
        showToast("Email already registered", "error");
        return;
      }

      showToast(
        "Account created successfully! Redirecting to sign in...",
        "success"
      );
      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => navigate("/signin"), 2500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.message === "Network Error"
          ? "Unable to connect to the server"
          : "Failed to create account. Please try again.");
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: type === "success" ? 2000 : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <div className="auth-container">
      <ToastContainer {...toastConfig} />

      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Join SkillSphere</h2>
          <p className="auth-subtitle">Create your account to start learning</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              className="form-input"
              placeholder="+1234567890"
              value={formData.contact}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-text">
            Already have an account?{" "}
            <a href="/signin" className="auth-link">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
  limit: 3,
};

export default SignUp;
