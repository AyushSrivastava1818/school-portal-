import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle, KeyRound } from 'lucide-react';
import { loginStudent } from '../services/api';

export default function StudentLogin() {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!rollNumber.trim() || !password.trim()) {
      setErrorMessage('Please enter both your Roll Number and Password.');
      return;
    }

    try {
      setLoading(true);
      const res = await loginStudent(rollNumber.trim(), password.trim());
      if (res.success && res.student) {
        localStorage.setItem('schoolhub_student', JSON.stringify(res.student));
        window.dispatchEvent(new Event('storage'));
        navigate('/student/dashboard');
      } else {
        setErrorMessage(res.message || 'Invalid credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Unable to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (roll, pwd) => {
    setRollNumber(roll);
    setPassword(pwd);
  };

  return (
    <div
      className="bg-ivory"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Emblem & Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src="/logo.svg"
            alt="School Emblem"
            style={{ width: '56px', height: '56px', margin: '0 auto 12px' }}
          />
          <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Student Portal Login</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)' }}>
            Log in to view your attendance and examination marks.
          </p>
        </div>

        {/* Login Card */}
        <div
          className="heritage-card"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '32px',
            borderTop: '4px solid var(--color-burgundy)',
          }}
        >
          {errorMessage && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="rollNumber">
                Roll Number
              </label>
              <div style={{ position: 'relative' }}>
                <User
                  size={17}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-charcoal-muted)',
                  }}
                />
                <input
                  id="rollNumber"
                  type="text"
                  placeholder="e.g. SCH202601"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px', textTransform: 'uppercase' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={17}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-charcoal-muted)',
                  }}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem', marginTop: '6px' }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={16} /> Sign In
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box for Examiner */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '18px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '10px',
              }}
            >
              <KeyRound size={14} /> Demo Student Accounts (Click to Fill)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => quickFill('SCH202601', 'password123')}
                style={{
                  textAlign: 'left',
                  background: 'var(--color-ivory)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 10px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span><strong>Alexander Vance</strong> (Roll: SCH202601)</span>
                <span style={{ color: 'var(--color-burgundy)', fontWeight: 600 }}>Fill</span>
              </button>

              <button
                type="button"
                onClick={() => quickFill('SCH202602', 'password123')}
                style={{
                  textAlign: 'left',
                  background: 'var(--color-ivory)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 10px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span><strong>Sophia Montgomery</strong> (Roll: SCH202602)</span>
                <span style={{ color: 'var(--color-burgundy)', fontWeight: 600 }}>Fill</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
