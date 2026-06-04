import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItineraryCard from '../components/ItineraryCard';
import api from '../api/axios';

export default function History() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/itinerary')
      .then(res => setItineraries(res.data.itineraries))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => setItineraries(prev => prev.filter(i => i._id !== id));
  const handleUpdate = (updated) => setItineraries(prev => prev.map(i => i._id === updated._id ? updated : i));

  const filtered = itineraries.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.destination?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '26px' }}>Trip History</h2>
        <Link to="/upload" className="btn btn-primary">+ New Trip</Link>
      </div>

      <input
        type="text"
        placeholder="Search by destination or title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '24px', maxWidth: '400px' }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
          <p style={{ color: 'var(--text-muted)' }}>{search ? 'No results found.' : 'No itineraries yet.'}</p>
        </div>
      ) : (
        filtered.map(it => (
          <ItineraryCard key={it._id} itinerary={it} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))
      )}
    </div>
  );
}