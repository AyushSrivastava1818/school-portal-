import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-charcoal)',
        color: '#FFFFFF',
        borderTop: '3px solid var(--color-gold)',
        paddingTop: '56px',
        paddingBottom: '28px',
      }}
    >
      <div className="container">
        {/* Main Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '36px',
            marginBottom: '40px',
          }}
        >
          {/* Column 1: School Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <img src="/logo.svg" alt="School Emblem" style={{ width: '40px', height: '40px' }} />
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                  St. Jude’s Academy
                </h4>
                <span style={{ color: 'var(--color-gold-light)', fontSize: '0.74rem', letterSpacing: '1px' }}>
                  ESTD. 1948 • CBSE AFFILIATED
                </span>
              </div>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Dedicated to academic excellence, student well-being, and character development for over seven decades.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-light)', fontSize: '0.82rem' }}>
              <ShieldCheck size={16} />
              <span>Affiliation No. 194801 • Code 08412</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                color: 'var(--color-gold-light)',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '16px',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'About Our School', path: '/about' },
                { label: 'Academic Curriculum', path: '/academics' },
                { label: 'School Facilities', path: '/facilities' },
                { label: 'School Notices', path: '/notices' },
                { label: 'Contact & Admissions', path: '/contact' },
                { label: 'Student Portal Login', path: '/student/login' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.88rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                  >
                    <ArrowRight size={13} style={{ color: 'var(--color-gold)' }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: School Wings */}
          <div>
            <h4
              style={{
                color: 'var(--color-gold-light)',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '16px',
              }}
            >
              Academic Divisions
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.86rem', marginBottom: '10px' }}>
              <strong>Primary Wing (Classes 1–5):</strong> Foundational literacy, numeracy, arts, and physical education.
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.86rem', marginBottom: '10px' }}>
              <strong>Middle Wing (Classes 6–8):</strong> Science labs, mathematics, social studies, and computing.
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.86rem' }}>
              <strong>Senior Secondary (Classes 9–12):</strong> Specialized Science, Commerce, and Humanities streams.
            </p>
          </div>

          {/* Column 4: Contact & Hours */}
          <div>
            <h4
              style={{
                color: 'var(--color-gold-light)',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '16px',
              }}
            >
              School Office
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>14 University Enclave, Institutional Area, New Delhi 110007</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <span>+91 (011) 2876-9040 / 41</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <span>office@stjudesacademy.edu</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>Mon – Fri: 8:00 AM – 3:30 PM<br />Sat: 8:30 AM – 1:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.82rem',
            color: 'rgba(255, 255, 255, 0.65)',
            gap: '10px',
          }}
        >
          <div>
            © {new Date().getFullYear()} St. Jude’s Academy. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span>B.Tech Web Development Lab Project</span>
            <span>•</span>
            <span>React + Flask + PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
