import "./App.css";
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Seo from "./components/Seo";

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const PropertyList = lazy(() => import("./components/PropertyList"));
const InteriorWork = lazy(() => import("./pages/InteriorWork"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const TestimonialsPage = lazy(() => import("./pages/Testimonials"));
const AdminApp = lazy(() => import("./admin/AdminApp"));

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">Something went wrong</h1>
          <p className="text-gray-600 mb-6">Please refresh the page, or contact us if the problem continues.</p>
          <a href="/" className="btn-primary">Back to Home</a>
        </div>
      </div>
    );
  }
}

const PageFallback = () => (
  <div className="min-h-screen grid place-items-center">
    <div className="h-10 w-10 rounded-full border-4 border-brand-100 border-t-brand-700 animate-spin" />
  </div>
);

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <ErrorBoundary key={location.pathname}>
        <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/interior" element={<InteriorWork />} />
          <Route path="/inquire" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />

          {/* Property Routes */}
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/office" element={<PropertyList type="office" />} />
          <Route path="/properties/retail" element={<PropertyList type="retail" />} />
          <Route path="/properties/industrial" element={<PropertyList type="industrial" />} />

          {/* Legal Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* Admin */}
          <Route path="/admin/*" element={<><Seo title="Admin" noindex /><AdminApp /></>} />

          {/* 404 Route */}
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><Seo title="Page Not Found" noindex /><h1 className="text-2xl">404 - Page Not Found</h1></div>} />
        </Routes>
        </Suspense>
        </ErrorBoundary>
      </main>
      {!isAdmin && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
