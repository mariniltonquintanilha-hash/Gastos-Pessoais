
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { getFinancialInsights } from '../services/geminiService';
import { Transaction, FinancialStats } from '../types';

interface Props {
  transactions: Transaction[];
  stats: FinancialStats;
}

const AiInsights: React.FC<Props> = ({ transactions, stats }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getFinancialInsights(transactions, stats);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    if (transactions.length > 0 && !insight) {
      fetchInsights();
    }
  }, [transactions]);

  return (
    <div className="space-y-4">
      <div className="min-h-[150px] relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-slate-500">
            <RefreshCcw className="animate-spin text-quantum-secondary" size={32} />
            <p className="text-sm font-medium animate-pulse">Calculando vetores financeiros...</p>
          </div>
        ) : (
          <div className="text-sm text-slate-300 leading-relaxed prose prose-invert prose-sm max-w-none">
            {insight ? (
               <div dangerouslySetInnerHTML={{ __html: insight.replace(/\n/g, '<br/>') }} />
            ) : (
              <p className="text-center text-slate-500 italic py-4">Sem dados suficientes para análise quântica.</p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={fetchInsights}
        disabled={loading || transactions.length === 0}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-quantum-secondary/30 text-quantum-secondary hover:bg-quantum-secondary/10 transition-all font-bold text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed uppercase"
      >
        <Sparkles size={14} />
        Sincronizar IA
      </button>
    </div>
  );
};

export default AiInsights;
