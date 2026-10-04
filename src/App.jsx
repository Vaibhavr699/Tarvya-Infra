import "./App.css";
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PropertyDetails from "./pages/PropertyDetails";
import PropertyList from "./components/PropertyList";
import InteriorWork from "./pages/InteriorWork";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";
import TestimonialsPage from "./pages/Testimonials";

const AdminApp = lazy(() => import("./admin/AdminApp"));

function AppShell() {
  const isAdmin = useLocation().pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Header />}
      <main className="flex-grow">
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
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div className="min-h-screen" />}>
                <AdminApp />
              </Suspense>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">404 - Page Not Found</h1></div>} />
        </Routes>
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
