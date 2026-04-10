'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Briefcase, 
  Settings, 
  Layers, 
  TrendingUp, 
  User 
} from 'lucide-react';


const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/' },
  { icon: Briefcase, label: 'Portfolio', href: '/inventory' },
  { icon: Layers, label: 'Categories', href: '/categories' },
  { icon: TrendingUp, label: 'Revenue', href: '/revenue' },
  { icon: User, label: 'Clients', href: '/clients' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '40px', paddingLeft: '12px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Nexus.
        </h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.label} 
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isActive ? '#fff' : '#888',
                background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                transition: 'all 0.2s',
                fontWeight: isActive ? '600' : '400'
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', padding: '20px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <p style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '4px' }}>PRO PLAN</p>
        <p style={{ fontSize: '13px', color: '#888' }}>Unlock advanced insights and custom branding.</p>
      </div>
    </aside>
  );
}
