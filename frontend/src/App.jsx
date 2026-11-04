import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Facilities from './pages/Facilities';
import Notices from './pages/Notices';
import Contact from './pages/Contact';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';

/**
 * ScrollToTop component: Ensures every page route navigation resets scroll to the very top (0, 0).
 * Uses React Router's useLocation hook to accurately detect every route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Snap immediately to top of document on route navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    // Fallback for body/documentElement scroll containers
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'var(--color-ivory)',
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
