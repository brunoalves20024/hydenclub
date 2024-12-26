import React from 'react';
import { Model } from '../types';

interface SearchResultsProps {
  results: Model[];
  onSelect: (model: Model) => void;
  onClose: () => void;
}

export function SearchResults({ results, onSelect, onClose }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1F1F1F] rounded-md shadow-lg border border-white/10 max-h-96 overflow-y-auto">
      {results.map((model) => (
        <button
          key={model.id}
          onClick={() => {
            onSelect(model);
            onClose();
          }}
          className="w-full flex items-center gap-3 p-3 hover:bg-[#2F2F2F] transition-colors"
        >
          <img
            src={model.profileImage}
            alt={model.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-left">
            <h3 className="text-white font-medium">{model.name}</h3>
            <p className="text-white/60 text-sm">{model.location}</p>
          </div>
        </button>
      ))}
    </div>
  );
}