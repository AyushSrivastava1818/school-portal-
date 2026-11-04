import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { getNotices } from '../services/api';
import NoticeCard from '../components/NoticeCard';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Academic', 'Event', 'Sports', 'General'];

  const loadNotices = async (category = 'all') => {
    try {
      setLoading(true);
      setError(null);
      const res = await getNotices(category);
      if (res.success && res.data) {
        setNotices(res.data);
      }
    } catch (err) {
      console.error('Error fetching notices:', err);
      setError('Unable to load notices from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices(selectedCategory);
  }, [selectedCategory]);

  const filteredNotices = notices.filter((n) => {
    const text = searchQuery.toLowerCase();
    return (
      n.title?.toLowerCase().includes(text) ||
      n.description?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh' }}>
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
          <span className="eyebrow eyebrow-dark">School Announcements</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: '14px' }}>
            Notices & Circulars
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.88)' }}>
            Official announcements, examination schedules, and campus notifications.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-spacing">
        <div className="container">
          {/* Controls Bar: Filter & Search */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '20px 24px',
              boxShadow: 'var(--shadow-subtle)',
              marginBottom: '32px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-charcoal)', marginRight: '4px' }}>
                <Filter size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? 'var(--color-burgundy)' : 'var(--color-border)',
                    backgroundColor: selectedCategory === cat ? 'var(--color-burgundy)' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-charcoal)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div style={{ position: 'relative', minWidth: '240px', flex: '1', maxWidth: '340px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-charcoal-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px', height: '40px', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* Results Display */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <div className="spinner" />
              <p style={{ marginTop: '12px', fontSize: '0.92rem', color: 'var(--color-charcoal-muted)' }}>
                Loading notices...
              </p>
            </div>
          ) : error ? (
            <div className="alert alert-error" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={() => loadNotices(selectedCategory)}
                className="btn btn-secondary"
                style={{ padding: '5px 12px', fontSize: '0.8rem' }}
              >
                <RefreshCw size={13} /> Retry
              </button>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '50px 20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>No notices found</h3>
              <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.9rem' }}>
                No records match your selected filter or search keyword.
              </p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.86rem', color: 'var(--color-charcoal-muted)', marginBottom: '18px' }}>
                Showing <strong>{filteredNotices.length}</strong> notice{filteredNotices.length !== 1 ? 's' : ''}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '22px',
                }}
              >
                {filteredNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
