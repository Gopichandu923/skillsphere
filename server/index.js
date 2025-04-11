import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./database/connection.js";
import UserRoutes from "./routes/user.js";
import CoursesRotes from "./routes/courses.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
connect();

app.use(cors());
app.use(express.json());

app.use("/user", UserRoutes);
app.use("/courses", CoursesRotes);

const port = process.env.PORT_NO;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
