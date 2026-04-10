'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  Archive
} from 'lucide-react';

export default function Inventory() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    value: '',
    status: 'In Progress',
    description: '',
    deadline: ''
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          value: Number(formData.value),
          deadline: new Date(formData.deadline)
        }),
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ name: '', client: '', value: '', status: 'In Progress', description: '', deadline: '' });
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to delete project'}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An unexpected error occurred while deleting the project.');
    }
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Portfolio Inventory</h1>
          <p style={{ color: '#888' }}>Manage your active and archived business projects.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} />
          Create New Entry
        </button>
      </div>

      <div className="glass-card" style={{ padding: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px', borderBottom: '1px solid var(--card-border)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: '#666' }} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..." 
              style={{ 
                width: '100%', 
                padding: '10px 10px 10px 40px', 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid var(--card-border)', 
                borderRadius: '10px',
                color: 'white',
                outline: 'none'
              }} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: 'transparent', border: '1px solid var(--card-border)', color: '#888', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <th style={{ padding: '16px 24px', color: '#666', fontWeight: '500', fontSize: '13px' }}>PROJECT NAME</th>
                <th style={{ padding: '16px 24px', color: '#666', fontWeight: '500', fontSize: '13px' }}>CLIENT</th>
                <th style={{ padding: '16px 24px', color: '#666', fontWeight: '500', fontSize: '13px' }}>STATUS</th>
                <th style={{ padding: '16px 24px', color: '#666', fontWeight: '500', fontSize: '13px' }}>VALUE</th>
                <th style={{ padding: '16px 24px', color: '#666', fontWeight: '500', fontSize: '13px' }}>DEADLINE</th>
                <th style={{ padding: '16px 24px', color: '#666', fontWeight: '500', fontSize: '13px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                   <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading projects...</td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No projects found. Create one to get started!</td>
                </tr>
              ) : filteredProjects.map((project) => (
                <tr key={project._id} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '16px 24px' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#eee' }}>{project.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{project.category}</div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#888' }}>{project.client}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      width: 'fit-content',
                      background: project.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : project.status === 'Archived' ? 'rgba(100, 100, 100, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                      color: project.status === 'Completed' ? '#22c55e' : project.status === 'Archived' ? '#888' : '#3b82f6'
                    }}>
                      {project.status === 'Completed' ? <CheckCircle2 size={14} /> : project.status === 'Archived' ? <Archive size={14} /> : <Clock size={14} />}
                      {project.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '600' }}>${project.value.toLocaleString()}</td>
                  <td style={{ padding: '16px 24px', color: '#888' }}>{new Date(project.deadline).toLocaleDateString()}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button 
                      onClick={() => deleteProject(project._id)}
                      style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', padding: '8px' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass-card animate-fade-in" style={{ width: '500px', maxWidth: '90vw' }}>
            <h2 style={{ marginBottom: '24px' }}>New Portfolio Project</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: '#888' }}>Project Name</label>
                <input 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  type="text" 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'grid', gap: '4px' }}>
                  <label style={{ fontSize: '13px', color: '#888' }}>Client</label>
                  <input 
                    required 
                    value={formData.client}
                    onChange={e => setFormData({...formData, client: e.target.value})}
                    type="text" 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} 
                  />
                </div>
                <div style={{ display: 'grid', gap: '4px' }}>
                  <label style={{ fontSize: '13px', color: '#888' }}>Project Value ($)</label>
                  <input 
                    required 
                    value={formData.value}
                    onChange={e => setFormData({...formData, value: e.target.value})}
                    type="number" 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} 
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'grid', gap: '4px' }}>
                  <label style={{ fontSize: '13px', color: '#888' }}>Deadline</label>
                  <input 
                    required 
                    value={formData.deadline}
                    onChange={e => setFormData({...formData, deadline: e.target.value})}
                    type="date" 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }} 
                  />
                </div>
                <div style={{ display: 'grid', gap: '4px' }}>
                  <label style={{ fontSize: '13px', color: '#888' }}>Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white' }}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: '#888' }}>Description</label>
                <textarea 
                  required 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={3} 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', padding: '12px', borderRadius: '8px', color: 'white', resize: 'none' }} 
                ></textarea>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Project</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--card-border)', color: 'white', borderRadius: '12px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </div>
  );
}
