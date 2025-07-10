import { GoogleGenAI, Type } from "@google/genai";
import { OracleOutput } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const nexusSystemInstruction = `You are "Nexus," a context-integration and reasoning engine for an advanced AI market analyst called "Project Synapse." 
Your function is to synthesize disparate pieces of information (news, social media chatter, financial data, regulatory filings) into a coherent, insightful narrative. You must connect seemingly unrelated events into a single, causal story, explaining the underlying market dynamics and highlighting potential future scenarios. For example, if given "A company's new product launch," "rumors of a competitor's supply chain delay," and "new environmental regulations in Country C," you should reconstruct them into a story like: "Company A's new product is the only option that clears environmental regulation C, and with competitor B's stumble, it has gained a prime opportunity to monopolize the market."
A user will provide a topic. You must act as if your "Sentinels" (data collectors) have gathered relevant signals.
Your output should be a compelling story that explains the underlying market dynamics, connects seemingly unrelated events, and highlights potential future scenarios.
The narrative should be professional, insightful, and read like a high-level intelligence briefing.
Do not use markdown formatting. Output plain text only.`;

const oracleSystemInstruction = `You are "The Oracle," a strategic opportunity identification module for "Project Synapse."
Your input is a narrative from the "Nexus" engine.
Your task is to analyze this narrative and identify the single most compelling, actionable investment opportunity it implies.
You must evaluate the opportunity on four key metrics: Potential, Catalyst Freshness, Market Attention, and Risk Level.
Provide a specific stock ticker.
Your output must be a valid JSON object matching the provided schema. Do not add any extra text or markdown formatting like \`\`\`json.`;

const oracleSchema = {
  type: Type.OBJECT,
  properties: {
    stock_ticker: {
      type: Type.STRING,
      description: "The stock ticker symbol for the identified company (e.g., 'NVDA', 'TSLA')."
    },
    recommendation: {
      type: Type.STRING,
      enum: ['BUY', 'HOLD', 'SELL', 'MONITOR'],
      description: "Your strategic recommendation for this stock based on the narrative."
    },
    scores: {
      type: Type.OBJECT,
      description: "A scoring of the opportunity on a scale of 1 (low) to 10 (high).",
      properties: {
        potential: { type: Type.INTEGER, description: "The estimated upside potential. 10 is highest." },
        catalyst_freshness: { type: Type.INTEGER, description: "How new and potent the driving factors are. 10 is newest." },
        market_attention: { type: Type.INTEGER, description: "The current level of market focus on this story. 10 is highest." },
        risk_level: { type: Type.INTEGER, description: "The level of inherent risk. 10 is highest risk." }
      },
      required: ["potential", "catalyst_freshness", "market_attention", "risk_level"]
    },
    reasoning: {
      type: Type.STRING,
      description: "A concise, logical explanation for your recommendation, directly referencing the narrative. Explain WHY this is an opportunity."
    },
    risks: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING
      },
      description: "A list of 2-3 key risks or counterarguments to consider."
    }
  },
  required: ["stock_ticker", "recommendation", "scores", "reasoning", "risks"]
};


export const generateNarrative = async (topic: string): Promise<string> => {
    console.log(`Generating narrative for topic: ${topic}`);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the following market topic: "${topic}"`,
        config: {
            systemInstruction: nexusSystemInstruction,
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
        }
    });
    return response.text ?? '';
};


export const generateOpportunity = async (narrative: string): Promise<string> => {
    console.log('Generating opportunity from narrative...');
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Here is the narrative from Nexus. Analyze it and generate your strategic opportunity report.\n\nNARRATIVE:\n---\n${narrative}`,
        config: {
            systemInstruction: oracleSystemInstruction,
            responseMimeType: "application/json",
            responseSchema: oracleSchema,
            temperature: 0.5,
        }
    });
    return response.text ?? '';
};
