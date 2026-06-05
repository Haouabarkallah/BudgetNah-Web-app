import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/sidebar';
import Providers from '@/components/providers';

export const metadata: Metadata = {
  title: 'BudgetNah',
  description: 'Personal finance tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-60 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}