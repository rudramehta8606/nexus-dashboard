'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  ExternalLink,
  MoreHorizontal
} from 'lucide-react';

export default function ClientsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/business')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading CRM...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Client Management</h1>
        <p style={{ color: '#888' }}>Overview of all business partnerships and contributions.</p>
      </div>

      <div className="grid stats-grid" style={{ marginBottom: '40px' }}>
        <div className="glass-card">
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>Total Partners</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ fontSize: '28px' }}>{data.clients.length}</h2>
            <span style={{ fontSize: '12px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '2px 8px', borderRadius: '12px' }}>+2 this month</span>
          </div>
        </div>
        <div className="glass-card">
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>Top Client</p>
          <h2 style={{ fontSize: '24px' }}>{data.clients[0]?.name || 'N/A'}</h2>
        </div>
        <div className="glass-card">
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>Avg. Project Count</p>
          <h2 style={{ fontSize: '28px' }}>{(data.clients.reduce((acc: any, curr: any) => acc + curr.projectCount, 0) / data.clients.length).toFixed(1)}</h2>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--card-border)', textAlign: 'left' }}>
              <th style={{ padding: '20px 24px', color: '#666', fontSize: '12px', letterSpacing: '0.05em' }}>CLIENT NAME</th>
              <th style={{ padding: '20px 24px', color: '#666', fontSize: '12px', letterSpacing: '0.05em' }}>PROJECTS</th>
              <th style={{ padding: '20px 24px', color: '#666', fontSize: '12px', letterSpacing: '0.05em' }}>LIFETIME VALUE</th>
              <th style={{ padding: '20px 24px', color: '#666', fontSize: '12px', letterSpacing: '0.05em' }}>CONTACTS</th>
              <th style={{ padding: '20px 24px', color: '#666', fontSize: '12px', letterSpacing: '0.05em', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client: any, i: number) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #3b82f633, #8b5cf633)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3b82f6',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}>
                      {client.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: '500' }}>{client.name}</span>
                  </div>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ color: '#eee' }}>{client.projectCount} Projects</span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ fontWeight: '600', color: '#3b82f6' }}>${client.totalValue.toLocaleString()}</span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ padding: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}><Mail size={14} color="#666" /></div>
                    <div style={{ padding: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}><Phone size={14} color="#666" /></div>
                  </div>
                </td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: '#444', cursor: 'pointer' }}>
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
