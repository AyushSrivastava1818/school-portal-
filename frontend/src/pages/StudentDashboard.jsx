import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Award, 
  CalendarCheck, 
  BookCheck, 
  Bell, 
  GraduationCap, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { getStudentResults, getStudentAttendance, getLatestNotices } from '../services/api';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('schoolhub_student');
    if (!saved) {
      navigate('/student/login');
      return;
    }

    const currentStudent = JSON.parse(saved);
    setStudent(currentStudent);

    async function fetchDashboardMetrics() {
      try {
        setLoading(true);
        setError(null);

        const [attRes, resRes, notRes] = await Promise.all([
          getStudentAttendance(currentStudent.id),
          getStudentResults(currentStudent.id),
          getLatestNotices(),
        ]);

        if (attRes.success) setAttendance(attRes.data);
        if (resRes.success) setResultsData(resRes);
        if (notRes.success) setNotices(notRes.data || []);
      } catch (err) {
        console.error('Dashboard load error:', err);
        setError('Could not fetch student records from database.');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardMetrics();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('schoolhub_student');
    window.dispatchEvent(new Event('storage'));
    navigate('/student/login');
  };

  if (!student) return null;

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: '60px' }}>
      {/* Top Banner with Student Info */}
      <section
        style={{
          backgroundColor: 'var(--color-charcoal)',
          color: '#FFFFFF',
          padding: '40px 0',
          borderBottom: '3px solid var(--color-gold)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            {/* Student Profile Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-burgundy)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--color-gold)',
                }}
              >
                <GraduationCap size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.76rem', color: 'var(--color-gold-light)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  Student Dashboard
                </span>
                <h1 style={{ fontSize: '1.75rem', color: '#FFFFFF', margin: '2px 0' }}>
                  {student.name}
                </h1>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.82)', flexWrap: 'wrap' }}>
                  <span><strong>Roll No:</strong> {student.roll_number}</span>
                  <span>•</span>
                  <span><strong>Class:</strong> {student.class_name} ({student.section})</span>
                  <span>•</span>
                  <span><strong>Session:</strong> 2026–2027</span>
                </div>
              </div>
            </div>

            {/* Logout Action */}
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-outline-white"
              style={{
                padding: '8px 16px',
                fontSize: '0.86rem',
              }}
            >
              <LogOut size={15} /> Log Out
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Dashboard Grid */}
      <section className="container" style={{ marginTop: '36px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <div className="spinner" />
            <p style={{ marginTop: '10px', fontSize: '0.92rem', color: 'var(--color-charcoal-muted)' }}>
              Loading student records...
            </p>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Row 1: Attendance & Summary */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {/* Attendance Indicator */}
              <div
                className="heritage-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderTop: '4px solid var(--color-forest)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CalendarCheck size={20} style={{ color: 'var(--color-forest)' }} />
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Attendance</h3>
                  </div>
                  <span
                    className="category-badge"
                    style={{
                      backgroundColor: attendance?.is_eligible_for_exams ? '#EBF5EE' : '#FDF2F2',
                      color: attendance?.is_eligible_for_exams ? '#1F5A34' : '#8C2222',
                      borderColor: attendance?.is_eligible_for_exams ? '#C4E2CC' : '#F6C8C8',
                    }}
                  >
                    {attendance?.status || 'Good Standing'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-forest)' }}>
                    {attendance?.percentage}%
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)' }}>
                    total attendance
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#EAE6DD',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '18px',
                  }}
                >
                  <div
                    style={{
                      width: `${attendance?.percentage || 0}%`,
                      height: '100%',
                      backgroundColor: 'var(--color-forest)',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '10px',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--color-border)',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>Working Days</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>{attendance?.total_days}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>Present</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-forest)' }}>{attendance?.present_days}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>Absent</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>{attendance?.absent_days}</div>
                  </div>
                </div>
              </div>

              {/* Overall Performance Metric */}
              <div
                className="heritage-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderTop: '4px solid var(--color-burgundy)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={20} style={{ color: 'var(--color-burgundy)' }} />
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Term Exam Marks</h3>
                  </div>
                  <span className="category-badge event">
                    Overall Result
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                    {resultsData?.summary?.percentage}%
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)' }}>
                    aggregate score
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--color-ivory)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <TrendingUp size={16} style={{ color: 'var(--color-gold)' }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    Overall Grade: {resultsData?.summary?.grade}
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--color-border)',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>Marks Obtained</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                      {resultsData?.summary?.total_obtained}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase' }}>Total Marks</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                      {resultsData?.summary?.total_maximum}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Subject-Wise Marks Table */}
            <div
              className="heritage-card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <BookCheck size={22} style={{ color: 'var(--color-burgundy)' }} />
                <div>
                  <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Subject-Wise Marks</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                    Official scores recorded for the latest terminal examinations.
                  </p>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: '2px solid var(--color-border)',
                        color: 'var(--color-charcoal-muted)',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      <th style={{ padding: '12px 14px' }}>Subject</th>
                      <th style={{ padding: '12px 14px' }}>Marks Scored</th>
                      <th style={{ padding: '12px 14px' }}>Max Marks</th>
                      <th style={{ padding: '12px 14px' }}>Percentage</th>
                      <th style={{ padding: '12px 14px' }}>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsData?.data?.map((item) => {
                      const pct = Math.round((parseFloat(item.marks) / parseFloat(item.total_marks)) * 100);
                      return (
                        <tr
                          key={item.id}
                          style={{
                            borderBottom: '1px solid var(--color-border)',
                            fontSize: '0.92rem',
                          }}
                        >
                          <td style={{ padding: '14px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                            {item.subject}
                          </td>
                          <td style={{ padding: '14px', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                            {item.marks}
                          </td>
                          <td style={{ padding: '14px', color: 'var(--color-charcoal-muted)' }}>
                            {item.total_marks}
                          </td>
                          <td style={{ padding: '14px' }}>
                            <span style={{ fontWeight: 600 }}>{pct}%</span>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <span
                              className="category-badge"
                              style={{
                                backgroundColor: pct >= 90 ? 'rgba(53, 72, 58, 0.1)' : 'rgba(182, 138, 80, 0.12)',
                                color: pct >= 90 ? 'var(--color-forest)' : '#8A642E',
                                borderColor: pct >= 90 ? 'rgba(53, 72, 58, 0.2)' : 'rgba(182, 138, 80, 0.25)',
                              }}
                            >
                              {pct >= 90 ? 'Distinction' : pct >= 80 ? 'First Class' : 'Pass'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Row 3: School Circulars */}
            <div
              className="heritage-card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Bell size={20} style={{ color: 'var(--color-gold)' }} />
                <div>
                  <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Recent School Notices</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                    Important notices and dates for students.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {notices.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '14px 18px',
                      backgroundColor: 'var(--color-ivory)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '4px solid var(--color-gold)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--color-charcoal)', marginBottom: '3px' }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)' }}>
                        {n.description}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                      {n.formatted_date || n.created_at?.slice(0, 10)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
