'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { Plus, X, Target, Trash2 } from 'lucide-react';

function GoalCard({ goal, currency }: { goal: any; currency: string }) {
  const fmt = (n: number) => formatCurrency(n, currency);
  const pct = Math.round((goal.saved_amount / goal.target_amount) * 100);
  const { updateGoalSavings, deleteGoal } = useStore();
  const [adding, setAdding] = useState('');

  const done = goal.saved_amount >= goal.target_amount;

  return (
    <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{goal.emoji}</span>
          <div>
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{goal.name}</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Due {goal.deadline}</p>
          </div>
        </div>
        <button onClick={() => deleteGoal(goal.id)} className="opacity-30 hover:opacity-100 transition-opacity">
          <Trash2 size={15} style={{ color: 'var(--danger)' }} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
          <span>{fmt(goal.saved_amount)}</span>
          <span>{pct}%</span>
          <span>{fmt(goal.target_amount)}</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              backgroundColor: done ? 'var(--success)' : pct > 66 ? 'var(--accent)' : pct > 33 ? 'var(--warning)' : 'var(--danger)',
            }}
          />
        </div>
      </div>

      {done ? (
        <div className="text-center py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)' }}>
          🎉 Goal Reached!
        </div>
      ) : (
        <div className="flex gap-2 mt-4">
          <input
            type="number"
            placeholder="Add savings..."
            value={adding}
            onChange={e => setAdding(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
          <button
            onClick={() => { if (adding) { updateGoalSavings(goal.id, parseFloat(adding)); setAdding(''); } }}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default function GoalsPage() {
  const { goals, addGoal, currency } = useStore();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', target_amount: '', saved_amount: '0', deadline: '', emoji: '🎯' });

  const EMOJIS = ['🎯','💻','✈️','🚗','🏠','🛡️','📚','💍','🎓','💰'];

  const handleAdd = () => {
    if (!form.name || !form.target_amount || !form.deadline) return;
    addGoal({ ...form, target_amount: parseFloat(form.target_amount), saved_amount: parseFloat(form.saved_amount) });
    setModal(false);
    setForm({ name: '', target_amount: '', saved_amount: '0', deadline: '', emoji: '🎯' });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Goals</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{goals.length} savings goals</p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <Plus size={16} /> New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {goals.map(g => <GoalCard key={g.id} goal={g} currency={currency} />)}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
          <Target size={40} className="mx-auto mb-3 opacity-30" />
          <p>No goals yet. Create your first one!</p>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="w-full max-w-md rounded-2xl border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>New Goal</h2>
              <button onClick={() => setModal(false)}><X size={20} style={{ color: 'var(--text-muted)' }} /></button>
            </div>
            <div className="space-y-4">
              {/* Emoji picker */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {EMOJIS.map(e => (
                    <button key={e} onClick={() => setForm(f => ({ ...f, emoji: e }))}
                      className="w-10 h-10 rounded-lg text-xl flex items-center justify-center border-2 transition-all"
                      style={{ borderColor: form.emoji === e ? 'var(--accent)' : 'var(--border)', backgroundColor: form.emoji === e ? 'var(--accent-light)' : 'var(--bg-secondary)' }}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              {[
                { label: 'Goal Name', key: 'name', type: 'text', placeholder: 'e.g. New Laptop' },
                { label: 'Target Amount', key: 'target_amount', type: 'number', placeholder: '0' },
                { label: 'Already Saved', key: 'saved_amount', type: 'number', placeholder: '0' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
                  <input type={type} placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Deadline</label>
                <input type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <button onClick={handleAdd}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--accent)' }}>
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}