import express from "express";
import { getChart } from "../controllers/chatbot.js";

const Route = express.Router();

Route.post("/", getChart);

export default Route;
