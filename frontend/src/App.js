import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Courses from "./pages/Courses.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import Navbar from "./components/Navbar";
import CourseDetails from "./components/CourseDetails.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="courses/:id" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
