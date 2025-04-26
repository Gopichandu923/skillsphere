import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../.env" });

export const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("auth-token");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_PASS_JWT_TOKEN);

    // Initialize req.body if it's undefined
    req.body = req.body || {};

    // Attach user information to request
    req.user = decoded; // Standard practice to attach full user object
    req.body.email = decoded.email; // Also keep the email in body for backward compatibility

    // Continue to next middleware
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
