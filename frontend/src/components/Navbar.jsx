import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, User, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const location = useLocation();

  // Helper to sync student session
  const checkAuth = () => {
    try {
      const stored = localStorage.getItem('schoolhub_student');
      setStudent(stored ? JSON.parse(stored) : null);
    } catch {
      setStudent(null);
    }
  };

  // Re-check authentication on route change or storage change
  useEffect(() => {
    checkAuth();
    setIsOpen(false); // Close mobile drawer when navigating
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('storage', checkAuth);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Academics', path: '/academics' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Notices', path: '/notices' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Top Notification Bar */}
      <div
        style={{
          backgroundColor: 'var(--color-forest)',
          color: '#FFFFFF',
          fontSize: '0.8rem',
          padding: '7px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span>Admissions Open for Academic Session 2026–27 | CBSE Affiliated</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={13} style={{ color: 'var(--color-gold-light)' }} />
            <span>Campus Helpline: (011) 2876-9040</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container">
        <div className="navbar-container">
          {/* Logo & School Name */}
          <Link to="/" className="navbar-brand">
            <img src="/logo.svg" alt="School Logo" style={{ width: '44px', height: '44px' }} />
            <div>
              <div className="navbar-brand-title">St. Jude’s Academy</div>
              <div className="navbar-brand-subtitle">Senior Secondary School • Estd. 1948</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop-menu">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Student Portal CTA */}
            {student ? (
              <Link to="/student/dashboard" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
                <User size={15} />
                Portal ({student.name.split(' ')[0]})
              </Link>
            ) : (
              <Link to="/student/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
                <GraduationCap size={16} />
                Student Portal
              </Link>
            )}
          </nav>

          {/* Collapsible Mobile Toggle Button */}
          <button
            type="button"
            className="nav-toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Collapsible Drawer for Tablet & Mobile */}
      <div className={`nav-mobile-drawer ${isOpen ? 'open' : ''}`}>
        {navLinks.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`nav-mobile-link ${isActive(item.path) ? 'nav-mobile-link-active' : ''}`}
          >
            {item.label}
          </Link>
        ))}

        <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-border)', marginTop: '4px' }}>
          {student ? (
            <Link
              to="/student/dashboard"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <User size={16} /> My Student Dashboard ({student.name})
            </Link>
          ) : (
            <Link
              to="/student/login"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <GraduationCap size={16} /> Student Portal Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
