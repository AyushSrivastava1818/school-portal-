import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function FacilityCard({ title, description, image, highlights = [] }) {
  return (
    <div
      className="heritage-card"
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to top, rgba(34, 48, 38, 0.75), transparent)',
          }}
        />
      </div>

      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3
            style={{
              fontSize: '1.35rem',
              marginBottom: '10px',
              color: 'var(--color-charcoal)',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--color-charcoal-muted)',
              lineHeight: 1.6,
              marginBottom: '18px',
            }}
          >
            {description}
          </p>
        </div>

        {highlights.length > 0 && (
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {highlights.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.84rem',
                  color: 'var(--color-charcoal-muted)',
                }}
              >
                <CheckCircle2 size={15} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

