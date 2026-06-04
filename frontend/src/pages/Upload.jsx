import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const ACCEPTED = { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] };

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((accepted) => {
    setFiles(prev => [...prev, ...accepted].slice(0, 5));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: ACCEPTED, maxFiles: 5, maxSize: 10 * 1024 * 1024,
    onDropRejected: () => toast.error('Invalid file. Use PDF or image under 10MB.'),
  });

  const removeFile = (index) => setFiles(prev => prev.filter((_, i) => i !== index));

  const handleUpload = async () => {
    if (files.length === 0) return toast.error('Please add at least one file');
    setLoading(true);
    const formData = new FormData();
    files.forEach(f => formData.append('documents', f));

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Itinerary generated!');
      navigate('/history', { state: { newId: res.data.itinerary._id } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '26px', marginBottom: '6px' }}>Upload Travel Documents</h2>
        <p style={{ color: 'var(--text-muted)' }}>Upload flight tickets, hotel bookings, or any travel document. AI will generate your itinerary automatically.</p>
      </div>

      {/* Dropzone */}
      <div {...getRootProps()} className="card" style={{
        border: `2px dashed ${isDragActive ? 'var(--accent)' : 'var(--border)'}`,
        background: isDragActive ? '#fffbf0' : 'var(--surface)',
        textAlign: 'center', padding: '56px 32px', cursor: 'pointer',
        transition: 'all 0.2s', marginBottom: '20px',
      }}>
        <input {...getInputProps()} />
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{isDragActive ? '📂' : '📤'}</div>
        <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>
          {isDragActive ? 'Drop files here' : 'Drag & drop your documents'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>
          or <span style={{ color: 'var(--accent)', fontWeight: 500 }}>click to browse</span>
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Supports: PDF, JPG, PNG, WEBP · Max 5 files · 10MB each
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>Selected files ({files.length}/5)</h4>
          {files.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 0', borderBottom: i < files.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: '20px' }}>{f.type === 'application/pdf' ? '📄' : '🖼️'}</span>
              <span style={{ flex: 1, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{(f.size / 1024).toFixed(0)} KB</span>
              <button onClick={() => removeFile(i)} style={{ background: 'none', color: 'var(--danger)', padding: '2px 6px', fontSize: '16px', lineHeight: 1, border: 'none', cursor: 'pointer' }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="card" style={{ background: '#f0f9ff', border: '1px solid #bee3f8', marginBottom: '20px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#2b6cb0' }}>💡 Tips for best results</h4>
        <ul style={{ paddingLeft: '16px', fontSize: '13px', color: '#4a5568', lineHeight: '1.8' }}>
          <li>Upload clear, readable documents</li>
          <li>Include flight tickets with times and dates</li>
          <li>Add hotel booking confirmations</li>
          <li>Multiple documents = richer itinerary</li>
        </ul>
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || files.length === 0}
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '16px', opacity: files.length === 0 ? 0.6 : 1 }}
      >
        {loading ? (
          <><span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px', marginRight: '8px' }} /> Generating itinerary...</>
        ) : '🤖 Generate AI Itinerary'}
      </button>
    </div>
  );
}