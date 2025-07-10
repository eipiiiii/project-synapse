
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SentinelPanel from './components/SentinelPanel';
import NexusDisplay from './components/NexusDisplay';
import OracleView from './components/OracleView';
import ErrorDisplay from './components/ErrorDisplay';
import { generateNarrative, generateOpportunity } from './services/geminiService';
import { OracleOutput } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [narrative, setNarrative] = useState<string | null>(null);
  const [opportunity, setOpportunity] = useState<OracleOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<string | null>(null);

  const handleAnalysis = useCallback(async (topic: string) => {
    setIsLoading(true);
    setNarrative(null);
    setOpportunity(null);
    setError(null);

    try {
      // Module 1 & 2: Sentinels & Nexus
      setCurrentModule('Nexus');
      const generatedNarrative = await generateNarrative(topic);
      setNarrative(generatedNarrative);

      // Module 3: Oracle
      setCurrentModule('Oracle');
      const generatedOpportunityJson = await generateOpportunity(generatedNarrative);
      
      // Sanitize and parse JSON
      let sanitizedJson = generatedOpportunityJson.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedOpportunity: OracleOutput = JSON.parse(sanitizedJson);

      setOpportunity(parsedOpportunity);

    } catch (e: any) {
      console.error(e);
      setError(`An error occurred during analysis: ${e.message}. Please ensure your API key is configured correctly and try again.`);
    } finally {
      setIsLoading(false);
      setCurrentModule(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <main className="mt-8 space-y-12">
          <SentinelPanel onAnalyze={handleAnalysis} isLoading={isLoading} />
          <ErrorDisplay error={error} />
          <NexusDisplay narrative={narrative} isLoading={isLoading && currentModule === 'Nexus'} />
          <OracleView opportunity={opportunity} isLoading={isLoading && currentModule === 'Oracle'} />
        </main>
        <footer className="text-center mt-16 text-slate-500 text-sm">
          <p>Project Synapse: Redefining Market Intelligence.</p>
          <p>This is a conceptual demonstration. Not financial advice.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
