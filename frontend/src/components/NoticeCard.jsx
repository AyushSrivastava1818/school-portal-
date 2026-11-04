import React from 'react';
import { Calendar, Tag } from 'lucide-react';

export default function NoticeCard({ notice }) {
  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'academic':
        return 'category-badge academic';
      case 'event':
        return 'category-badge event';
      case 'sports':
        return 'category-badge sports';
      default:
        return 'category-badge';
    }
  };

  return (
    <article
      className="heritage-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span className={getCategoryClass(notice.category)}>
            {notice.category || 'General'}
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: 'var(--color-charcoal-muted)',
            }}
          >
            <Calendar size={14} style={{ color: 'var(--color-gold)' }} />
            <span>{notice.formatted_date || notice.created_at?.slice(0, 10)}</span>
          </div>
        </div>

        <h3
          style={{
            fontSize: '1.28rem',
            marginBottom: '12px',
            color: 'var(--color-charcoal)',
            lineHeight: 1.35,
          }}
        >
          {notice.title}
        </h3>

        <p
          style={{
            fontSize: '0.94rem',
            lineHeight: 1.6,
            color: 'var(--color-charcoal-muted)',
          }}
        >
          {notice.description}
        </p>
      </div>

      <div
        style={{
          marginTop: '20px',
          paddingTop: '14px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'var(--color-gold)',
          fontWeight: 600,
        }}
      >
        <span>Official Notice Desk</span>
        <span>Ref #NOT-{notice.id}</span>
      </div>
    </article>
  );
}

