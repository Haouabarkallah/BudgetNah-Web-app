import { CURRENCIES } from './mock-data';

export function formatCurrency(amount: number, currencyCode: string): string {
  const curr = CURRENCIES.find((c) => c.code === currencyCode);
  const symbol = curr?.symbol ?? currencyCode;

  if (currencyCode === 'XAF') {
    return `${amount.toLocaleString('fr-FR')} ${symbol}`;
  }
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}