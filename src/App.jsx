import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/interior" element={<InteriorWork />} />
            <Route path="/inquire" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Property Routes */}
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/office" element={<PropertyList type="office" />} />
            <Route path="/properties/retail" element={<PropertyList type="retail" />} />
            <Route path="/properties/industrial" element={<PropertyList type="industrial" />} />
            
            {/* Legal Routes */}
            <Route path="/privacy-policy" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Privacy Policy Page - Coming Soon</h1></div>} />
            <Route path="/terms" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Terms of Service Page - Coming Soon</h1></div>} />
            <Route path="/sitemap" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Sitemap Page - Coming Soon</h1></div>} />
            
            {/* 404 Route */}
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">404 - Page Not Found</h1></div>} />
          </Routes>
        </main>
        <Footer />
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
    </Router>
  );
}

export default App;
