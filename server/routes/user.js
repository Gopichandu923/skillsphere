import express from "express";
import { SignIn, SignUp } from "../controllers/user.js";

const Route = express.Router();

Route.post("/signin", SignIn);
Route.post("/signup", SignUp);

export default Route;
