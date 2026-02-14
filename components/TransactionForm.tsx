
import React, { useState, useEffect } from 'react';
import { CATEGORIES, Transaction, TransactionType } from '../types';

interface Props {
  onSubmit: (t: Omit<Transaction, 'id'>) => void;
}

const TransactionForm: React.FC<Props> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState(CATEGORIES[2]); // Começa em 'Mercado' ou similar

  // Lógica inteligente: Se selecionar Salário ou Serviços, muda para Entrada automaticamente
  useEffect(() => {
    if (category === 'Salário' || category === 'Serviços Prestados') {
      setType('income');
    } else {
      setType('expense');
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !value) return;

    onSubmit({
      description,
      value: parseFloat(value),
      date,
      type,
      category
    });

    setDescription('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">O que foi?</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Supermercado, Salário, Cinema..."
          className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-quantum-primary focus:ring-1 focus:ring-quantum-primary transition-all text-white placeholder:text-slate-600"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Quanto? (R$)</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            step="0.01"
            placeholder="0,00"
            className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-quantum-primary transition-all text-white"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Quando?</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-quantum-primary transition-all text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Entrada ou Saída?</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className={`w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none transition-all appearance-none font-bold ${type === 'income' ? 'text-quantum-accent border-quantum-accent/30' : 'text-quantum-danger border-quantum-danger/30'}`}
          >
            <option value="income" className="text-quantum-accent">Entrada (+)</option>
            <option value="expense" className="text-quantum-danger">Saída (-)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-quantum-primary transition-all text-white appearance-none"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-quantum-primary hover:bg-quantum-primary/80 text-quantum-bg font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-neon hover:shadow-none active:scale-95"
      >
        REGISTRAR AGORA
      </button>
    </form>
  );
};

export default TransactionForm;
