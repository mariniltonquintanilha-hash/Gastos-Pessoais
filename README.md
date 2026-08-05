![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

# Gastos-Pessoais — Verkupp Pessoal (Gestão Financeira)

> Sistema de gestão financeira pessoal (SPA) com dashboard, gráficos e insights gerados por **IA (Google Gemini)**.

## 📌 Sobre o Projeto

Painel financeiro de página única para acompanhar receitas e despesas, com interface moderna, visualização de dados e análises financeiras inteligentes. Os dados são persistidos no navegador e há suporte a importação e exportação.

## ✨ Funcionalidades

- 📊 **Dashboard principal**: resumo de receitas, despesas e lucro líquido
- 🥧 **Gráfico por categoria** com Recharts
- 📋 **Tabela de transações** com opção de exclusão
- ➕ **Formulário** para adicionar receitas e despesas
- 🔍 **Filtros** por tipo, categoria e mês
- 🤖 **Insights com IA** (Google Gemini) com análise dos dados financeiros
- 💾 **Persistência** automática no LocalStorage
- 📤 **Exportação** para Excel (.xlsx) e **backups** em JSON

## 🚀 Como Executar

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build
```

> Para usar os insights de IA, configure sua chave da API do Google Gemini em `services/geminiService.ts`.

## 📁 Estrutura do Projeto

```
├── App.tsx                    → Componente principal
├── components/
│   ├── AiInsights.tsx         → Insights com IA
│   ├── DashboardCards.tsx     → Cards de resumo
│   ├── Filters.tsx            → Filtros de transações
│   ├── FinanceChart.tsx       → Gráfico de categorias
│   ├── TransactionForm.tsx    → Formulário de transações
│   └── TransactionTable.tsx   → Tabela de transações
├── services/geminiService.ts  → Integração com Google Gemini
├── types.ts                   → Tipos TypeScript
└── vite.config.ts             → Configuração do Vite
```

## 📄 Licença

Projeto desenvolvido para fins de portfólio.
