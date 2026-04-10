'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ChartProps {
  data: { date: string, visits: number, revenue: number }[];
}

export default function DashboardChart({ data }: ChartProps) {
  return (
    <div className="glass-card animate-fade-in" style={{ animationDelay: '0.2s', height: '420px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Performance Overview</h2>
          <p style={{ fontSize: '14px', color: '#888' }}>Comparison of visits and projected revenue</p>
        </div>
        <select style={{ 
          background: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          color: 'white', 
          padding: '8px 12px', 
          borderRadius: '8px',
          outline: 'none'
        }}>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div style={{ width: '100%', height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#666', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(10, 10, 10, 0.9)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="visits" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVisits)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
