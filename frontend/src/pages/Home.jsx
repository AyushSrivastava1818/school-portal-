import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Trophy, 
  Building2, 
  Calendar, 
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { getLatestNotices } from '../services/api';
import NoticeCard from '../components/NoticeCard';

export default function Home() {
  const [latestNotices, setLatestNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingNotices(true);
        const res = await getLatestNotices();
        if (res.success && res.data) {
          setLatestNotices(res.data);
        }
      } catch (err) {
        console.error('Failed to load notices:', err);
      } finally {
        setLoadingNotices(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `linear-gradient(rgba(36, 50, 40, 0.75), rgba(42, 40, 36, 0.85)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
        }}
      >
        <div className="container" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
          <div style={{ maxWidth: '760px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                backgroundColor: 'rgba(182, 138, 80, 0.25)',
                border: '1px solid var(--color-gold)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-gold-light)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Affiliated to CBSE • Established 1948
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.18,
                marginBottom: '20px',
              }}
            >
              Empowering Students to Learn, Lead, and Succeed
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '32px',
                maxWidth: '640px',
              }}
            >
              Providing quality education from primary through senior secondary. We nurture curiosity, discipline, and character in a modern, welcoming campus.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-primary" style={{ padding: '13px 26px', fontSize: '0.96rem' }}>
                Explore School <ArrowRight size={17} />
              </Link>
              <Link to="/contact" className="btn btn-outline-white" style={{ padding: '13px 26px', fontSize: '0.96rem' }}>
                Admission Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PRINCIPAL'S WELCOME SECTION
          ========================================================================= */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Principal Photo */}
            <div>
              <div style={{ position: 'relative', maxWidth: '440px', margin: '0 auto' }}>
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Principal Dr. Eleanor Vance"
                  style={{
                    width: '100%',
                    height: '420px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(36, 50, 40, 0.92)',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '4px solid var(--color-gold)',
                    color: '#FFFFFF',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700 }}>
                    Dr. Eleanor Vance, Ph.D.
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-light)' }}>
                    Principal & Head of School
                  </div>
                </div>
              </div>
            </div>

            {/* Principal's Message */}
            <div>
              <span className="eyebrow">Welcome Note</span>
              <h2 className="section-title">
                A Message from the Principal
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '16px' }}>
                Welcome to St. Jude’s Academy. For more than 75 years, our school has provided a safe and supportive learning environment where students are inspired to do their best.
              </p>
              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--color-charcoal-muted)', marginBottom: '24px' }}>
                Our goal is to prepare young learners not just for examinations, but for life. With strong academic coaching, modern science and computer laboratories, and active sports programs, we help every child discover their strengths and develop good character.
              </p>
              <Link to="/about" className="btn btn-secondary">
                Learn More About Our School <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE US
          ========================================================================= */}
      <section className="section-spacing bg-forest">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span className="eyebrow eyebrow-dark">Our Strengths</span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              Why Choose St. Jude’s Academy
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem' }}>
              We combine balanced academics with modern facilities and dedicated student care.
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
                icon: <Users size={26} />,
                title: 'Experienced Faculty',
                description: 'Our qualified teachers provide personal attention and continuous academic support to every student.',
              },
              {
                icon: <BookOpen size={26} />,
                title: 'Modern Classrooms & Labs',
                description: 'Interactive smart boards, dedicated science laboratories, and high-speed computer centers.',
              },
              {
                icon: <Trophy size={26} />,
                title: 'Sports & Co-Curriculars',
                description: 'Spacious sports grounds for football, cricket, athletics, plus debate, arts, and music clubs.',
              },
              {
                icon: <GraduationCap size={26} />,
                title: 'Quality Academic Results',
                description: 'Consistent 100% board examination pass records with personalized guidance for college entrance exams.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(182, 138, 80, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px 20px',
                }}
              >
                <div
                  className="icon-container"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-gold)',
                    color: 'var(--color-charcoal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    cursor: 'pointer',
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. ACADEMIC HIGHLIGHTS
          ========================================================================= */}
      <section className="section-spacing bg-ivory-soft">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <span className="eyebrow">Academic Curriculum</span>
              <h2 className="section-title">Academic Wings & Classes</h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>
                From primary foundations to senior board examinations.
              </p>
            </div>
            <Link to="/academics" className="btn btn-secondary">
              View Full Syllabus <ArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <div className="heritage-card">
              <span className="category-badge academic" style={{ marginBottom: '14px' }}>Grades 1 to 5</span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Primary School</h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                Focuses on foundational reading, writing, practical arithmetic, creative arts, and basic science inquiry.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.86rem', color: 'var(--color-charcoal-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>✓ Activity-based learning and reading circles</li>
                <li>✓ Basic computer and digital literacy</li>
                <li>✓ Physical education, arts, and craft</li>
              </ul>
            </div>

            <div className="heritage-card" style={{ borderTop: '4px solid var(--color-burgundy)' }}>
              <span className="category-badge event" style={{ marginBottom: '14px' }}>Grades 6 to 8</span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Middle School</h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                Introduces formal laboratory experiments, mathematics problem-solving, social sciences, and languages.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.86rem', color: 'var(--color-charcoal-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>✓ Science lab sessions (Physics, Chemistry, Biology)</li>
                <li>✓ Computer programming fundamentals</li>
                <li>✓ Extracurricular debate and sports tournaments</li>
              </ul>
            </div>

            <div className="heritage-card">
              <span className="category-badge sports" style={{ marginBottom: '14px' }}>Grades 9 to 12</span>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Secondary & Senior Secondary</h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                Complete preparation for CBSE board examinations and specialized streams in Science, Commerce, and Arts.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.86rem', color: 'var(--color-charcoal-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>✓ Specialized Science, Commerce, and Humanities streams</li>
                <li>✓ Regular mock exams, tests, and academic tracking</li>
                <li>✓ Career guidance and entrance exam preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SCHOOL FACILITIES PREVIEW
          ========================================================================= */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px' }}>
            <span className="eyebrow">Campus Life</span>
            <h2 className="section-title">School Facilities</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Equipped with modern resources to support academic and physical development.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '22px',
              marginBottom: '32px',
            }}
          >
            {[
              {
                title: 'School Library',
                desc: 'Over 15,000 reference books, encyclopedias, newspapers, and quiet study areas.',
                img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Science Laboratories',
                desc: 'Safe, fully equipped labs for Physics, Chemistry, and Biology experiments.',
                img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Computer Laboratory',
                desc: 'Modern computers with high-speed internet and standard coding software.',
                img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Sports Grounds',
                desc: 'Dedicated grounds for cricket, football, running track, and basketball courts.',
                img: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
              },
            ].map((facility, idx) => (
              <div key={idx} className="heritage-card" style={{ padding: 0, overflow: 'hidden' }}>
                <img
                  src={facility.img}
                  alt={facility.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{ padding: '18px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>{facility.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.5 }}>
                    {facility.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/facilities" className="btn btn-secondary">
              View All Facilities <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. LATEST ANNOUNCEMENTS (DYNAMIC POSTGRESQL DATA)
          ========================================================================= */}
      <section className="section-spacing bg-ivory-soft" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '36px',
            }}
          >
            <div>
              <span className="eyebrow">Notice Board</span>
              <h2 className="section-title">Latest Announcements</h2>
              <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.96rem' }}>
                Official circulars and announcements from the school office.
              </p>
            </div>
            <Link to="/notices" className="btn btn-secondary">
              View All Notices <ArrowRight size={15} />
            </Link>
          </div>

          {loadingNotices ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="spinner" />
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Loading notices...</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {latestNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          7. UPCOMING EVENTS
          ========================================================================= */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span className="eyebrow">Calendar</span>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Key dates for upcoming events and school activities.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                date: 'NOV 18, 2026',
                title: 'Annual School Cultural Day',
                location: 'Main School Auditorium',
                description: 'Performances by students including drama, choir, classical dance, and art displays.',
              },
              {
                date: 'DEC 04, 2026',
                title: 'Annual Sports Day',
                location: 'School Sports Complex',
                description: 'Track and field events, sprint races, inter-house relays, and prize distribution.',
              },
              {
                date: 'DEC 12, 2026',
                title: 'Inter-School Science Fair',
                location: 'Science & Computer Wing',
                description: 'Exhibition of working science models, coding projects, and environmental displays.',
              },
            ].map((event, idx) => (
              <div
                key={idx}
                className="heritage-card"
                style={{
                  display: 'flex',
                  gap: '16px',
                  borderLeft: '4px solid var(--color-burgundy)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-burgundy-subtle)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    height: 'fit-content',
                    minWidth: '80px',
                    textAlign: 'center',
                  }}
                >
                  <Calendar size={18} style={{ color: 'var(--color-burgundy)', marginBottom: '4px' }} />
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                    {event.date}
                  </span>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{event.title}</h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '6px' }}>
                    {event.location}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.5 }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
