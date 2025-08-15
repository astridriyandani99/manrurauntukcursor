import React from 'react';
import type { Ward } from '../types';
import { BuildingOfficeIcon } from './Icons';

interface WardSelectorProps {
  wards: Ward[];
  selectedWardId: string;
  setSelectedWardId: (id: string) => void;
}

const WardSelector: React.FC<WardSelectorProps> = ({ wards, selectedWardId, setSelectedWardId }) => {
  return (
    <div className="p-4 bg-slate-900 border-t border-slate-700">
      <label htmlFor="ward-selector" className="flex items-center text-sm font-medium text-slate-400 mb-2">
        <BuildingOfficeIcon className="w-5 h-5 mr-2" />
        <span>Assessed Ward</span>
      </label>
      <select
        id="ward-selector"
        value={selectedWardId}
        onChange={(e) => setSelectedWardId(e.target.value)}
        className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-sky-500 focus:border-sky-500 text-sm"
      >
        {wards.map(ward => (
          <option key={ward.id} value={ward.id}>{ward.name}</option>
        ))}
      </select>
       <p className="mt-2 text-xs text-slate-500">
        Assessment data is saved separately for each ward.
      </p>
    </div>
  );
};

export default WardSelector;
