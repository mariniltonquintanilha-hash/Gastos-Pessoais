# Orcamento
Aplicativo de finanças
# Verkupp Pessoal - Sistema de Gestão Financeira

Este é um aplicativo de painel financeiro de página única (SPA) projetado para ajudar os usuários a rastrear suas receitas e despesas. O aplicativo possui uma interface de usuário moderna e reativa, visualização de dados e insights financeiros gerados por IA. Os dados são persistidos localmente no navegador do usuário, e há funcionalidades para importar e exportar dados.

## ✨ Funcionalidades

- **Dashboard Principal**: Exibe cartões de resumo com receita total, despesa total e lucro líquido.
- **Visualização de Dados**: Um gráfico de pizza (`Recharts`) mostra a distribuição de transações por categoria.
- **Tabela de Transações**: Apresenta uma lista detalhada de todas as transações, com a capacidade de excluí-las.
- **Adicionar Transação**: Um formulário dedicado para adicionar novas receitas ou despesas.
- **Filtros Dinâmicos**: Filtre transações por tipo (receita/despesa), categoria ou mês.
- **Insights com IA**: Utiliza a API do Google Gemini (`@google/genai`) para fornecer análises e conselhos financeiros com base nos dados do usuário.
- **Persistência de Dados**: As transações são salvas automaticamente no `LocalStorage` do navegador, garantindo que os dados não sejam perdidos ao recarregar a página.
- **Importar/Exportar**:
  - Exporte um relatório das transações filtradas para um arquivo **Excel (.xlsx)**.
  - Crie e restaure backups de todos os dados de transação em formato **JSON**.

## 🛠️ Tecnologias e Bibliotecas

- **Framework**: React `19` com TypeScript
- **Build Tool**: Vite
- **Estilização**: Utilitários de CSS (ex: Tailwind CSS) para um design moderno e responsivo.
- **Gráficos**: `Recharts` para visualização de dados interativa.
- **Ícones**: `lucide-react` para ícones SVG leves e consistentes.
- **IA Generativa**: `@google/genai` para integração com a API do Google Gemini.
- **Utilitários**: `xlsx` para gerar arquivos Excel.

## 📂 Estrutura do Código

O código-fonte está organizado da seguinte forma para promover modularidade e manutenibilidade.

```
/
├── components/           # Componentes React reutilizáveis da UI
│   ├── AiInsights.tsx
│   ├── DashboardCards.tsx
│   ├── Filters.tsx
│   ├── FinanceChart.tsx
│   ├── TransactionForm.tsx
│   └── TransactionTable.tsx
│
├── services/             # Módulos para interagir com APIs externas
│   └── geminiService.ts
│
├── App.tsx               # Componente principal que gerencia o estado e a lógica do aplicativo
├── index.tsx             # Ponto de entrada do React
├── types.ts              # Definições de tipos TypeScript (Transaction, FinancialStats, etc.)
└── package.json          # Dependências do projeto e scripts
```

### Descrição dos Componentes

- **`App.tsx`**: O coração do aplicativo. Ele gerencia o estado global das `transactions`, lida com adição, exclusão e filtragem, e compõe a interface do usuário renderizando os outros componentes.
- **`components/DashboardCards.tsx`**: Exibe as principais métricas financeiras (receita, despesa, lucro).
- **`components/FinanceChart.tsx`**: Renderiza o gráfico de pizza com base nas transações filtradas.
- **`components/TransactionTable.tsx`**: Mostra os dados das transações em formato de tabela e inclui a funcionalidade de exclusão.
- **`components/TransactionForm.tsx`**: Contém o formulário para inserir novas transações.
- **`components/Filters.tsx`**: Fornece os controles de UI para filtrar os dados exibidos.
- **`components/AiInsights.tsx`**: Interage com o `geminiService` para buscar e exibir insights financeiros.
- **`services/geminiService.ts`**: Encapsula a lógica para fazer chamadas à API do Google Gemini, enviando os dados financeiros e recebendo análises.
- **`types.ts`**: Centraliza as definições de tipos para garantir a consistência dos dados em todo o aplicativo.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18.x ou superior)
- `npm` ou `yarn`

### Instalação

1.  Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DA_PASTA>
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

### Configuração da API

Para que os insights de IA funcionem, você precisa de uma chave de API do Google Gemini.

1.  Crie um arquivo `.env.local` na raiz do projeto.
2.  Adicione sua chave de API a este arquivo:
    ```
    VITE_GEMINI_API_KEY=SUA_CHAVE_DE_API_AQUI
    ```

### Executando o Aplicativo

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou em outra porta, se a 5173 estiver em uso).

### Build de Produção

Para criar uma versão otimizada do aplicativo para produção:

```bash
npm run build
```

Os arquivos estáticos serão gerados no diretório `dist/`. Você pode visualizar a build de produção localmente com:

```bash
npm run preview
```

