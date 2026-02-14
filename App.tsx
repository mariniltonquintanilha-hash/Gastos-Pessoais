
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Plus, LayoutDashboard, Wallet, Download, Bot, User, PieChart as PieChartIcon, UploadCloud, Save, CheckCircle2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Transaction, FinancialStats, TransactionType } from './types';
import DashboardCards from './components/DashboardCards';
import FinanceChart from './components/FinanceChart';
import TransactionForm from './components/TransactionForm';
import Filters from './components/Filters';
import TransactionTable from './components/TransactionTable';
import AiInsights from './components/AiInsights';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('verkupp_pessoal_transactions');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error("Erro ao carregar dados do LocalStorage:", e);
    }
    return [];
  });

  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Efeito de persistência automática
  useEffect(() => {
    try {
      localStorage.setItem('verkupp_pessoal_transactions', JSON.stringify(transactions));
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
      alert("Espaço de armazenamento cheio ou erro ao salvar. Verifique seu navegador.");
    }
  }, [transactions]);

  // Sincronização entre abas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'verkupp_pessoal_transactions' && e.newValue) {
        setTransactions(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const typeMatch = filterType === 'all' || t.type === filterType;
      const categoryMatch = filterCategory === 'all' || t.category === filterCategory;
      const monthMatch = filterMonth === 'all' || t.date.split('-')[1] === filterMonth;
      return typeMatch && categoryMatch && monthMatch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filterType, filterCategory, filterMonth]);

  const stats = useMemo<FinancialStats>(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      netProfit: income - expenses
    };
  }, [transactions]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: crypto.randomUUID() };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    if (window.confirm("Deseja realmente excluir este registro? Esta ação não pode ser desfeita.")) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTransactions.map(t => ({
      Data: t.date,
      Descrição: t.description,
      Valor: t.value,
      Tipo: t.type === 'income' ? 'Entrada' : 'Saída',
      Categoria: t.category
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Finanças Pessoais");
    XLSX.writeFile(wb, "Verkupp_Pessoal_Relatorio.xlsx");
  };

  const exportBackupJSON = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `Verkupp_Backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        if (Array.isArray(importedData)) {
          if (window.confirm(`Detectamos ${importedData.length} registros. Deseja substituir seus dados atuais por este backup?`)) {
            setTransactions(importedData);
          }
        } else {
          alert("Arquivo inválido. Certifique-se de carregar um backup Verkupp válido.");
        }
      } catch (err) {
        alert("Erro ao ler arquivo. Verifique se o formato está correto.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <header className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-quantum-primary rounded-xl flex items-center justify-center shadow-neon">
            <User className="text-quantum-bg w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tighter glow-text">
              VERKUPP <span className="text-quantum-primary">PESSOAL</span>
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Life Engine V2.0</p>
              <span className="flex items-center gap-1 text-[10px] text-quantum-accent font-bold px-1.5 py-0.5 bg-quantum-accent/10 rounded">
                <CheckCircle2 size={10} /> PROTEGIDO
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportJSON} 
            accept=".json" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
            title="Importar backup (.json)"
          >
            <UploadCloud size={16} />
            <span className="hidden sm:inline">Restaurar</span>
          </button>
          <button 
            onClick={exportBackupJSON}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
            title="Salvar backup (.json)"
          >
            <Save size={16} />
            <span className="hidden sm:inline">Backup JSON</span>
          </button>
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-quantum-primary/10 text-quantum-primary border border-quantum-primary/50 hover:bg-quantum-primary/20 transition-all font-semibold shadow-neon-small"
          >
            <Download size={18} />
            <span>Excel</span>
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <DashboardCards stats={stats} />
          
          <div className="glass p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold flex items-center gap-2 uppercase tracking-tight">
                <PieChartIcon className="text-quantum-primary" size={20} />
                Distribuição por Categoria
              </h2>
            </div>
            <FinanceChart transactions={filteredTransactions} />
          </div>

          <div className="space-y-4">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-xl font-display font-bold flex items-center gap-2 uppercase tracking-tight">
                  <Wallet className="text-quantum-primary" size={20} />
                  Fluxo de Lançamentos
                </h2>
                <Filters 
                  type={filterType} 
                  setType={setFilterType} 
                  category={filterCategory} 
                  setCategory={setFilterCategory} 
                  month={filterMonth} 
                  setMonth={setFilterMonth} 
                />
             </div>
             <TransactionTable 
                transactions={filteredTransactions} 
                onDelete={deleteTransaction} 
             />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-6 rounded-2xl border-l-4 border-l-quantum-primary shadow-lg animate-pulse-slow">
            <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Plus className="text-quantum-primary" size={20} />
              Novo Registro
            </h2>
            <TransactionForm onSubmit={addTransaction} />
          </div>

          <div className="glass p-6 rounded-2xl border-l-4 border-l-quantum-secondary">
             <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
              <Bot className="text-quantum-secondary" size={20} />
              Verkupp AI
            </h2>
            <AiInsights transactions={transactions} stats={stats} />
          </div>
        </div>
      </main>
      
      <footer className="mt-20 py-8 text-center text-slate-500 border-t border-white/5 space-y-2">
        <p className="text-sm font-medium tracking-widest uppercase">Verkupp Personal Finance System © 2024</p>
        <p className="text-[10px] text-slate-600 uppercase tracking-tighter">Armazenamento local persistente ativado. Realize backups regulares.</p>
      </footer>
    </div>
  );
};

export default App;
