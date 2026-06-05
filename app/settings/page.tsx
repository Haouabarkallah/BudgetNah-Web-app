'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { CURRENCIES, LANGUAGES } from '@/lib/mock-data';
import { User, Globe, DollarSign, Shield, Check } from 'lucide-react';

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 mb-5">
        <Icon size={18} style={{ color: 'var(--accent)' }} />
        <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { currency, language, setCurrency, setLanguage } = useStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: persist to Supabase settings table
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Settings</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>Manage your preferences</p>

      <div className="space-y-6">
        {/* Currency */}
        <Section title="Currency" icon={DollarSign}>
          <div className="grid grid-cols-3 gap-3">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className="flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor: currency === c.code ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: currency === c.code ? 'var(--accent-light)' : 'var(--bg-secondary)',
                }}
              >
                <span className="text-xl font-bold" style={{ color: currency === c.code ? 'var(--accent)' : 'var(--text-primary)' }}>
                  {c.symbol}
                </span>
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{c.code}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.name}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Language */}
        <Section title="Language" icon={Globe}>
          <div className="grid grid-cols-2 gap-3">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className="flex items-center justify-between p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor: language === l.code ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: language === l.code ? 'var(--accent-light)' : 'var(--bg-secondary)',
                }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{l.name}</span>
                {language === l.code && <Check size={16} style={{ color: 'var(--accent)' }} />}
              </button>
            ))}
          </div>
        </Section>

        {/* Profile placeholder */}
        <Section title="Profile" icon={User}>
          <div className="space-y-4">
            {[['Full Name', 'text', 'Jean Dupont'], ['Email', 'email', 'jean@example.com']].map(([label, type, placeholder]) => (
              <div key={label as string}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
                <input
                  type={type as string}
                  placeholder={placeholder as string}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Security placeholder */}
        <Section title="Security" icon={Shield}>
          <div className="space-y-4">
            {['Current Password', 'New Password', 'Confirm Password'].map((label) => (
              <div key={label}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Save */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: saved ? 'var(--success)' : 'var(--accent)' }}
        >
          {saved && <Check size={16} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}