import React from 'react';
import { Award, Compass, Heart, Shield, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-ivory">
      {/* Header Banner */}
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
          <span className="eyebrow eyebrow-dark">About St. Jude’s Academy</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: '14px' }}>
            Our History, Vision & Values
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.88)' }}>
            Providing quality education, values, and leadership development since 1948.
          </p>
        </div>
      </section>

      {/* Introduction & Vision/Mission */}
      <section className="section-spacing">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '44px',
              alignItems: 'center',
              marginBottom: '64px',
            }}
          >
            <div>
              <span className="eyebrow">Introduction</span>
              <h2 className="section-title">A Tradition of Academic Excellence</h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '16px' }}>
                St. Jude’s Academy is a co-educational day school affiliated with the Central Board of Secondary Education (CBSE). Set on a spacious 15-acre campus, we provide modern classrooms, well-maintained sports facilities, and advanced laboratories.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-charcoal-muted)' }}>
                Our teaching philosophy emphasizes conceptual clarity, honest effort, and active participation. We encourage students to ask questions, work collaboratively, and develop a sense of social responsibility.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                alt="Students collaborating"
                style={{
                  width: '100%',
                  height: '380px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-card)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  right: '16px',
                  backgroundColor: 'var(--color-burgundy)',
                  color: '#FFFFFF',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>78+</div>
                <div style={{ fontSize: '0.78rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Years of Service</div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <div className="heritage-card" style={{ borderTop: '4px solid var(--color-forest)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Compass size={24} style={{ color: 'var(--color-forest)' }} />
                <h3 style={{ fontSize: '1.3rem' }}>Our Vision</h3>
              </div>
              <p style={{ fontSize: '0.94rem', lineHeight: 1.6, color: 'var(--color-charcoal-muted)' }}>
                To nurture disciplined, knowledgeable, and responsible citizens who make positive contributions to society and succeed in their chosen careers.
              </p>
            </div>

            <div className="heritage-card" style={{ borderTop: '4px solid var(--color-burgundy)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Shield size={24} style={{ color: 'var(--color-burgundy)' }} />
                <h3 style={{ fontSize: '1.3rem' }}>Our Mission</h3>
              </div>
              <p style={{ fontSize: '0.94rem', lineHeight: 1.6, color: 'var(--color-charcoal-muted)' }}>
                To provide accessible, high-standard school education through qualified teachers, modern teaching aids, and opportunities in sports and cultural activities.
              </p>
            </div>

            <div className="heritage-card" style={{ borderTop: '4px solid var(--color-gold)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Heart size={24} style={{ color: 'var(--color-gold)' }} />
                <h3 style={{ fontSize: '1.3rem' }}>Core Values</h3>
              </div>
              <p style={{ fontSize: '0.94rem', lineHeight: 1.6, color: 'var(--color-charcoal-muted)' }}>
                Honesty, mutual respect, hard work, discipline, and compassion form the foundation of our student community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="section-spacing bg-forest">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span className="eyebrow eyebrow-dark">Milestones</span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>Our History & Growth</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Over seven decades of educational service and campus development.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              { year: '1948', title: 'School Founded', text: 'Started with 50 students and 5 teachers to serve the local community.' },
              { year: '1970', title: 'CBSE Affiliation', text: 'Received permanent senior secondary affiliation with the Central Board.' },
              { year: '1995', title: 'New Science Block', text: 'Built modern Physics, Chemistry, and Biology laboratory wings.' },
              { year: '2012', title: 'Computer & Smart Labs', text: 'Equipped classrooms with digital interactive displays and modern computing labs.' },
              { year: '2026', title: 'Present Day', text: 'Over 2,200 enrolled students and modern sports, art, and academic infrastructure.' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(182, 138, 80, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '22px 18px',
                }}
              >
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold-light)', fontWeight: 700, marginBottom: '6px' }}>
                  {item.year}
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.76)', fontSize: '0.86rem', lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Achievements */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span className="eyebrow">Achievements</span>
            <h2 className="section-title">School Achievements</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Recognitions earned by our students and teachers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                icon: <Award size={24} />,
                title: '100% Board Exam Results',
                desc: 'Consistently maintaining high distinction and pass percentages in Class 10 and 12 CBSE board exams.',
              },
              {
                icon: <Award size={24} />,
                title: 'Inter-School Science Champions',
                desc: 'Winners of the Regional Inter-School Science Fair for student-built solar and water management projects.',
              },
              {
                icon: <Award size={24} />,
                title: 'District Athletic Trophies',
                desc: 'Annual championship wins in inter-school football, badminton, and track and field meets.',
              },
              {
                icon: <Award size={24} />,
                title: 'Clean & Green School Award',
                desc: 'Recognized for eco-friendly campus initiatives, rainwater harvesting, and waste segregation.',
              },
            ].map((item, idx) => (
              <div key={idx} className="heritage-card">
                <div
                  className="icon-container"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-burgundy-subtle)',
                    color: 'var(--color-burgundy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
