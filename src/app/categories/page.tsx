'use client';

import { useState, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { 
  Layers, 
  Layout, 
  Smartphone, 
  Globe,
  Palette
} from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function CategoriesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/business')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading Categories...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Categorical Distribution</h1>
        <p style={{ color: '#888' }}>Insights into project volume and value by service type.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '32px' }}>Value by Category</h3>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.categories.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid" style={{ gap: '16px' }}>
          {data.categories.map((category: any, i: number) => (
            <div key={i} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '2px', 
                  background: COLORS[i % COLORS.length] 
                }}></div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{category.name}</h4>
                  <p style={{ fontSize: '13px', color: '#666' }}>{category.count} projects total</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold', fontSize: '18px' }}>${category.value.toLocaleString()}</p>
                <p style={{ fontSize: '12px', color: '#3b82f6' }}>View All</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
