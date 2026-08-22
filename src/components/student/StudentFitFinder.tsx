import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { University } from '../../types/university';
import {
  Sparkles,
  Search,
  Award,
  GraduationCap,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Scale,
  Heart,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const StudentFitFinder: React.FC = () => {
  const {
    universities,
    setSelectedUniversity,
    addToCompare,
    removeFromCompare,
    compareList,
    favorites,
    toggleFavorite,
  } = useApp();

  const [percentage, setPercentage] = useState<number>(80);
  const [field, setField] = useState<string>('Engineering');
  const [province, setProvince] = useState<string>('All');
  const [type, setType] = useState<string>('All');
  const [needHostel, setNeedHostel] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  // Recommendation engine logic
  const matches = React.useMemo(() => {
    return universities
      .filter((uni) => {
        // Field match
        if (field !== 'All') {
          const catKey = field as keyof typeof uni.categoryRanks;
          const hasCategory = uni.categoryRanks[catKey] !== undefined;
          const hasInPrograms = uni.popularPrograms.some((p) =>
            p.toLowerCase().includes(field.toLowerCase())
          );
          if (!hasCategory && !hasInPrograms) return false;
        }

        // Province match
        if (province !== 'All' && uni.province !== province) return false;

        // Type match
        if (type !== 'All' && uni.type !== type) return false;

        // Hostel match
        if (needHostel && !uni.hostelFacility) return false;

        return true;
      })
      .map((uni) => {
        // Merit cutoff baseline estimation based on ranking score
        // Top universities like NUST/LUMS/QAU have 82-88% merit
        const baseMerit = Math.min(88, Math.max(60, uni.scores.overall * 0.88));
        const diff = percentage - baseMerit;

        let tier: 'high' | 'target' | 'reach' = 'target';
        let matchDescription = 'Good admission probability based on standard merit trends';

        if (diff >= 4) {
          tier = 'high';
          matchDescription = 'High probability of securing admission / Merit comfortably cleared';
        } else if (diff >= -4) {
          tier = 'target';
          matchDescription = 'Competitive target — active preparation for entry test advised';
        } else {
          tier = 'reach';
          matchDescription = 'Ambitious target — strong entry test score required to compensate';
        }

        return {
          university: uni,
          estimatedMerit: Math.round(baseMerit),
          tier,
          matchDescription,
        };
      })
      .sort((a, b) => {
        // High -> Target -> Reach, then by rank
        const tierOrder = { high: 1, target: 2, reach: 3 };
        if (tierOrder[a.tier] !== tierOrder[b.tier]) {
          return tierOrder[a.tier] - tierOrder[b.tier];
        }
        return a.university.currentRank - b.university.currentRank;
      });
  }, [universities, percentage, field, province, type, needHostel]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-amber-500" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student University Match Finder 2026
          </h1>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Calculate your estimated admission compatibility across top Pakistani universities based on your academic
          percentage and field of study.
        </p>
      </div>

      {/* INPUT PANEL */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Academic Percentage Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                FSC / A-Level / Matric %
              </label>
              <span className="font-mono font-extrabold text-blue-900 text-lg bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                {percentage}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="98"
              step="1"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>50% (Pass)</span>
              <span>75% (1st Div)</span>
              <span>90%+ (Gold)</span>
            </div>
          </div>

          {/* 2. Field of Interest */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Field of Interest
            </label>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="Engineering">Engineering & Technology</option>
              <option value="Computer Science & AI">Computer Science, AI & IT</option>
              <option value="Medical & Health Sciences">Medical, Dental & Pharmacy</option>
              <option value="Business & Management">Business, Economics & Finance</option>
              <option value="Law & Legal Studies">Law & Jurisprudence</option>
              <option value="Agriculture & Veterinary">Agriculture & Food Sciences</option>
              <option value="Research & Science">Natural Sciences & Physics</option>
              <option value="All">All Disciplines</option>
            </select>
          </div>

          {/* 3. Preferred Province */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Preferred Region
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="All">All Pakistan</option>
              <option value="Islamabad ICT">Islamabad (Federal)</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Azad Jammu & Kashmir">Azad Kashmir</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            </select>
          </div>

          {/* 4. Type & Hostel Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Sector & Hostels
            </label>
            <div className="flex items-center gap-2">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden"
              >
                <option value="All">All Sectors</option>
                <option value="Public">Public (Govt)</option>
                <option value="Private">Private</option>
              </select>

              <label className="w-1/2 flex items-center justify-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={needHostel}
                  onChange={(e) => setNeedHostel(e.target.checked)}
                  className="rounded text-blue-700"
                />
                <span>Hostel Req.</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* MATCH RESULTS SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Matched Universities ({matches.length} Options)
            </h2>
            <p className="text-xs text-slate-500">
              Showing institutions grouped by estimated aggregate compatibility for {percentage}% score
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-green-800 rounded-lg font-bold">
              ✓ High Probability
            </span>
            <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg font-bold">
              ⚡ Target Match
            </span>
            <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg font-bold">
              🎯 Dream / Reach
            </span>
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Direct Matches Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try switching your region to "All Pakistan" or exploring other disciplines.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map(({ university: uni, estimatedMerit, tier, matchDescription }) => {
              const isFav = favorites.includes(uni.id);
              const isInCompare = compareList.some((c) => c.id === uni.id);

              const tierBadge =
                tier === 'high'
                  ? 'bg-green-100 text-green-900 border-green-300'
                  : tier === 'target'
                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300';

              const tierLabel =
                tier === 'high' ? 'High Probability' : tier === 'target' ? 'Target Match' : 'Reach Target';

              return (
                <div
                  key={uni.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Tier badge & Rank */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-extrabold border ${tierBadge}`}>
                        {tierLabel}
                      </span>
                      <span className="text-xs font-bold text-slate-500">Rank #{uni.currentRank}</span>
                    </div>

                    {/* Uni Logo & Name */}
                    <div className="flex items-start gap-3">
                      <img
                        src={uni.logo}
                        alt={uni.shortName}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <h3
                          onClick={() => setSelectedUniversity(uni)}
                          className="font-bold text-slate-900 hover:text-blue-700 text-base leading-snug cursor-pointer line-clamp-1"
                        >
                          {uni.name}
                        </h3>
                        <p className="text-xs text-slate-500">{uni.city}, {uni.province}</p>
                      </div>
                    </div>

                    {/* Merit Estimate & Match explanation */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Estimated Merit Cutoff:</span>
                        <span className="font-mono font-black text-blue-900">~{estimatedMerit}%</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{matchDescription}</p>
                    </div>

                    {/* Popular Programs */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Recommended Degrees:</span>
                      <div className="flex flex-wrap gap-1">
                        {uni.popularPrograms.slice(0, 2).map((p, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedUniversity(uni)}
                      className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toggleFavorite(uni.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isFav
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : 'border-slate-200 text-slate-400 hover:text-rose-500'
                      }`}
                      title="Save"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
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
    </div>
  );
};
