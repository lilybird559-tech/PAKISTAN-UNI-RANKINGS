import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { University } from '../../types/university';
import { RANKING_METHODOLOGY_CRITERIA } from '../../data/universitiesData';
import {
  Trophy,
  ArrowUp,
  ArrowDown,
  Minus,
  Search,
  Filter,
  Info,
  Scale,
  Heart,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  Smile,
  Globe,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const RankingsView: React.FC = () => {
  const {
    universities,
    setSelectedUniversity,
    addToCompare,
    removeFromCompare,
    compareList,
    favorites,
    toggleFavorite,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'rank' | 'score'>('rank');
  const [expandedUniId, setExpandedUniId] = useState<string | null>(null);

  // Icon mapping for methodology criteria
  const getCriteriaIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-blue-700" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-teal-600" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-emerald-600" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-amber-600" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-rose-600" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-600" />;
      default:
        return <Award className="w-5 h-5 text-purple-600" />;
    }
  };

  const filteredRankings = useMemo(() => {
    return universities
      .filter((uni) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesName = uni.name.toLowerCase().includes(q);
          const matchesShort = uni.shortName.toLowerCase().includes(q);
          const matchesCity = uni.city.toLowerCase().includes(q);
          if (!matchesName && !matchesShort && !matchesCity) return false;
        }

        if (provinceFilter !== 'All' && uni.province !== provinceFilter) return false;
        if (typeFilter !== 'All' && uni.type !== typeFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score') {
          return b.scores.overall - a.scores.overall;
        }
        return a.currentRank - b.currentRank;
      });
  }, [universities, searchQuery, provinceFilter, typeFilter, sortBy]);

  const toggleExpand = (uniId: string) => {
    setExpandedUniId((prev) => (prev === uniId ? null : uniId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* 1. Header & Context */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-7 h-7 text-amber-500" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pakistan National University Rankings 2026
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Performance assessment scores across research output, academic reputation, faculty credentials, and graduate
            employability.
          </p>
        </div>

        {/* Quick Badges */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100/70 text-blue-900 rounded-full text-xs font-bold border border-blue-200">
            2026 Academic Cycle
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">
            Sample Ranking Data
          </span>
        </div>
      </div>

      {/* 2. Accuracy Notice */}
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-bold text-amber-900 uppercase tracking-wider">
            Important Information & Disclaimer Notice
          </div>
          <p className="text-amber-900/90 leading-relaxed">
            Rankings displayed on this website are synthesized for informational/demo purposes using our institutional
            evaluation criteria unless explicitly identified as sourced directly from a statutory regulatory body (e.g.,
            HEC, PEC, PMDC).
          </p>
        </div>
      </div>

      {/* 3. Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search university or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Province */}
          <select
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
          >
            <option value="All">All Provinces</option>
            <option value="Islamabad ICT">Islamabad ICT</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
            <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
          </select>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
          >
            <option value="All">All Types</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          {/* Sort */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setSortBy('rank')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                sortBy === 'rank' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sort by Rank
            </button>
            <button
              onClick={() => setSortBy('score')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                sortBy === 'score' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sort by Score
            </button>
          </div>
        </div>
      </div>

      {/* 4. PROFESSIONAL RANKING TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-200 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-4 py-4 text-center w-16">Rank</th>
                <th className="px-5 py-4">University</th>
                <th className="px-4 py-4">City</th>
                <th className="px-4 py-4 hidden md:table-cell">Province</th>
                <th className="px-3 py-4 text-center">Type</th>
                <th className="px-4 py-4 text-center">Score</th>
                <th className="px-3 py-4 text-center hidden sm:table-cell">Prev Rank</th>
                <th className="px-4 py-4 text-center">Change</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRankings.map((uni) => {
                const isTop1 = uni.currentRank === 1;
                const isTop2 = uni.currentRank === 2;
                const isTop3 = uni.currentRank === 3;
                const isExpanded = expandedUniId === uni.id;
                const isFav = favorites.includes(uni.id);
                const isInCompare = compareList.some((c) => c.id === uni.id);

                return (
                  <React.Fragment key={uni.id}>
                    <tr
                      className={`transition-colors ${
                        isTop1
                          ? 'bg-amber-50/40 hover:bg-amber-50/80'
                          : isTop2
                          ? 'bg-slate-50/70 hover:bg-slate-100/80'
                          : isTop3
                          ? 'bg-orange-50/30 hover:bg-orange-50/70'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Rank Column with Medals */}
                      <td className="px-4 py-4 text-center font-bold">
                        {isTop1 ? (
                          <div className="w-9 h-9 mx-auto flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black rounded-xl shadow-xs ring-2 ring-amber-300">
                            🥇 1
                          </div>
                        ) : isTop2 ? (
                          <div className="w-9 h-9 mx-auto flex items-center justify-center bg-slate-200 text-slate-800 font-black rounded-xl ring-2 ring-slate-300">
                            🥈 2
                          </div>
                        ) : isTop3 ? (
                          <div className="w-9 h-9 mx-auto flex items-center justify-center bg-amber-100 text-amber-900 font-black rounded-xl ring-2 ring-amber-200">
                            🥉 3
                          </div>
                        ) : (
                          <span className="w-7 h-7 mx-auto flex items-center justify-center bg-slate-100 text-slate-700 font-bold rounded-lg text-xs">
                            {uni.currentRank}
                          </span>
                        )}
                      </td>

                      {/* University Name & Logo */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={uni.logo}
                            alt={uni.shortName}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <button
                              onClick={() => setSelectedUniversity(uni)}
                              className="font-bold text-blue-950 hover:text-blue-700 text-left line-clamp-1 transition-colors"
                            >
                              {uni.name}
                            </button>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                              <span className="font-semibold text-slate-700">{uni.shortName}</span>
                              <span>•</span>
                              <span>Est. {uni.established}</span>
                              {uni.isFeatured && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* City */}
                      <td className="px-4 py-4 text-xs font-medium text-slate-700">{uni.city}</td>

                      {/* Province */}
                      <td className="px-4 py-4 text-xs text-slate-500 hidden md:table-cell">
                        {uni.province}
                      </td>

                      {/* Type */}
                      <td className="px-3 py-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            uni.type === 'Public'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {uni.type.toUpperCase()}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="px-4 py-4 text-center">
                        <span className="font-mono font-extrabold text-blue-950 text-base">
                          {uni.scores.overall.toFixed(1)}
                        </span>
                      </td>

                      {/* Prev Rank */}
                      <td className="px-3 py-4 text-center text-xs font-mono text-slate-500 hidden sm:table-cell">
                        #{uni.previousRank}
                      </td>

                      {/* Change Movement Indicator */}
                      <td className="px-4 py-4 text-center">
                        {uni.rankChange > 0 ? (
                          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <ArrowUp className="w-3 h-3" />
                            <span>+{uni.rankChange}</span>
                          </span>
                        ) : uni.rankChange < 0 ? (
                          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            <ArrowDown className="w-3 h-3" />
                            <span>{uni.rankChange}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            <Minus className="w-3 h-3" />
                            <span>0</span>
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Score Breakdown toggle */}
                          <button
                            onClick={() => toggleExpand(uni.id)}
                            className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                              isExpanded
                                ? 'bg-blue-900 border-blue-900 text-white'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                            title="Inspect score breakdown"
                          >
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => toggleFavorite(uni.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
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
                            className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                              isInCompare
                                ? 'bg-blue-700 border-blue-700 text-white'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                            title="Compare"
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setSelectedUniversity(uni)}
                            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-bold transition-colors"
                          >
                            Profile
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDABLE CRITERIA BREAKDOWN DRAWER */}
                    {isExpanded && (
                      <tr className="bg-blue-50/30 border-y border-blue-100/80">
                        <td colSpan={9} className="px-6 py-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                                Metric Score Breakdown for {uni.name}
                              </span>
                              <span className="text-slate-500">Scale: 0 - 100</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-center">
                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                <div className="text-[10px] text-slate-500 font-semibold truncate">Academic Rep</div>
                                <div className="font-mono font-bold text-blue-900 text-sm mt-0.5">
                                  {uni.scores.academicReputation}
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                  <div
                                    className="bg-blue-600 h-full rounded-full"
                                    style={{ width: `${uni.scores.academicReputation}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                <div className="text-[10px] text-slate-500 font-semibold truncate">Research Output</div>
                                <div className="font-mono font-bold text-indigo-900 text-sm mt-0.5">
                                  {uni.scores.researchOutput}
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                  <div
                                    className="bg-indigo-600 h-full rounded-full"
                                    style={{ width: `${uni.scores.researchOutput}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                <div className="text-[10px] text-slate-500 font-semibold truncate">Faculty Quality</div>
                                <div className="font-mono font-bold text-teal-900 text-sm mt-0.5">
                                  {uni.scores.facultyQuality}
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                  <div
                                    className="bg-teal-600 h-full rounded-full"
                                    style={{ width: `${uni.scores.facultyQuality}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                <div className="text-[10px] text-slate-500 font-semibold truncate">Employability</div>
                                <div className="font-mono font-bold text-emerald-900 text-sm mt-0.5">
                                  {uni.scores.employability}
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                  <div
                                    className="bg-emerald-600 h-full rounded-full"
                                    style={{ width: `${uni.scores.employability}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                <div className="text-[10px] text-slate-500 font-semibold truncate">Student Sat.</div>
                                <div className="font-mono font-bold text-rose-900 text-sm mt-0.5">
                                  {uni.scores.studentSatisfaction}
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                  <div
                                    className="bg-rose-500 h-full rounded-full"
                                    style={{ width: `${uni.scores.studentSatisfaction}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                <div className="text-[10px] text-slate-500 font-semibold truncate">Infrastructure</div>
                                <div className="font-mono font-bold text-amber-900 text-sm mt-0.5">
                                  {uni.scores.infrastructure}
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                  <div
                                    className="bg-amber-500 h-full rounded-full"
                                    style={{ width: `${uni.scores.infrastructure}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                <div className="text-[10px] text-slate-500 font-semibold truncate">International</div>
                                <div className="font-mono font-bold text-sky-900 text-sm mt-0.5">
                                  {uni.scores.internationalization}
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                  <div
                                    className="bg-sky-500 h-full rounded-full"
                                    style={{ width: `${uni.scores.internationalization}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                                <div className="text-[10px] text-slate-500 font-semibold truncate">Citations/Fac</div>
                                <div className="font-mono font-bold text-purple-900 text-sm mt-0.5">
                                  {uni.scores.citationsPerFaculty}
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                  <div
                                    className="bg-purple-600 h-full rounded-full"
                                    style={{ width: `${uni.scores.citationsPerFaculty}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. RANKING METHODOLOGY EXPLANATION SECTION */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Assessment Framework</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            How Are Pakistan University Rankings Calculated?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our multi-dimensional ranking model evaluates higher education institutes using 8 weighted quality
            dimensions designed to reflect global research rigor and local industry impact.
          </p>
        </div>

        {/* 8 Criteria Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {RANKING_METHODOLOGY_CRITERIA.map((crit) => (
            <div
              key={crit.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-xs hover:border-blue-200 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-white shadow-2xs border border-slate-100">
                  {getCriteriaIcon(crit.iconName)}
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md text-xs font-extrabold font-mono">
                  {crit.weight}%
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{crit.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{crit.description}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer footer */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800">Notice on Institutional Rankings:</span> Unless explicitly noted,
            scores are modeled to illustrate relative institutional performance in Pakistan. For university inquiries or
            data corrections, please contact our academic review team.
          </div>
        </div>
      </section>
    </div>
  );
};
