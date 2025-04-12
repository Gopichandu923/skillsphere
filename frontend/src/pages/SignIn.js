import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/SignIn.css";
import { SignInUser } from "../api";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Sanitize: trim whitespace for email
    const sanitizedValue = id === "email" ? value.trimStart() : value;
    setFormData((prev) => ({
      ...prev,
      [id]: sanitizedValue,
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    // Check for empty fields
    if (!email || !password) {
      return "All fields are required";
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Client-side validation
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
      const response = await SignInUser(formData);
      console.log("SignIn response:", response.data); // Optional: for debugging

      // Store token
      localStorage.setItem("skillnova-token", response.data.token);

      // Show success toast
      toast.success(response.data.message || "Successfully signed in!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      // Redirect to home
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      // Handle backend error messages
      const errorMessage =
        err.response?.data?.message ||
        (err.message === "Network Error"
          ? "Unable to connect to the server"
          : "Failed to sign in. Please try again.");
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
    <div className="login-container">
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
        <h2>Sign In</h2>
        <p>Access your SkillSphere account</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="extra">
          <p>
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
