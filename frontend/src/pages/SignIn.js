import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/SignIn.css";
import { SignInUser } from "../api";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SkillSphere | Signin";
  }, []);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "email" ? value.trimStart() : value,
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "All fields are required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address";
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
      const response = await SignInUser(formData);
      localStorage.setItem("skillsphere-token", response.data.token);
      showToast(response.data.message || "Successfully signed in!", "success");
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.message === "Network Error"
          ? "Unable to connect to the server"
          : "Failed to sign in. Please try again.");
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
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">
            Sign in to continue your learning journey
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="true"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="false"
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-text">
            Don't have an account?{" "}
            <a href="/signup" className="auth-link">
              Sign Up
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

export default SignIn;
