
import React from 'react';
import { NexusIcon } from './icons/NexusIcon';

interface NexusDisplayProps {
  narrative: string | null;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    </div>
);

const NexusDisplay: React.FC<NexusDisplayProps> = ({ narrative, isLoading }) => {
  if (!isLoading && !narrative) {
    return null; // Don't show anything if not loading and no data
  }

  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <NexusIcon className="w-8 h-8 text-purple-400" />
        <div>
          <h2 className="text-2xl font-semibold text-purple-400">Module 2: The Nexus</h2>
          <p className="text-slate-400">
            {isLoading ? 'Synthesizing narrative from disparate signals...' : 'Contextual narrative established.'}
          </p>
        </div>
      </div>
      <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 max-w-none">
        {isLoading ? <LoadingSkeleton /> : <p className="whitespace-pre-wrap">{narrative}</p>}
      </div>
    </section>
  );
};

export default NexusDisplay;
