import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadSpinner";
import FloatingChatbot from "./components/FloatingChatbot";
import FloatingBackButton from "./components/FloatingBackButton";
import PageNotFound from "./components/PageNotFound";
import { UserProvider, useUser } from "./context/UserContext";
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
const Tests = lazy(() => import("./pages/Test.js"));

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

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public routes */}
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
                path="tests"
                element={
                  <DefaultLayout>
                    <Tests />
                  </DefaultLayout>
                }
              />

              {/* Auth routes */}
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

              {/* Protected routes */}

              <Route
                path="/chatbot"
                element={
                  <DefaultLayout>
                    <ProtectedRoute>
                      <Chatbot />
                    </ProtectedRoute>
                  </DefaultLayout>
                }
              />
              {/* 404 page */}
              <Route
                path="*"
                element={
                  <DefaultLayout>
                    <PageNotFound />
                  </DefaultLayout>
                }
              />
            </Routes>
            <FloatingBackButton />
            <FloatingChatbot />
          </Suspense>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
