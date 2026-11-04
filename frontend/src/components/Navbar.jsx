import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  GraduationCap, 
  User, 
  Phone, 
  Home, 
  Compass, 
  BookOpen, 
  Building2, 
  Bell, 
  PhoneCall, 
  LogOut,
  MapPin,
  Clock
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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
    setDrawerOpen(false); // Close drawer on route change
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('storage', checkAuth);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Escape key listener to close drawer
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home size={18} /> },
    { label: 'About Us', path: '/about', icon: <Compass size={18} /> },
    { label: 'Academics', path: '/academics', icon: <BookOpen size={18} /> },
    { label: 'Facilities', path: '/facilities', icon: <Building2 size={18} /> },
    { label: 'Notices', path: '/notices', icon: <Bell size={18} /> },
    { label: 'Contact', path: '/contact', icon: <PhoneCall size={18} /> },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('schoolhub_student');
    window.dispatchEvent(new Event('storage'));
    setDrawerOpen(false);
    navigate('/student/login');
  };

  return (
    <>
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
            </nav>

            {/* Action Buttons: Student Portal + Collapsible Menu Toggle */}
            <div className="nav-actions">
              {student ? (
                <Link to="/student/dashboard" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
                  <User size={15} />
                  <span>Portal ({student.name.split(' ')[0]})</span>
                </Link>
              ) : (
                <Link to="/student/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
                  <GraduationCap size={16} />
                  <span>Student Portal</span>
                </Link>
              )}

              {/* Prominent Collapsible Menu Button (Available on ALL screen sizes!) */}
              <button
                type="button"
                className="nav-menu-btn"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation drawer menu"
                aria-expanded={drawerOpen}
              >
                <Menu size={18} />
                <span>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          ANIMATED COLLAPSIBLE SIDE DRAWER
          ========================================================================= */}
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Side Panel */}
      <div
        className={`drawer-panel ${drawerOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.svg" alt="Crest" style={{ width: '36px', height: '36px' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-charcoal)' }}>
                St. Jude’s Academy
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Navigation Menu
              </div>
            </div>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body Links */}
        <div className="drawer-body">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            Main Pages
          </div>

          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              className={`drawer-link ${isActive(item.path) ? 'drawer-link-active' : ''}`}
            >
              <span className="drawer-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Student Portal Box inside Drawer */}
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: 'var(--color-ivory)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-burgundy)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Academic Portal
            </div>

            {student ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>
                  Signed in as <strong>{student.name}</strong><br />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
                    Roll: {student.roll_number} • {student.class_name}-{student.section}
                  </span>
                </div>
                <Link
                  to="/student/dashboard"
                  onClick={() => setDrawerOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '9px', fontSize: '0.88rem' }}
                >
                  <User size={15} /> Go to Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '8px', fontSize: '0.84rem' }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                  Access student attendance records and term exam marks.
                </p>
                <Link
                  to="/student/login"
                  onClick={() => setDrawerOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
                >
                  <GraduationCap size={16} /> Student Portal Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <MapPin size={15} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
              <span>14 University Enclave, New Delhi</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Phone size={15} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              <span>(011) 2876-9040</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Clock size={15} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
              <span>Office: Mon–Fri, 8:00 AM – 3:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
