
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  type: TransactionType;
  category: string;
}

export const CATEGORIES = [
  'Salário',
  'Serviços Prestados',
  'Mercado',
  'Alimentação',
  'Manutenção de Carro',
  'Impostos',
  'Compras',
  'Viagens',
  'Saúde',
  'Lazer',
  'Moradia',
  'Educação',
  'Outros'
];

export interface FinancialStats {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
}
