import express from "express";
import dotenv from "dotenv";

import { connect } from "./database/connection.js";

dotenv.config();

const app = express();
connect();

const port = process.env.PORT_NO;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
