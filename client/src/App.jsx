import { Routes, Route } from "react-router-dom";

// import Components
import Navbar from "./components/navigators/Navbar";
import Footer from "./components/navigators/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

// import Public Pages
import Home from "./pages/Home";
import Contact from "./pages/contact/Contact";
import AuthPage from "./pages/AuthPage";

// import Protected Pages
import Dashboard from "./pages/Dashboard";
import NotAuthorized from "./pages/NotAuthorized";
import SinglePost from "./pages/posts/SinglePost";
import CreatePost from "./pages/posts/CreatePost";
import EditPost from "./pages/posts/EditPost";
import CreateUser from "./pages/users/CreateUser";
import UsersList from "./pages/users/UsersList";
import Categories from "./pages/category/Categories";
import ContactQueries from "./pages/contact/ContactQueries";

// import Static Pages
import HelpCenter from "./pages/static/HelpCenter";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import TermsConditions from "./pages/static/TermsConditions";
import FAQs from "./pages/static/FAQs";
import About from "./pages/static/About";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900">
      <Navbar />
      <main className="pt-16">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />


          {/* Protected Routes */}
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <SinglePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-post/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-user"
            element={
              <ProtectedRoute requiredRole="admin">
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requiredRole="admin">
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact-queries"
            element={
              <ProtectedRoute requiredRole="admin">
                <ContactQueries />
              </ProtectedRoute> 
            }
          />
          <Route path="/not-authorized" element={<NotAuthorized />} />


          {/* Static Pages */}
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/faqs" element={<FAQs />}></Route>
          <Route path="/about-us" element={<About />}></Route>
          <Route path="/contact-us" element={<Contact />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
