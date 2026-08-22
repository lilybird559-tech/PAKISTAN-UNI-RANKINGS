import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Scale,
  GraduationCap,
  MapPin,
  ExternalLink,
  Trash2,
  ArrowRight,
  Award,
} from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const {
    favorites,
    universities,
    toggleFavorite,
    setSelectedUniversity,
    addToCompare,
    removeFromCompare,
    compareList,
    setCurrentPage,
  } = useApp();

  const favoriteUnis = universities.filter((u) => favorites.includes(u.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-600 fill-rose-500" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Saved Universities ({favoriteUnis.length})
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Shortlist of universities you're tracking for admissions, degree options, and merit comparisons.
          </p>
        </div>

        {favoriteUnis.length > 0 && (
          <button
            onClick={() => {
              favoriteUnis.slice(0, 4).forEach((u) => addToCompare(u));
              setCurrentPage('compare');
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Scale className="w-4 h-4" />
            <span>Compare All Saved ({Math.min(4, favoriteUnis.length)})</span>
          </button>
        )}
      </div>

      {favoriteUnis.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-500">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Universities Saved Yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Click the heart icon on any university card or ranking table row to save it to your personal shortlist.
          </p>
          <button
            onClick={() => setCurrentPage('universities')}
            className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
          >
            <span>Explore Universities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteUnis.map((uni) => {
            const isInCompare = compareList.some((c) => c.id === uni.id);

            return (
              <div
                key={uni.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>Rank #{uni.currentRank}</span>
                    </span>

                    <button
                      onClick={() => toggleFavorite(uni.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-start gap-3">
                    <img
                      src={uni.logo}
                      alt={uni.shortName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h3
                        onClick={() => setSelectedUniversity(uni)}
                        className="font-bold text-slate-900 hover:text-blue-700 text-base cursor-pointer line-clamp-1"
                      >
                        {uni.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {uni.city}, {uni.province} • {uni.type}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">Overall</div>
                      <div className="font-mono font-bold text-blue-900">{uni.scores.overall}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">Employability</div>
                      <div className="font-mono font-bold text-emerald-800">
                        {uni.scores.employability}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold">Research</div>
                      <div className="font-mono font-bold text-indigo-900">
                        {uni.scores.researchOutput}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedUniversity(uni)}
                    className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      if (isInCompare) {
                        removeFromCompare(uni.id);
                      } else {
                        addToCompare(uni);
                      }
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
                      isInCompare
                        ? 'bg-blue-700 border-blue-700 text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isInCompare ? 'Added' : 'Compare'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
