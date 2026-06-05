export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string; // ISO string
};

export type Goal = {
  id: string;
  name: string;
  target_amount: number;
  saved_amount: number;
  deadline: string;
  emoji: string;
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', amount: 450000, type: 'income',  category: 'Salary',      description: 'Monthly salary',         date: '2025-06-01' },
  { id: '2', amount: 12000,  type: 'expense', category: 'Food',        description: 'Supermarket groceries',  date: '2025-06-02' },
  { id: '3', amount: 8500,   type: 'expense', category: 'Transport',   description: 'Taxi to work',           date: '2025-06-03' },
  { id: '4', amount: 75000,  type: 'income',  category: 'Freelance',   description: 'Web design project',    date: '2025-06-04' },
  { id: '5', amount: 25000,  type: 'expense', category: 'Utilities',   description: 'Electricity bill',      date: '2025-06-05' },
  { id: '6', amount: 15000,  type: 'expense', category: 'Food',        description: 'Restaurant dinner',     date: '2025-06-06' },
  { id: '7', amount: 50000,  type: 'expense', category: 'Rent',        description: 'Monthly rent',          date: '2025-06-07' },
  { id: '8', amount: 5000,   type: 'expense', category: 'Transport',   description: 'Moto-taxi rides',       date: '2025-06-08' },
  { id: '9', amount: 20000,  type: 'income',  category: 'Freelance',   description: 'Logo design',           date: '2025-06-09' },
  { id: '10',amount: 9000,   type: 'expense', category: 'Health',      description: 'Pharmacy',              date: '2025-06-10' },
];

export const MOCK_GOALS: Goal[] = [
  { id: '1', name: 'Emergency Fund',  target_amount: 500000, saved_amount: 320000, deadline: '2025-12-31', emoji: '🛡️' },
  { id: '2', name: 'New Laptop',      target_amount: 350000, saved_amount: 120000, deadline: '2025-09-01', emoji: '💻' },
  { id: '3', name: 'Vacation Trip',   target_amount: 200000, saved_amount: 200000, deadline: '2025-08-15', emoji: '✈️' },
  { id: '4', name: 'Car Down Payment',target_amount: 800000, saved_amount: 50000,  deadline: '2026-06-01', emoji: '🚗' },
];

export const CATEGORIES = ['Food', 'Transport', 'Rent', 'Utilities', 'Health', 'Entertainment', 'Freelance', 'Salary', 'Other'];

export const CURRENCIES = [
  { code: 'XAF', symbol: 'FCFA', name: 'CFA Franc' },
  { code: 'EUR', symbol: '€',    name: 'Euro' },
  { code: 'USD', symbol: '$',    name: 'US Dollar' },
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
];