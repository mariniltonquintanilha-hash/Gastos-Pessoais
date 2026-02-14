
import React from 'react';
import { CATEGORIES, TransactionType } from '../types';

interface Props {
  type: TransactionType | 'all';
  setType: (t: TransactionType | 'all') => void;
  category: string;
  setCategory: (c: string) => void;
  month: string;
  setMonth: (m: string) => void;
}

const Filters: React.FC<Props> = ({ type, setType, category, setCategory, month, setMonth }) => {
  const months = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Fev' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Abr' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Ago' },
    { value: '09', label: 'Set' },
    { value: '10', label: 'Out' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dez' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as any)}
        className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-quantum-primary appearance-none"
      >
        <option value="all">Tipos: Todos</option>
        <option value="income">Receitas</option>
        <option value="expense">Despesas</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-quantum-primary appearance-none"
      >
        <option value="all">Categorias: Todas</option>
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-quantum-primary appearance-none"
      >
        <option value="all">Mês: Todos</option>
        {months.map(m => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
