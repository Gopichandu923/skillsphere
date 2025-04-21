import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadSpinner.js";
import PageNotFound from "./components/PageNotFound";
import "./css/App.css";

// Lazy-loaded components for better performance
const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Explore = lazy(() => import("./pages/Explore"));
const CourseDetails = lazy(() => import("./components/CourseDetails"));
const Questions = lazy(() => import("./components/Questions"));
const Chatbot = lazy(() => import("./pages/Chatbot"));

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/questions/:id" element={<Questions />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
