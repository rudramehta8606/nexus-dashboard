'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign, 
  CreditCard,
  Target
} from 'lucide-react';
import MetricCard from '@/components/Dashboard/MetricCard';

export default function RevenuePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/business')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading Analytics...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Revenue Analytics</h1>
        <p style={{ color: '#888' }}>Deep dive into your portfolio's financial performance.</p>
      </div>

      <div className="grid stats-grid" style={{ marginBottom: '40px' }}>
        <MetricCard 
          label="Annual Projection" 
          value="$145,000" 
          change="15.2%" 
          isPositive={true} 
          Icon={TrendingUp} 
        />
        <MetricCard 
          label="Average Ticket" 
          value="$4,200" 
          change="5.2%" 
          isPositive={true} 
          Icon={DollarSign} 
          delay="0.1s"
        />
        <MetricCard 
          label="Pending Invoices" 
          value="$12,400" 
          change="3 pending" 
          isPositive={false} 
          Icon={CreditCard} 
          delay="0.2s"
        />
        <MetricCard 
          label="Revenue Target" 
          value="82%" 
          change="Q2 progress" 
          isPositive={true} 
          Icon={Target} 
          delay="0.3s"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px' }}>Revenue Growth (MoM)</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" axisLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis axisLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px' }}>Revenue Distribution</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.categories}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis axisLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
