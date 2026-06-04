import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const TYPE_ICONS = { flight: '✈️', hotel: '🏨', activity: '🎯', transport: '🚌', meal: '🍽️', other: '📌' };

export default function SharedItinerary() {
  const { token } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/itinerary/share/${token}`)
      .then(res => setItinerary(res.data.itinerary))
      .catch(() => setError('This itinerary is not available or has been made private.'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
  );

  if (error) return (
    <div style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', padding: '16px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
      <h2 style={{ marginBottom: '8px' }}>Not Available</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{error}</p>
      <Link to="/" className="btn btn-primary">Go to Orbitra</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #2a1a4e)',
        borderRadius: '16px', padding: '36px', marginBottom: '28px', color: '#fff',
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Shared Itinerary
        </div>
        <h1 style={{ fontSize: '28px', color: '#e8a838', marginBottom: '8px' }}>{itinerary.title}</h1>
        {itinerary.summary && <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '12px' }}>{itinerary.summary}</p>}
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', flexWrap: 'wrap' }}>
          {itinerary.destination && <span>📍 {itinerary.destination}</span>}
          {itinerary.startDate && <span>📅 {itinerary.startDate} → {itinerary.endDate}</span>}
          <span>📋 {itinerary.days?.length} days</span>
        </div>
      </div>

      {/* Days */}
      {itinerary.days?.map((day) => (
        <div key={day.day} className="card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
            <span style={{
              background: 'var(--primary)', color: '#fff', borderRadius: '8px',
              padding: '4px 12px', fontSize: '13px', fontWeight: 600
            }}>Day {day.day}</span>
            <div>
              <div style={{ fontWeight: 600 }}>{day.title}</div>
              {day.date && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{day.date}</div>}
            </div>
          </div>

          {day.activities?.map((act, i) => (
            <div key={i} style={{
              display: 'flex', gap: '12px', padding: '10px 12px',
              marginBottom: '6px', background: 'var(--surface2)', borderRadius: '8px', alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '20px' }}>{TYPE_ICONS[act.type] || '📌'}</span>
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2px' }}>
                  {act.time && <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)' }}>{act.time}</span>}
                  <span className={`badge badge-${act.type || 'other'}`}>{act.type}</span>
                </div>
                <div style={{ fontSize: '13px' }}>{act.description}</div>
                {act.location && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>📍 {act.location}</div>}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Footer CTA */}
      <div className="card" style={{ textAlign: 'center', background: '#fffbf0', border: '1px solid #fdeab7' }}>
        <p style={{ marginBottom: '12px', fontSize: '14px' }}>Want to create your own AI travel itinerary?</p>
        <Link to="/register" className="btn btn-accent">Join Orbitra — It's Free</Link>
      </div>
    </div>
  );
}