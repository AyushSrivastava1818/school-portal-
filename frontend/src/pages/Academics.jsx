import React, { useState } from 'react';
import { BookOpen, Check, Layers, Cpu, Compass, GraduationCap } from 'lucide-react';

export default function Academics() {
  const [activeTab, setActiveTab] = useState('science');

  const streamData = {
    science: {
      title: 'Senior Secondary Science Stream (Medical / Non-Medical)',
      desc: 'Suitable for students planning careers in Engineering, Medicine, Information Technology, Architecture, and Pure Sciences.',
      subjects: [
        'Physics (Theory and Practical Lab)',
        'Chemistry (Theory and Practical Lab)',
        'Mathematics or Biology',
        'Computer Science (Python & SQL)',
        'English Core',
        'Physical Education (Elective)',
      ],
      careers: 'Engineering (JEE), Medicine (NEET), Computer Applications (BCA/B.Tech), Pure Sciences, Architecture.',
    },
    commerce: {
      title: 'Senior Secondary Commerce Stream',
      desc: 'Suitable for students interested in Accounting, Finance, Business Management, Banking, and Economics.',
      subjects: [
        'Accountancy',
        'Business Studies',
        'Economics',
        'Applied Mathematics or Informatics Practices',
        'English Core',
        'Entrepreneurship / Physical Education',
      ],
      careers: 'Chartered Accountancy (CA), B.Com, BBA, Banking & Financial Analysis, Corporate Management.',
    },
    humanities: {
      title: 'Senior Secondary Humanities & Arts Stream',
      desc: 'Suitable for students planning careers in Civil Services, Law, Journalism, Design, Teaching, and Social Work.',
      subjects: [
        'History',
        'Political Science',
        'Economics / Sociology',
        'Psychology / Geography',
        'English Core',
        'Fine Arts / Physical Education',
      ],
      careers: 'Civil Services (UPSC), Law (CLAT), Journalism & Mass Media, Psychology, Teaching, Public Administration.',
    },
  };

  return (
    <div className="bg-ivory">
      {/* Header Banner */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(36, 50, 40, 0.8), rgba(42, 40, 36, 0.85)), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '80px 0 60px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <span className="eyebrow eyebrow-dark">Curriculum & Classes</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: '14px' }}>
            Academic Curriculum
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.88)' }}>
            CBSE-aligned curriculum from Class 1 to Class 12, focusing on conceptual understanding and real-world skills.
          </p>
        </div>
      </section>

      {/* Classes Offered Overview */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span className="eyebrow">Class Structure</span>
            <h2 className="section-title">Educational Levels</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Structured curriculum tailored to each developmental age group.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '56px',
            }}
          >
            {[
              {
                wing: 'Primary Wing',
                classes: 'Classes 1 to 5',
                focus: 'Reading, Arithmetic & Activity-Based Learning',
                detail: 'Builds strong basics in English, Hindi, Mathematics, Environmental Studies, Drawing, and Sports.',
              },
              {
                wing: 'Middle Wing',
                classes: 'Classes 6 to 8',
                focus: 'Conceptual Science & Social Studies',
                detail: 'Introduces hands-on science lab practicals, algebra, history, geography, and computer coding.',
              },
              {
                wing: 'Secondary Wing',
                classes: 'Classes 9 & 10',
                focus: 'CBSE Board Examination Preparation',
                detail: 'In-depth subject preparation in Mathematics, Science, Social Science, English, and Information Technology.',
              },
              {
                wing: 'Senior Secondary',
                classes: 'Classes 11 & 12',
                focus: 'Stream-Based Career Preparation',
                detail: 'Specialized streams in Science, Commerce, and Humanities with regular mock tests and practical exams.',
              },
            ].map((level, idx) => (
              <div key={idx} className="heritage-card">
                <span className="category-badge academic" style={{ marginBottom: '12px' }}>{level.classes}</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>{level.wing}</h3>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '10px' }}>
                  {level.focus}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.55 }}>{level.detail}</p>
              </div>
            ))}
          </div>

          {/* Interactive Senior Streams Showcase */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '36px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
              <div>
                <span className="eyebrow">Class 11 & 12 Streams</span>
                <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Choose Your Academic Stream</h3>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('science')}
                  className={`btn ${activeTab === 'science' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '8px 16px', fontSize: '0.86rem' }}
                >
                  Science
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('commerce')}
                  className={`btn ${activeTab === 'commerce' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '8px 16px', fontSize: '0.86rem' }}
                >
                  Commerce
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('humanities')}
                  className={`btn ${activeTab === 'humanities' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '8px 16px', fontSize: '0.86rem' }}
                >
                  Humanities
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.3rem', color: 'var(--color-burgundy)', marginBottom: '10px' }}>
                  {streamData[activeTab].title}
                </h4>
                <p style={{ fontSize: '0.94rem', lineHeight: 1.65, color: 'var(--color-charcoal-muted)', marginBottom: '20px' }}>
                  {streamData[activeTab].desc}
                </p>
                <div style={{ backgroundColor: 'var(--color-ivory)', padding: '14px 18px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-gold)' }}>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>Career Pathways: </strong>
                  <span style={{ fontSize: '0.86rem', color: 'var(--color-charcoal-muted)' }}>{streamData[activeTab].careers}</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#FAF7F2', padding: '22px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <h5 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-gold)', marginBottom: '14px' }}>
                  Subject Combinations
                </h5>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {streamData[activeTab].subjects.map((sub, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
                      <Check size={15} style={{ color: 'var(--color-forest)', flexShrink: 0 }} />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology Section */}
      <section className="section-spacing bg-forest">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span className="eyebrow eyebrow-dark">How We Teach</span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>Our Teaching Methodology</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Practical, student-centered learning methods that deliver strong academic results.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: <BookOpen size={26} />,
                title: 'Interactive Classroom Teaching',
                text: 'Teachers explain concepts clearly and encourage questions, group discussions, and daily problem-solving.',
              },
              {
                icon: <Cpu size={26} />,
                title: 'Practical Lab Sessions',
                text: 'Weekly experiments in science and computer labs help students verify theoretical principles firsthand.',
              },
              {
                icon: <Layers size={26} />,
                title: 'Regular Tests & Feedback',
                text: 'Unit tests, mock exams, and individual feedback help students identify areas for improvement early.',
              },
              {
                icon: <GraduationCap size={26} />,
                title: 'Individual Student Guidance',
                text: 'Remedial classes for students needing extra help and advanced coaching for competitive exams.',
              },
            ].map((method, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(182, 138, 80, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                }}
              >
                <div style={{ color: 'var(--color-gold-light)', marginBottom: '14px' }}>{method.icon}</div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', marginBottom: '8px' }}>{method.title}</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.88rem', lineHeight: 1.55 }}>{method.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
