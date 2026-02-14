
import React from 'react';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionTable: React.FC<Props> = ({ transactions, onDelete }) => {
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  if (transactions.length === 0) {
    return (
      <div className="glass p-12 rounded-2xl text-center">
        <div className="text-slate-500 font-medium italic">Nenhum registro encontrado para este filtro.</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-xs uppercase tracking-widest text-slate-500 font-bold">
            <th className="px-6 pb-2">Data</th>
            <th className="px-6 pb-2">Descrição</th>
            <th className="px-6 pb-2">Categoria</th>
            <th className="px-6 pb-2">Valor</th>
            <th className="px-6 pb-2 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="group glass hover:bg-white/5 transition-all">
              <td className="px-6 py-4 rounded-l-xl text-sm font-medium text-slate-400">
                {formatDate(t.date)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${t.type === 'income' ? 'bg-quantum-accent/10' : 'bg-quantum-danger/10'}`}>
                    {t.type === 'income' ? (
                      <TrendingUp className="text-quantum-accent" size={14} />
                    ) : (
                      <TrendingDown className="text-quantum-danger" size={14} />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white">{t.description}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[10px] font-bold uppercase tracking-tight text-slate-300 border border-white/5">
                  {t.category}
                </span>
              </td>
              <td className={`px-6 py-4 text-sm font-bold ${t.type === 'income' ? 'text-quantum-accent' : 'text-quantum-danger'}`}>
                {t.type === 'income' ? '+' : '-'} {formatBRL(t.value)}
              </td>
              <td className="px-6 py-4 text-right rounded-r-xl">
                <button
                  onClick={() => onDelete(t.id)}
                  className="p-2 text-slate-500 hover:text-quantum-danger transition-colors opacity-0 group-hover:opacity-100"
                  title="Excluir"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
