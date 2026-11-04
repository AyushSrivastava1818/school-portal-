import React from 'react';
import FacilityCard from '../components/FacilityCard';

export default function Facilities() {
  const facilityData = [
    {
      title: 'School Central Library',
      description: 'A spacious and well-lit library housing over 15,000 curriculum textbooks, reference guides, magazines, daily newspapers, and quiet study reading tables.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Curriculum textbooks and reference collections for all classes',
        'Daily newspapers, educational periodicals, and monthly magazines',
        'Quiet study cubicles and dedicated reading room for students',
      ],
    },
    {
      title: 'Science Laboratories',
      description: 'Three dedicated laboratories for Physics, Chemistry, and Biology, equipped with modern equipment, safety apparatus, and demonstration workstations.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Physics lab with optical benches, electrical meters, and kits',
        'Chemistry lab with safe glassware, chemical reagents, and eyewash stations',
        'Biology lab with compound microscopes, human anatomy models, and slides',
      ],
    },
    {
      title: 'Computer Laboratory',
      description: 'Modern computing lab with 60 high-speed networked desktop computers, broadband internet connectivity, and programming environments.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Individual desktop computers for hands-on student practice',
        'Python, HTML/CSS, and SQL database learning software',
        'High-speed broadband internet with safe educational browsing filters',
      ],
    },
    {
      title: 'Sports Complex & Athletic Grounds',
      description: 'Spacious outdoor and indoor sports facilities promoting physical fitness, discipline, and teamwork under the guidance of trained physical education teachers.',
      image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Full-size grass football pitch and cricket practice nets',
        '400-meter running track and athletic jump pits',
        'Outdoor basketball court and indoor badminton arena',
      ],
    },
    {
      title: 'Smart Classrooms',
      description: 'Classrooms equipped with interactive digital smart boards and audio-visual displays to make complex topics engaging and easy to understand.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Touch-enabled interactive displays in all secondary classrooms',
        'Digital educational multimedia lessons aligned to the CBSE syllabus',
        'Comfortable ergonomic desks and well-ventilated rooms',
      ],
    },
    {
      title: 'School Auditorium',
      description: 'An 800-seat multi-purpose auditorium for school morning assemblies, inter-house debates, annual functions, and parent orientations.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Professional sound systems and stage lighting',
        'Air-conditioned hall with comfortable theater-style seating',
        'Venue for annual concerts, quiz competitions, and guest lectures',
      ],
    },
  ];

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
          <span className="eyebrow eyebrow-dark">School Infrastructure</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: '14px' }}>
            Campus Facilities
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.88)' }}>
            Providing safe, modern, and well-maintained facilities for student growth.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span className="eyebrow">Campus Infrastructure</span>
            <h2 className="section-title">Everything a Student Needs</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Explore our laboratories, library, and sporting facilities.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {facilityData.map((facility, idx) => (
              <FacilityCard
                key={idx}
                title={facility.title}
                description={facility.description}
                image={facility.image}
                highlights={facility.highlights}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
