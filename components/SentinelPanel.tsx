
import React, { useState } from 'react';
import { SentinelIcon } from './icons/SentinelIcon';

interface SentinelPanelProps {
  onAnalyze: (topic: string) => void;
  isLoading: boolean;
}

const SentinelPanel: React.FC<SentinelPanelProps> = ({ onAnalyze, isLoading }) => {
  const [topic, setTopic] = useState<string>('The future of AI-powered robotics and automation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onAnalyze(topic);
    }
  };

  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-4">
        <SentinelIcon className="w-8 h-8 text-green-400" />
        <div>
          <h2 className="text-2xl font-semibold text-green-400">Module 1: The Sentinels</h2>
          <p className="text-slate-400">Deploying perception grid. Define the analysis target.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The global shift to renewable energy"
          className="flex-grow bg-slate-900 border border-slate-600 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200 disabled:opacity-50"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Initiate Analysis'
          )}
        </button>
      </form>
    </section>
  );
};

export default SentinelPanel;
