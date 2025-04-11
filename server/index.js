import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT_NO;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
