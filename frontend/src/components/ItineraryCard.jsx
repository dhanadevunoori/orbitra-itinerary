import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const TYPE_ICONS = { flight: '✈️', hotel: '🏨', activity: '🎯', transport: '🚌', meal: '🍽️', other: '📌' };

export default function ItineraryCard({ itinerary, onDelete, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [copying, setCopying] = useState(false);

  const shareUrl = `${window.location.origin}/share/${itinerary.shareToken}`;

  const copyShareLink = async () => {
    setCopying(true);
    await navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied!');
    setTimeout(() => setCopying(false), 1500);
  };

  const handleToggleVisibility = async () => {
    try {
      const res = await api.patch(`/itinerary/${itinerary._id}/visibility`);
      onUpdate(res.data.itinerary);
      toast.success(res.data.itinerary.isPublic ? 'Itinerary is now public' : 'Itinerary is now private');
    } catch { toast.error('Failed to update visibility'); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this itinerary?')) return;
    try {
      await api.delete(`/itinerary/${itinerary._id}`);
      onDelete(itinerary._id);
      toast.success('Itinerary deleted');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '22px' }}>🗺️</span>
            <h3 style={{ fontSize: '18px' }}>{itinerary.title}</h3>
            <span style={{
              fontSize: '11px', padding: '2px 8px', borderRadius: '12px',
              background: itinerary.isPublic ? '#e8f8f5' : '#fef9e7',
              color: itinerary.isPublic ? '#1abc9c' : '#d4ac0d', fontWeight: 500
            }}>
              {itinerary.isPublic ? '🔓 Public' : '🔒 Private'}
            </span>
          </div>
          {itinerary.summary && (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>{itinerary.summary}</p>
          )}
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
            {itinerary.destination && <span>📍 {itinerary.destination}</span>}
            {itinerary.startDate && <span>📅 {itinerary.startDate} → {itinerary.endDate}</span>}
            <span>📋 {itinerary.days?.length || 0} days</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button className="btn btn-ghost" onClick={copyShareLink} style={{ fontSize: '12px', padding: '6px 12px' }}>
            {copying ? '✓ Copied' : '🔗 Share'}
          </button>
          <button className="btn btn-ghost" onClick={handleToggleVisibility} style={{ fontSize: '12px', padding: '6px 12px' }}>
            {itinerary.isPublic ? '🔒 Make Private' : '🔓 Make Public'}
          </button>
          <button className="btn btn-ghost" onClick={() => setExpanded(e => !e)} style={{ fontSize: '12px', padding: '6px 12px' }}>
            {expanded ? '▲ Less' : '▼ View'}
          </button>
          <button className="btn btn-danger" onClick={handleDelete} style={{ fontSize: '12px', padding: '6px 12px' }}>
            🗑
          </button>
        </div>
      </div>

      {/* Expanded days */}
      {expanded && itinerary.days?.length > 0 && (
        <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          {itinerary.days.map((day) => (
            <div key={day.day} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{
                  background: 'var(--primary)', color: '#fff', borderRadius: '50%',
                  width: '28px', height: '28px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '13px', fontWeight: 600, flexShrink: 0
                }}>{day.day}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{day.title}</div>
                  {day.date && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{day.date}</div>}
                </div>
              </div>

              <div style={{ marginLeft: '38px' }}>
                {day.activities?.map((act, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                    padding: '8px 12px', marginBottom: '6px',
                    background: 'var(--surface2)', borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '18px', flexShrink: 0 }}>{TYPE_ICONS[act.type] || '📌'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {act.time && <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)' }}>{act.time}</span>}
                        <span className={`badge badge-${act.type || 'other'}`}>{act.type}</span>
                      </div>
                      <div style={{ fontSize: '13px', marginTop: '2px' }}>{act.description}</div>
                      {act.location && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>📍 {act.location}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}