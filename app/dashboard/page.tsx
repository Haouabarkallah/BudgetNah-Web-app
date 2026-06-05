'use client';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

function KpiCard({ label, value, icon: Icon, color, sub }: any) {
  return (
    <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{value}</p>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{sub}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { transactions, goals, currency } = useStore();
  const fmt = (n: number) => formatCurrency(n, currency);

  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance      = totalIncome - totalExpense;
  const totalSaved   = goals.reduce((s, g) => s + g.saved_amount, 0);

  // Pie chart: expenses by category
  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {});
  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));

  // Bar chart: last 5 transactions
  const barData = transactions.slice(0, 6).map(t => ({
    name: t.category,
    Amount: t.amount,
    type: t.type,
  }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>Your financial overview</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <KpiCard label="Balance"       value={fmt(balance)}       icon={Wallet}      color="var(--accent)"  sub="Current balance" />
        <KpiCard label="Total Income"  value={fmt(totalIncome)}   icon={TrendingUp}  color="var(--success)" sub="All time" />
        <KpiCard label="Total Expenses"value={fmt(totalExpense)}  icon={TrendingDown}color="var(--danger)"  sub="All time" />
        <KpiCard label="Goals Saved"   value={fmt(totalSaved)}    icon={Target}      color="var(--warning)" sub={`${goals.length} active goals`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-8">
        {/* Pie */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Expenses by Category</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {pieData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bar */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Transactions</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }} />
              <Bar dataKey="Amount" fill="var(--accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent transactions list */}
      <div className="rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Activity</h2>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {transactions.slice(0, 5).map(t => (
            <div key={t.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm"
                  style={{ backgroundColor: t.type === 'income' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)' }}>
                  {t.type === 'income' ? '↑' : '↓'}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t.description}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.category} · {t.date}</p>
                </div>
              </div>
              <span className="text-sm font-semibold"
                style={{ color: t.type === 'income' ? 'var(--success)' : 'var(--danger)' }}>
                {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}