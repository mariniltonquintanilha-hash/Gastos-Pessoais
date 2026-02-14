
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { FinancialStats } from '../types';

interface Props {
  stats: FinancialStats;
}

const DashboardCards: React.FC<Props> = ({ stats }) => {
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass p-6 rounded-2xl transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-quantum-accent/20 rounded-lg">
            <ArrowUpCircle className="text-quantum-accent" size={24} />
          </div>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Entradas</span>
        </div>
        <div className="text-2xl font-bold text-quantum-accent font-display">{formatBRL(stats.totalIncome)}</div>
        <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-quantum-accent" style={{ width: '100%' }}></div>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-quantum-danger/20 rounded-lg">
            <ArrowDownCircle className="text-quantum-danger" size={24} />
          </div>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Gastos Totais</span>
        </div>
        <div className="text-2xl font-bold text-quantum-danger font-display">{formatBRL(stats.totalExpenses)}</div>
        <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-quantum-danger" style={{ width: `${Math.min((stats.totalExpenses / (stats.totalIncome || 1)) * 100, 100)}%` }}></div>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl transition-transform hover:scale-[1.02] bg-gradient-to-br from-quantum-card to-quantum-primary/5 border border-quantum-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-quantum-primary/20 rounded-lg">
            <Wallet className="text-quantum-primary" size={24} />
          </div>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Saldo Livre</span>
        </div>
        <div className="text-2xl font-bold text-quantum-primary font-display">{formatBRL(stats.netProfit)}</div>
        <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-quantum-primary" style={{ width: `${Math.max(0, Math.min((stats.netProfit / (stats.totalIncome || 1)) * 100, 100))}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
