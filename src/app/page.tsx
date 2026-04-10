'use client';

import { useEffect, useState } from 'react';
import MetricCard from '@/components/Dashboard/MetricCard';
import DashboardChart from '@/components/Dashboard/DashboardChart';
import { 
  Users, 
  DollarSign, 
  Briefcase, 
  Clock,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(resData => setData(resData))
      .catch(err => {
        console.error(err);
        setError("Unable to connect to the database. Please ensure your MONGODB_URI is correct and your IP is whitelisted in MongoDB Atlas.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid rgba(59, 130, 246, 0.2)', borderTopColor: '#3b82f6', borderRadius: '50%' }}></div>
    </div>
  );

  if (error) return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', textAlign: 'center', padding: '20px' }}>
      <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '16px', maxWidth: '400px' }}>
        <h3 style={{ marginBottom: '8px' }}>Connection Error</h3>
        <p style={{ fontSize: '14px' }}>{error}</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: '16px', background: '#ef4444', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Retry Integration</button>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Dashboard Overview</h1>
          <p style={{ color: '#888' }}>Welcome back, here's what's happening today.</p>
        </div>
        <Link href="/inventory" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} />
            Add New Project
          </button>
        </Link>
      </div>

      <div className="grid stats-grid" style={{ marginBottom: '40px' }}>
        <MetricCard 
          label="Total Revenue" 
          value={`$${data.summary.totalRevenue.toLocaleString()}`} 
          change="12.5%" 
          isPositive={true} 
          Icon={DollarSign} 
        />
        <MetricCard 
          label="Total Visitors" 
          value={data.summary.totalVisitors.toLocaleString()} 
          change="8.2%" 
          isPositive={true} 
          Icon={Users} 
          delay="0.1s"
        />
        <MetricCard 
          label="Active Projects" 
          value={data.summary.activeProjects} 
          change="2 new" 
          isPositive={true} 
          Icon={Briefcase} 
          delay="0.2s"
        />
        <MetricCard 
          label="Avg. Completion" 
          value={`${data.summary.avgCompletionDays || 0} days`} 
          change={data.summary.avgCompletionDays > 30 ? 'Overdue risks' : 'On track'} 
          isPositive={data.summary.avgCompletionDays <= 30} 
          Icon={Clock} 
          delay="0.3s"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <DashboardChart data={data.chartData} />
        
        <div className="glass-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Recent Activity</h3>
            <ArrowUpRight size={18} color="#666" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.recentActivity && data.recentActivity.length > 0 ? data.recentActivity.map((activity: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  marginTop: '6px',
                  background: activity.status === 'success' ? '#22c55e' : activity.status === 'warning' ? '#eab308' : '#3b82f6'
                }}></div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#eee' }}>{activity.title}</p>
                  <p style={{ fontSize: '12px', color: '#666' }}>{activity.time}</p>
                </div>
              </div>
            )) : (
              <p style={{ color: '#888', fontSize: '14px' }}>No recent activity securely captured.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
