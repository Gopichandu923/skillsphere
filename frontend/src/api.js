import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5153",
});

//courses
export const GetAllCourses = async () => await API.get("/courses/");

export const GetCourseById = async (id) => await API.get(`/course/id/${id}`);

export const GetRoadMap = async (query) =>
  await API.post(`/courses/roadmap/`, query);

export const GetQuestionsByCourse = async (id) =>
  await API.get(`/courses/questions/${id}`);

//user

export const SignUpUser = async (details) =>
  await API.post("/user/signup", details);
export const SignInUser = async (details) =>
  await API.post("/user/signin", details);
export const UserDetails = async (token) =>
  await API.get("/userdetails", { headers: { "auth-token": token } });

//chatbot

export const GetMessage = async (message) =>
  await API.post("/chatbot", { message });
