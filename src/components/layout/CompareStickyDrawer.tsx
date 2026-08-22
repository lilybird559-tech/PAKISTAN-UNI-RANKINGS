import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

export const CompareStickyDrawer: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, setCurrentPage, currentPage } = useApp();

  if (compareList.length === 0 || currentPage === 'compare') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-200">
      <div className="bg-slate-900/95 text-white backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left info & chips */}
        <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-slate-700">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Scale className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Compare</div>
              <div className="text-[11px] text-slate-400 font-medium">{compareList.length} of 4 selected</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.map((uni) => (
              <div
                key={uni.id}
                className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs shrink-0"
              >
                <img
                  src={uni.logo}
                  alt={uni.shortName}
                  className="w-5 h-5 rounded-sm object-cover"
                />
                <span className="font-semibold text-slate-200 max-w-[110px] truncate">
                  {uni.shortName}
                </span>
                <button
                  onClick={() => removeFromCompare(uni.id)}
                  className="text-slate-400 hover:text-red-400 transition-colors p-0.5"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {compareList.length < 4 && (
              <div className="text-[11px] text-slate-400 italic px-2 shrink-0 hidden md:block">
                + Add {4 - compareList.length} more
              </div>
            )}
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={clearCompare}
            className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('compare');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
