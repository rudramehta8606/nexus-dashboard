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
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid rgba(59, 130, 246, 0.2)', borderTopColor: '#3b82f6', borderRadius: '50%' }}></div>
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
          value="18 days" 
          change="4 days" 
          isPositive={false} 
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
            {[
              { title: 'Project "Echo" completed', time: '2h ago', status: 'success' },
              { title: 'New lead from contact form', time: '5h ago', status: 'info' },
              { title: 'Meeting scheduled with Acme Corp', time: '8h ago', status: 'warning' },
              { title: 'Payment received: $4,500', time: '12h ago', status: 'success' },
              { title: 'Review pending: Project Zephyr', time: '1d ago', status: 'warning' },
            ].map((activity, i) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
