'use client';

import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  Icon: LucideIcon;
  delay?: string;
}

export default function MetricCard({ label, value, change, isPositive, Icon, delay = '0s' }: MetricCardProps) {
  return (
    <div className="glass-card animate-fade-in" style={{ animationDelay: delay }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3b82f6' }}>
          <Icon size={24} />
        </div>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          padding: '4px 8px', 
          borderRadius: '20px', 
          background: isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: isPositive ? '#22c55e' : '#ef4444'
        }}>
          {isPositive ? '+' : ''}{change}
        </div>
      </div>
      
      <div>
        <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '4px', fontWeight: '500' }}>{label}</h3>
        <p style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.02em', fontFamily: 'var(--font-outfit)' }}>{value}</p>
      </div>
    </div>
  );
}
