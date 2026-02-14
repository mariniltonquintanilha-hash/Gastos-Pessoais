
import { GoogleGenAI } from "@google/genai";
import { Transaction, FinancialStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFinancialInsights(transactions: Transaction[], stats: FinancialStats) {
  if (transactions.length === 0) return "Adicione seus primeiros gastos para eu analisar seu perfil financeiro.";

  const prompt = `
    Você é o Verkupp AI, um assistente de finanças pessoais de elite. Analise os dados abaixo:
    
    Estado Atual:
    - Entradas: R$ ${stats.totalIncome}
    - Gastos: R$ ${stats.totalExpenses}
    - Saldo Livre: R$ ${stats.netProfit}
    - Taxa de Poupança: ${stats.totalIncome > 0 ? ((stats.netProfit / stats.totalIncome) * 100).toFixed(2) : 0}%
    
    Últimos lançamentos:
    ${transactions.slice(0, 10).map(t => `- [${t.type === 'income' ? 'Entrada' : 'Saída'}] ${t.description}: R$ ${t.value} (${t.category})`).join('\n')}

    Por favor, retorne uma resposta em markdown com:
    1. Uma análise rápida do estilo de vida (ex: se gasta muito com lazer ou moradia).
    2. Uma dica prática para sobrar mais dinheiro no fim do mês.
    3. Um "status quântico" da saúde financeira (Saudável, Alerta ou Crítica).
    
    Use tom futurista, encorajador e direto. Use emojis.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Erro ao processar insights. Tente novamente.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Os servidores da Verkupp AI estão recalibrando. Tente em breve.";
  }
}
