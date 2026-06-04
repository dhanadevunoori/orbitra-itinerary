import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ItineraryCard from '../components/ItineraryCard';
import api from '../api/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/itinerary')
      .then(res => setItineraries(res.data.itineraries))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => setItineraries(prev => prev.filter(i => i._id !== id));
  const handleUpdate = (updated) => setItineraries(prev => prev.map(i => i._id === updated._id ? updated : i));

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2a1a4e 100%)',
        borderRadius: '16px', padding: '40px', marginBottom: '32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: '#fff', flexWrap: 'wrap', gap: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '28px', color: '#e8a838', marginBottom: '8px' }}>
            Good day, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
            Upload your travel documents and let AI generate your itinerary.
          </p>
        </div>
        <Link to="/upload" className="btn btn-accent" style={{ padding: '12px 24px', fontSize: '15px', fontWeight: 600 }}>
          ✈️ New Trip
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Trips', value: itineraries.length, icon: '🗺️' },
          { label: 'Public Trips', value: itineraries.filter(i => i.isPublic).length, icon: '🔓' },
          { label: 'Days Planned', value: itineraries.reduce((sum, i) => sum + (i.days?.length || 0), 0), icon: '📅' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>{value}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Itineraries */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px' }}>Recent Itineraries</h2>
        {itineraries.length > 0 && <Link to="/history" style={{ fontSize: '14px', color: 'var(--accent)' }}>View all →</Link>}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
      ) : itineraries.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '64px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
          <h3 style={{ marginBottom: '8px' }}>No itineraries yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Upload your travel documents to get started.</p>
          <Link to="/upload" className="btn btn-primary">Upload Documents</Link>
        </div>
      ) : (
        itineraries.slice(0, 3).map(it => (
          <ItineraryCard key={it._id} itinerary={it} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))
      )}
    </div>
  );
}