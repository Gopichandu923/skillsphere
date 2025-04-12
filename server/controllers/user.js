import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user
    const e_user = await user.findOne({ email });
    if (!e_user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, e_user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { email: email },
      process.env.SECRET_PASS_JWT_TOKEN,
      { expiresIn: "30d" }
    );

    res.status(200).json({ message: "Successfully signed in", token });
  } catch (err) {
    console.error("Internal server error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const SignUp = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    // Validate input
    if (!name || !email || !password || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user
    const nuser = await user.findOne({ email });
    if (nuser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const new_user = new user({
      name,
      email,
      password: hashedPassword,
      contact,
    });
    await new_user.save();

    res.status(201).json({ message: "User successfully signed up" });
  } catch (err) {
    console.error("Internal server error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetUserDetails = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user
    const e_user = await user.findOne({ email });
    if (!e_user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(e_user);
  } catch (err) {
    console.error("Internal server error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { SignIn, SignUp, GetUserDetails };
