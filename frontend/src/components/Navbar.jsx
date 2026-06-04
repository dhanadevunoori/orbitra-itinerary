import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: '#1a1a2e', color: '#fff', padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '60px', position: 'sticky', top: 0, zIndex: 100,
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }}>
      <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>✈️</span>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#e8a838' }}>
          Orbitra
        </span>
      </Link>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/upload', label: '+ New Trip' },
            { path: '/history', label: 'History' },
          ].map(({ path, label }) => (
            <Link key={path} to={path} style={{
              padding: '6px 14px', borderRadius: '6px', fontSize: '14px',
              background: isActive(path) ? 'rgba(232,168,56,0.15)' : 'transparent',
              color: isActive(path) ? '#e8a838' : 'rgba(255,255,255,0.7)',
              transition: 'all 0.2s',
            }}>{label}</Link>
          ))}
          <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 4px' }}>|</span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{user.name}</span>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.15)' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}