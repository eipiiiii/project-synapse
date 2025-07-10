
import React from 'react';
import { SynapseIcon } from './icons/SynapseIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <SynapseIcon className="w-12 h-12 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Project Synapse
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400">
        An autonomous market analyst AI connecting information into insight.
      </p>
    </header>
  );
};

export default Header;
