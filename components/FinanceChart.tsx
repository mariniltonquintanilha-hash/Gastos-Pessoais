
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  '#06b6d4', '#f43f5e', '#10b981', '#eab308', 
  '#8b5cf6', '#ec4899', '#22d3ee', '#fb7185',
  '#34d399', '#facc15', '#a78bfa', '#f472b6'
];

const FinanceChart: React.FC<Props> = ({ transactions }) => {
  // Agora processamos todas as transações (Receitas e Despesas)
  const categoryData = useMemo(() => {
    const totals: { [key: string]: number } = {};
    const categoryTypes: { [key: string]: 'income' | 'expense' } = {};

    transactions.forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.value;
      // Armazenamos o tipo da categoria (assumindo que uma categoria é predominantemente de um tipo)
      if (!categoryTypes[t.category]) {
        categoryTypes[t.category] = t.type;
      }
    });

    return Object.entries(totals)
      .map(([name, value]) => ({ 
        name, 
        value, 
        type: categoryTypes[name] 
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-white/10 p-2 rounded shadow-xl">
          <p className="text-white text-xs font-bold">{data.name}</p>
          <p className={`${data.type === 'income' ? 'text-quantum-accent' : 'text-quantum-danger'} text-xs font-bold`}>
            {formatBRL(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Cards de Categoria no Topo - Layout dinâmico com cores por tipo */}
      <div className="flex flex-wrap gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {categoryData.slice(0, 8).map((cat, index) => (
          <div key={cat.name} className="min-w-[140px] flex-1 glass border border-white/5 p-4 rounded-xl text-center">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">
              {cat.name}
            </h4>
            <p className={`text-sm font-bold font-display ${cat.type === 'income' ? 'text-quantum-accent' : 'text-quantum-danger'}`}>
              {cat.type === 'income' ? '+' : ''}{formatBRL(cat.value)}
            </p>
          </div>
        ))}
        {categoryData.length === 0 && (
          <div className="w-full py-4 text-center text-slate-500 text-sm italic">
            Nenhum registro financeiro para exibir no resumo.
          </div>
        )}
      </div>

      {/* Área do Gráfico e Legenda */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
        <div className="h-[300px] w-full md:w-2/3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda Lateral Estilizada */}
        <div className="w-full md:w-1/3 grid grid-cols-2 md:grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {categoryData.map((cat, index) => (
            <div key={cat.name} className="flex items-center gap-3 py-1">
              <div 
                className="w-3 h-3 rounded-sm shrink-0" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="flex flex-col truncate">
                <span className="text-[11px] font-medium text-slate-300 truncate">
                  {cat.name}
                </span>
                <span className={`text-[9px] font-bold ${cat.type === 'income' ? 'text-quantum-accent' : 'text-quantum-danger'}`}>
                  {formatBRL(cat.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;
