import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Courses from "./pages/Courses.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import Navbar from "./components/Navbar.js";
import Explore from "./pages/Explore.js";
import CourseDetails from "./components/CourseDetails.js";
import Questions from "./components/Questions.js";
import Chatbot from "./pages/Chatbot.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/explore" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/questions/:id" element={<Questions />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
