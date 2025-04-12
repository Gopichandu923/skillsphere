import express from "express";
import { SignIn, SignUp, GetUserDetails } from "../controllers/user.js";
import { verifyToken } from "../middlewares/jwtverify.js";

const Route = express.Router();

Route.post("/signin", SignIn);
Route.post("/signup", SignUp);
Route.get("/", verifyToken, GetUserDetails);

export default Route;
