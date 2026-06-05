import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Goal, MOCK_TRANSACTIONS, MOCK_GOALS } from './mock-data';

type AppState = {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Settings
  currency: string;   // 'XAF' | 'EUR' | 'USD'
  language: string;   // 'en' | 'fr'
  setCurrency: (c: string) => void;
  setLanguage: (l: string) => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;

  // Goals
  goals: Goal[];
  addGoal: (g: Omit<Goal, 'id'>) => void;
  updateGoalSavings: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      currency: 'XAF',
      language: 'en',
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),

      transactions: MOCK_TRANSACTIONS,
      addTransaction: (t) =>
        set((s) => ({
          transactions: [
            { ...t, id: crypto.randomUUID() },
            ...s.transactions,
          ],
        })),
      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      goals: MOCK_GOALS,
      addGoal: (g) =>
        set((s) => ({
          goals: [...s.goals, { ...g, id: crypto.randomUUID() }],
        })),
      updateGoalSavings: (id, amount) =>
        set((s) => ({
          goals: s.goals.map((g) =>
            g.id === id
              ? { ...g, saved_amount: Math.min(g.saved_amount + amount, g.target_amount) }
              : g
          ),
        })),
      deleteGoal: (id) =>
        set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
    }),
    { name: 'budgetnah-store' }
  )
);