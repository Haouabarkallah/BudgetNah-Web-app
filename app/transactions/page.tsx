'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORIES } from '@/lib/mock-data';
import { Plus, Trash2, X, Filter } from 'lucide-react';

export default function TransactionsPage() {
  const { transactions, addTransaction, deleteTransaction, currency } = useStore();
  const fmt = (n: number) => formatCurrency(n, currency);

  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ amount: '', type: 'expense', category: 'Food', description: '', date: new Date().toISOString().split('T')[0] });

  const filtered = transactions.filter(t => filter === 'all' || t.type === filter);

  const handleAdd = () => {
    if (!form.amount || !form.description) return;
    addTransaction({ ...form, amount: parseFloat(form.amount), type: form.type as 'income' | 'expense' });
    setModal(false);
    setForm({ amount: '', type: 'expense', category: 'Food', description: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Transactions</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{filtered.length} transactions</p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'income', 'expense'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
            style={{
              backgroundColor: filter === f ? 'var(--accent)' : 'var(--bg-card)',
              color: filter === f ? '#fff' : 'var(--text-secondary)',
              border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
              {['Description', 'Category', 'Date', 'Type', 'Amount', ''].map(h => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id}
                style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}
                className="hover:opacity-80 transition-opacity">
                <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t.description}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
                    {t.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{formatDate(t.date)}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                    style={{
                      backgroundColor: t.type === 'income' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                      color: t.type === 'income' ? 'var(--success)' : 'var(--danger)',
                    }}>
                    {t.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold"
                  style={{ color: t.type === 'income' ? 'var(--success)' : 'var(--danger)' }}>
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteTransaction(t.id)} className="opacity-40 hover:opacity-100 transition-opacity">
                    <Trash2 size={15} style={{ color: 'var(--danger)' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>No transactions found.</div>
        )}
      </div>

      {/* Add Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="w-full max-w-md rounded-2xl border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>New Transaction</h2>
              <button onClick={() => setModal(false)}><X size={20} style={{ color: 'var(--text-muted)' }} /></button>
            </div>
            <div className="space-y-4">
              {/* Type toggle */}
              <div className="flex rounded-lg p-1" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                {(['expense', 'income'] as const).map(tp => (
                  <button key={tp} onClick={() => setForm(f => ({ ...f, type: tp }))}
                    className="flex-1 py-2 rounded-md text-sm font-medium capitalize transition-all"
                    style={{ backgroundColor: form.type === tp ? (tp === 'income' ? 'var(--success)' : 'var(--danger)') : 'transparent', color: form.type === tp ? '#fff' : 'var(--text-secondary)' }}>
                    {tp}
                  </button>
                ))}
              </div>
              {[
                { label: 'Description', key: 'description', type: 'text', placeholder: 'e.g. Supermarket' },
                { label: 'Amount', key: 'amount', type: 'number', placeholder: '0' },
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
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Date</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <button onClick={handleAdd}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2"
                style={{ backgroundColor: 'var(--accent)' }}>
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}