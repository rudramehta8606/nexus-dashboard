'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe,
  Save,
  Key,
  Smartphone,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
  ToggleRight,
  ToggleLeft,
  Mail,
  Slack,
  CreditCard
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Business Profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [dailySummary, setDailySummary] = useState(true);
  const [smartOnboarding, setSmartOnboarding] = useState(false);
  const { theme, setTheme, brandColor, setBrandColor } = useTheme();
  const [integrations, setIntegrations] = useState([
    { id: 'google', name: 'Google Workspace', desc: 'Sync calendar and contacts', connected: true, icon: Globe },
    { id: 'slack', name: 'Slack', desc: 'Send notifications to Slack channels', connected: false, icon: Globe },
    { id: 'stripe', name: 'Stripe', desc: 'Payment processing & invoicing', connected: true, icon: CreditCard }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(int => 
      int.id === id ? { ...int, connected: !int.connected } : int
    ));
  };

  const tabs = [
    { icon: User, label: 'Business Profile' },
    { icon: Shield, label: 'Security & Access' },
    { icon: Palette, label: 'Branding & UI' },
    { icon: Bell, label: 'Automations' },
    { icon: Globe, label: 'Integrations' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Global Settings</h1>
        <p style={{ color: '#888' }}>Manage your business profile, branding, and platform preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tabs.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setActiveTab(item.label)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '12px 16px', 
                borderRadius: '10px',
                background: activeTab === item.label ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: activeTab === item.label ? brandColor : '#888',
                cursor: 'pointer',
                fontWeight: activeTab === item.label ? '600' : '400',
                transition: 'all 0.2s ease',
              }}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ minHeight: '500px' }}>
          <h3 style={{ marginBottom: '24px', borderBottom: '1px solid var(--card-border)', paddingBottom: '16px' }}>
            {activeTab}
          </h3>

          {/* BUSINESS PROFILE TAB */}
          {activeTab === 'Business Profile' && (
            <div className="animate-fade-in" style={{ display: 'grid', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: `linear-gradient(135deg, ${brandColor}, #8b5cf6)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
                }}>
                  <span style={{ fontSize: '32px', fontWeight: 'bold' }}>RM</span>
                </div>
                <div style={{ flex: 1, display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gap: '4px' }}>
                    <label style={{ fontSize: '13px', color: '#666' }}>Company Legal Name</label>
                    <input type="text" defaultValue="Rudra Mehta Digital Solution" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: 'white', padding: '12px', borderRadius: '10px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gap: '4px' }}>
                    <label style={{ fontSize: '13px', color: '#666' }}>Public Email Address</label>
                    <input type="email" defaultValue="rudra@example.com" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: 'white', padding: '12px', borderRadius: '10px', outline: 'none' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'grid', gap: '4px' }}>
                  <label style={{ fontSize: '13px', color: '#666' }}>Base Currency</label>
                  <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: 'white', padding: '12px', borderRadius: '10px', outline: 'none' }}>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gap: '4px' }}>
                  <label style={{ fontSize: '13px', color: '#666' }}>Timezone</label>
                  <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: 'white', padding: '12px', borderRadius: '10px', outline: 'none' }}>
                    <option>UTC +05:30 (India)</option>
                    <option>UTC -05:00 (EST)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* SECURITY & ACCESS TAB */}
          {activeTab === 'Security & Access' && (
            <div className="animate-fade-in" style={{ display: 'grid', gap: '32px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Key size={18} className="text-blue-500" />
                  Password Management
                </h4>
                <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
                  <div style={{ display: 'grid', gap: '4px' }}>
                    <label style={{ fontSize: '13px', color: '#666' }}>Current Password</label>
                    <input type="password" placeholder="••••••••" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: 'white', padding: '12px', borderRadius: '10px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gap: '4px' }}>
                    <label style={{ fontSize: '13px', color: '#666' }}>New Password</label>
                    <input type="password" placeholder="••••••••" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: 'white', padding: '12px', borderRadius: '10px', outline: 'none' }} />
                  </div>
                  <button className="btn-primary" style={{ marginTop: '8px' }}>Update Password</button>
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--card-border)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Smartphone size={18} className="text-purple-500" />
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p style={{ color: '#888', fontSize: '13px' }}>Add an extra layer of security to your account.</p>
                </div>
                <div 
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  style={{ cursor: 'pointer', color: twoFactorEnabled ? '#10b981' : '#666' }}
                >
                  {twoFactorEnabled ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </div>
              </div>
            </div>
          )}

          {/* BRANDING & UI TAB */}
          {activeTab === 'Branding & UI' && (
            <div className="animate-fade-in" style={{ display: 'grid', gap: '32px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Platform Theme</h4>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {[
                    { id: 'light', icon: Sun, label: 'Light' },
                    { id: 'dark', icon: Moon, label: 'Dark' },
                    { id: 'system', icon: Monitor, label: 'System' }
                  ].map(t => (
                    <div 
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      style={{
                        flex: 1,
                        padding: '16px',
                        border: theme === t.id ? `2px solid ${brandColor}` : '1px solid var(--card-border)',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        background: theme === t.id ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                      }}
                    >
                      <t.icon size={24} color={theme === t.id ? brandColor : '#888'} />
                      <span style={{ fontSize: '14px', fontWeight: theme === t.id ? '600' : '400' }}>{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--card-border)' }} />

              <div style={{ display: 'grid', gap: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Primary Brand Color</h4>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map((color, i) => (
                    <div 
                      key={i}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: color,
                        cursor: 'pointer',
                        border: brandColor === color ? '3px solid white' : 'none',
                        boxShadow: brandColor === color ? `0 0 0 2px ${color}` : 'none'
                      }}
                      onClick={() => setBrandColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AUTOMATIONS TAB */}
          {activeTab === 'Automations' && (
            <div className="animate-fade-in" style={{ display: 'grid', gap: '24px' }}>
              <div style={{ 
                padding: '20px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--card-border)', 
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>Daily Summary Reports</h4>
                  <p style={{ color: '#888', fontSize: '13px' }}>Receive a daily digest of all new clients and revenue stats.</p>
                </div>
                <div 
                  onClick={() => setDailySummary(!dailySummary)}
                  style={{ cursor: 'pointer', color: dailySummary ? brandColor : '#666' }}
                >
                  {dailySummary ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </div>
              </div>

              <div style={{ 
                padding: '20px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--card-border)', 
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>Smart Client Onboarding</h4>
                  <p style={{ color: '#888', fontSize: '13px' }}>Automatically send welcome emails to newly added clients.</p>
                </div>
                <div 
                  onClick={() => setSmartOnboarding(!smartOnboarding)}
                  style={{ cursor: 'pointer', color: smartOnboarding ? brandColor : '#666' }}
                >
                  {smartOnboarding ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </div>
              </div>
            </div>
          )}

          {/* INTEGRATIONS TAB */}
          {activeTab === 'Integrations' && (
            <div className="animate-fade-in" style={{ display: 'grid', gap: '20px' }}>
              {integrations.map((int, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <int.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {int.name}
                        {int.connected && <CheckCircle2 size={14} className="text-green-500" />}
                      </h4>
                      <p style={{ color: '#888', fontSize: '13px' }}>{int.desc}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleIntegration(int.id)}
                    style={{ 
                      padding: '8px 16px', 
                      borderRadius: '8px', 
                      fontSize: '13px',
                      fontWeight: '500',
                      background: int.connected ? 'transparent' : 'white',
                      color: int.connected ? '#white' : 'black',
                      border: int.connected ? '1px solid var(--card-border)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {int.connected ? 'Manage' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
