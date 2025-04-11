import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).json({ message: "All the fields are required" });
    }

    const e_user = await user.findOne({ email });
    if (!e_user) {
      if (password === e_user.password) {
        const token = jwt.sign(
          {
            email: email,
          },
          process.env.SECRET_PASS_JWT_TOKEN,
          { expiresIn: "30 days" }
        );
        res
          .status(200)
          .json({ message: "successfully signedin", token: token });
      } else {
        res.status(200).json({ message: "password incorrect" });
      }
    } else {
      res.status(200).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(`internal server error ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const SignUp = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    if (!email || !password || !name || !contact) {
      res.status(200).json({ message: "All the fields are required" });
    }
    const nuser = await user.findOne({ email });
    if (!nuser) {
      const new_user = new user({ name, email, password, password });
      new_user.save();
      res.status(201).json({ message: "user successfully Signup completed" });
    } else {
      res.status(200).json({ message: "user already exist" });
    }
  } catch (err) {
    console.log(`internal server error ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { SignIn, SignUp };
