import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactEnquiry } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessResponse(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitContactEnquiry(formData);
      if (res.success) {
        setSuccessResponse('Thank you! Your enquiry has been received. Our admissions team will contact you shortly.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage(err.message || 'Failed to submit enquiry. Please ensure backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory">
      {/* Banner */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(36, 50, 40, 0.8), rgba(42, 40, 36, 0.85)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '80px 0 60px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <span className="eyebrow eyebrow-dark">Get in Touch</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: '14px' }}>
            Contact & Admissions
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.88)' }}>
            Have questions about admissions or campus visits? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section-spacing">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
            }}
          >
            {/* Left Column: Contact Information & Map */}
            <div>
              <span className="eyebrow">School Information</span>
              <h2 className="section-title">Visit Our Campus</h2>
              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--color-charcoal-muted)', marginBottom: '28px' }}>
                Our admissions office is open Monday through Saturday for campus tours, prospectus requests, and parent consultations.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-burgundy-subtle)',
                      color: 'var(--color-burgundy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--color-charcoal)' }}>School Address</strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)' }}>
                      14 University Enclave, Institutional Area, New Delhi 110007
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-forest-subtle)',
                      color: 'var(--color-forest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--color-charcoal)' }}>Phone Numbers</strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)' }}>
                      Main Office: +91 (011) 2876-9040 | Admissions: +91 (011) 2876-9041
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(182, 138, 80, 0.15)',
                      color: 'var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--color-charcoal)' }}>Email Address</strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)' }}>
                      admissions@stjudesacademy.edu
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(42, 40, 36, 0.08)',
                      color: 'var(--color-charcoal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--color-charcoal)' }}>Visiting Hours</strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)' }}>
                      Monday – Friday: 8:00 AM – 3:30 PM | Saturday: 8:30 AM – 1:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Campus Map Embed */}
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-subtle)',
                  height: '210px',
                }}
              >
                <iframe
                  title="Campus Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14002.82586828551!2d77.2090212!3d28.6922883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd97d022b8f9%3A0x6b4f76d9e0344d18!2sUniversity%20of%20Delhi!5e0!3m2!1sen!2sin!4v1689234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div
              className="heritage-card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '36px',
              }}
            >
              <h3 style={{ fontSize: '1.45rem', marginBottom: '6px' }}>Admission Enquiry Form</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', marginBottom: '24px' }}>
                Fill out the details below. Our admissions desk will review your query and reply by email.
              </p>

              {successResponse && (
                <div className="alert alert-success">
                  <CheckCircle2 size={18} />
                  <span>{successResponse}</span>
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-error">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Sharma"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ramesh.sharma@gmail.com"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    Your Message / Grade applying for *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please specify child's name, class seeking admission into, and your queries..."
                    className="form-textarea"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                >
                  {submitting ? (
                    <>
                      <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                      Sending Enquiry...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
