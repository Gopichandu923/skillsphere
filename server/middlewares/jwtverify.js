import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config({ path: "../env" });

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(401).send("Access Denied. No token provided.");
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    req.body.email = decoded.email;
  } catch (err) {
    res.status(400).json({ message: err });
  }
  next();
};
