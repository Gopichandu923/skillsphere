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

// Layout component for pages with Navbar and Footer
const DefaultLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="main-content">{children}</main>
    <Footer />
  </>
);

// Layout component for auth pages (without Navbar/Footer)
const AuthLayout = ({ children }) => (
  <main className="main-content">{children}</main>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Routes with default layout (Navbar + Footer) */}
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }
            />
            <Route
              path="/explore"
              element={
                <DefaultLayout>
                  <Explore />
                </DefaultLayout>
              }
            />
            <Route
              path="/courses"
              element={
                <DefaultLayout>
                  <Courses />
                </DefaultLayout>
              }
            />
            <Route
              path="/courses/:id"
              element={
                <DefaultLayout>
                  <CourseDetails />
                </DefaultLayout>
              }
            />
            <Route
              path="/questions/:id"
              element={
                <DefaultLayout>
                  <Questions />
                </DefaultLayout>
              }
            />
            <Route
              path="/chatbot"
              element={
                <DefaultLayout>
                  <Chatbot />
                </DefaultLayout>
              }
            />

            {/* Auth routes with minimal layout */}
            <Route
              path="/signin"
              element={
                <AuthLayout>
                  <SignIn />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout>
                  <SignUp />
                </AuthLayout>
              }
            />

            {/* 404 page - can choose which layout to use */}
            <Route
              path="*"
              element={
                <DefaultLayout>
                  <PageNotFound />
                </DefaultLayout>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
