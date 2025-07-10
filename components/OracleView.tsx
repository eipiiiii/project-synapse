import React from 'react';
import { OracleOutput } from '../types';
import { OracleIcon } from './icons/OracleIcon';

interface OracleViewProps {
  opportunity: OracleOutput | null;
  isLoading: boolean;
}

interface ScoreBarProps {
  label: string;
  score: number;
  colorClass: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ label, score, colorClass }) => {
  const widthPercentage = score * 10;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className={`text-sm font-bold ${colorClass.replace('bg-', 'text-')}`}>{score}/10</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${widthPercentage}%` }}></div>
      </div>
    </div>
  );
};


const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-10 bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="h-6 bg-slate-700 rounded w-1/2"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
            </div>
            <div className="space-y-4">
                <div className="h-6 bg-slate-700 rounded w-1/2"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
            </div>
        </div>
    </div>
);

const OracleView: React.FC<OracleViewProps> = ({ opportunity, isLoading }) => {
  if (!isLoading && !opportunity) {
    return null;
  }

  const recommendationColors = {
      BUY: 'bg-green-500 text-green-900',
      HOLD: 'bg-yellow-500 text-yellow-900',
      SELL: 'bg-red-500 text-red-900',
      MONITOR: 'bg-blue-500 text-blue-900',
  };

  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <OracleIcon className="w-8 h-8 text-yellow-400" />
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400">Module 3: The Oracle</h2>
          <p className="text-slate-400">
            {isLoading ? 'Identifying strategic opportunities...' : 'Actionable insight generated. The Oracle has identified the most compelling, actionable investment opportunity and transformed abstract analysis into a concrete action plan.'}
          </p>
        </div>
      </div>

      {isLoading ? <LoadingSkeleton /> : opportunity && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b border-slate-700 pb-4">
            <h3 className="text-3xl font-bold text-slate-100">${opportunity.stock_ticker}</h3>
            <span className={`px-4 py-1 mt-2 sm:mt-0 text-lg font-bold rounded-full ${recommendationColors[opportunity.recommendation]}`}>
              {opportunity.recommendation}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-slate-200 border-b border-slate-600 pb-2">Opportunity Scores</h4>
              <ScoreBar label="Potential" score={opportunity.scores.potential} colorClass="bg-cyan-500" />
              <ScoreBar label="Catalyst Freshness" score={opportunity.scores.catalyst_freshness} colorClass="bg-green-500" />
              <ScoreBar label="Market Attention" score={opportunity.scores.market_attention} colorClass="bg-purple-500" />
              <ScoreBar label="Risk Level" score={opportunity.scores.risk_level} colorClass="bg-red-500" />
            </div>
            
            <div className="space-y-6">
                <div>
                    <h4 className="text-xl font-semibold text-slate-200 mb-2">Reasoning</h4>
                    <p className="text-slate-300">{opportunity.reasoning}</p>
                </div>
                <div>
                    <h4 className="text-xl font-semibold text-slate-200 mb-2">Key Risks</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {opportunity.risks.map((risk, index) => <li key={index}>{risk}</li>)}
                    </ul>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OracleView;
