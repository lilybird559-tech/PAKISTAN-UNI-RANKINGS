import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { University } from '../../types/university';
import {
  Scale,
  Plus,
  X,
  Trophy,
  CheckCircle2,
  Building,
  MapPin,
  GraduationCap,
  Award,
  Users,
  Briefcase,
  BookOpen,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Check,
} from 'lucide-react';

export const CompareView: React.FC = () => {
  const {
    compareList,
    universities,
    addToCompare,
    removeFromCompare,
    clearCompare,
    setSelectedUniversity,
    setCurrentPage,
  } = useApp();

  const [addSearchQuery, setAddSearchQuery] = useState('');
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  // Available universities not in compare
  const availableToCompare = universities.filter(
    (u) => !compareList.some((c) => c.id === u.id) &&
      (addSearchQuery === '' ||
        u.name.toLowerCase().includes(addSearchQuery.toLowerCase()) ||
        u.shortName.toLowerCase().includes(addSearchQuery.toLowerCase()) ||
        u.city.toLowerCase().includes(addSearchQuery.toLowerCase()))
  );

  // Helper to find the winner for a specific numeric score
  const getWinnerId = (scoreKey: keyof University['scores']) => {
    if (compareList.length < 2) return null;
    let maxVal = -1;
    let winnerId = '';
    compareList.forEach((u) => {
      const val = u.scores[scoreKey];
      if (val > maxVal) {
        maxVal = val;
        winnerId = u.id;
      }
    });
    return winnerId;
  };

  const metricsToCompare = [
    { key: 'overall' as const, label: 'Overall Score', weight: 'Total' },
    { key: 'academicReputation' as const, label: 'Academic Reputation', weight: '25%' },
    { key: 'researchOutput' as const, label: 'Research Citations & Output', weight: '20%' },
    { key: 'employability' as const, label: 'Graduate Employability', weight: '15%' },
    { key: 'facultyQuality' as const, label: 'Faculty Credentials & PhDs', weight: '15%' },
    { key: 'infrastructure' as const, label: 'Campus & Digital Infrastructure', weight: '10%' },
    { key: 'studentSatisfaction' as const, label: 'Student Satisfaction & Societies', weight: '5%' },
    { key: 'internationalization' as const, label: 'International Linkages & Exchange', weight: '5%' },
  ];

  // Colors for each compared university column
  const columnColors = [
    {
      border: 'border-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      bar: 'bg-blue-600',
      badge: 'bg-blue-100 text-blue-800',
    },
    {
      border: 'border-emerald-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      bar: 'bg-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800',
    },
    {
      border: 'border-amber-500',
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      bar: 'bg-amber-600',
      badge: 'bg-amber-100 text-amber-800',
    },
    {
      border: 'border-purple-500',
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      bar: 'bg-purple-600',
      badge: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-7 h-7 text-blue-900" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Pakistani Universities
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Analyze academic scores, faculty ratios, research volume, campus facilities, and graduate employability
            side-by-side.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Selection</span>
            </button>
          )}

          <button
            onClick={() => setCurrentPage('universities')}
            className="px-4 py-2 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors"
          >
            + Browse More Universities
          </button>
        </div>
      </div>

      {/* When 0 or 1 university is selected, show helpful prompt */}
      {compareList.length < 2 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-center space-y-5">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-700">
            <Scale className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              {compareList.length === 0
                ? 'Select 2 to 4 Universities to Compare'
                : 'Select At Least One More University'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Choose from Pakistan's top-ranked public and private institutions like NUST, LUMS, QAU, COMSATS, UET, or
              Aga Khan University.
            </p>
          </div>

          {/* Quick preset pickers */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Popular Comparisons:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => {
                  clearCompare();
                  const nust = universities.find((u) => u.id === 'nust-islamabad');
                  const lums = universities.find((u) => u.id === 'lums-lahore');
                  if (nust) addToCompare(nust);
                  if (lums) addToCompare(lums);
                }}
                className="px-4 py-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-900 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
              >
                NUST Islamabad vs LUMS Lahore
              </button>

              <button
                onClick={() => {
                  clearCompare();
                  const nust = universities.find((u) => u.id === 'nust-islamabad');
                  const uet = universities.find((u) => u.id === 'uet-lahore');
                  const giki = universities.find((u) => u.id === 'giki-topi');
                  if (nust) addToCompare(nust);
                  if (uet) addToCompare(uet);
                  if (giki) addToCompare(giki);
                }}
                className="px-4 py-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-900 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
              >
                NUST vs UET vs GIKI (Top Engineering)
              </button>

              <button
                onClick={() => {
                  clearCompare();
                  const aku = universities.find((u) => u.id === 'aku-karachi');
                  const kemu = universities.find((u) => u.id === 'kemu-lahore');
                  if (aku) addToCompare(aku);
                  if (kemu) addToCompare(kemu);
                }}
                className="px-4 py-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-900 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
              >
                Aga Khan University vs KEMU Lahore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* University Add Bar / Selector (if compareList < 4) */}
      {compareList.length < 4 && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 relative">
          <div className="flex items-center gap-2.5 text-xs text-blue-950 font-medium">
            <Plus className="w-4 h-4 text-blue-700" />
            <span>
              You have selected {compareList.length} university. You can add up to {4 - compareList.length} more.
            </span>
          </div>

          <div className="relative w-full sm:w-72">
            <button
              onClick={() => setShowAddDropdown(!showAddDropdown)}
              className="w-full bg-white border border-blue-300 rounded-xl px-3.5 py-2 text-xs font-bold text-blue-900 flex items-center justify-between shadow-2xs"
            >
              <span>+ Add University to Compare</span>
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown list */}
            {showAddDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 p-3 space-y-2">
                <input
                  type="text"
                  value={addSearchQuery}
                  onChange={(e) => setAddSearchQuery(e.target.value)}
                  placeholder="Filter university by name..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-hidden"
                />
                <div className="max-h-60 overflow-y-auto space-y-1 divide-y divide-slate-100 pr-1">
                  {availableToCompare.slice(0, 10).map((uni) => (
                    <div
                      key={uni.id}
                      onClick={() => {
                        addToCompare(uni);
                        setShowAddDropdown(false);
                        setAddSearchQuery('');
                      }}
                      className="pt-1.5 pb-1 flex items-center justify-between hover:bg-blue-50 p-1.5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={uni.logo}
                          alt={uni.shortName}
                          className="w-6 h-6 rounded-sm object-cover"
                        />
                        <div>
                          <div className="font-bold text-xs text-slate-900 line-clamp-1">{uni.name}</div>
                          <div className="text-[10px] text-slate-500">
                            Rank #{uni.currentRank} • {uni.city}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-blue-700 font-bold">+ Add</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPARISON CARDS & METRICS TABLE */}
      {compareList.length > 0 && (
        <div className="space-y-8">
          {/* 1. UNIVERSITY HEADER CARDS GRID */}
          <div
            className={`grid gap-4 ${
              compareList.length === 1
                ? 'grid-cols-1'
                : compareList.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : compareList.length === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {compareList.map((uni, idx) => {
              const colors = columnColors[idx % columnColors.length];

              return (
                <div
                  key={uni.id}
                  className={`bg-white rounded-2xl border-2 ${colors.border} p-5 shadow-xs flex flex-col justify-between relative space-y-4`}
                >
                  {/* Top Remove button */}
                  <button
                    onClick={() => removeFromCompare(uni.id)}
                    className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={uni.logo}
                        alt={uni.shortName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="pr-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${colors.badge}`}>
                          Rank #{uni.currentRank}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 mt-1">
                          {uni.name}
                        </h3>
                        <p className="text-xs text-slate-500">{uni.city}, {uni.province}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Overall Score</div>
                        <div className="text-2xl font-black text-slate-900 font-mono">
                          {uni.scores.overall}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          uni.type === 'Public'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {uni.type} Sector
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedUniversity(uni)}
                    className="w-full py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    View Full Profile
                  </button>
                </div>
              );
            })}
          </div>

          {/* 2. COMPARATIVE VISUAL SCORE BARS */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Performance Metric Benchmarks (0 - 100)</span>
                </h3>
                <p className="text-xs text-slate-500">Visual comparison across weighted quality indicators</p>
              </div>

              {/* Legend */}
              <div className="hidden sm:flex items-center gap-4 text-xs font-bold">
                {compareList.map((uni, idx) => (
                  <div key={uni.id} className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full ${columnColors[idx].bar}`}></span>
                    <span className="text-slate-700">{uni.shortName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Comparison Bars */}
            <div className="space-y-6">
              {metricsToCompare.map((metric) => {
                const winnerId = getWinnerId(metric.key);

                return (
                  <div key={metric.key} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{metric.label}</span>
                        <span className="px-2 py-0.2 bg-slate-100 text-slate-500 rounded text-[10px] font-semibold">
                          Weight: {metric.weight}
                        </span>
                      </div>

                      {winnerId && (
                        <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" />
                          <span>
                            Top:{' '}
                            {compareList.find((u) => u.id === winnerId)?.shortName} (
                            {compareList.find((u) => u.id === winnerId)?.scores[metric.key]}
                            )
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bar comparison grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {compareList.map((uni, idx) => {
                        const scoreVal = uni.scores[metric.key];
                        const isWinner = winnerId === uni.id;
                        const colors = columnColors[idx % columnColors.length];

                        return (
                          <div
                            key={uni.id}
                            className={`p-3 rounded-xl border ${
                              isWinner ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-200' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="font-semibold text-slate-700 truncate">{uni.shortName}</span>
                              <span className="font-mono font-extrabold text-slate-900">{scoreVal}</span>
                            </div>

                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                                style={{ width: `${scoreVal}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. DETAILED SPECS COMPARISON TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Institutional Specifications & Campus Facts</h3>
              <p className="text-xs text-slate-500">Compare student body, campus amenities, faculty, and accreditations</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody className="divide-y divide-slate-100">
                  {/* Established */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50 w-52">Chartered / Est.</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4 font-semibold text-slate-800">
                        {uni.established}
                      </td>
                    ))}
                  </tr>

                  {/* Student Enrollment */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50">Student Enrollment</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4 text-slate-700">
                        {uni.studentEnrollment}
                      </td>
                    ))}
                  </tr>

                  {/* Faculty Count */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50">Faculty Strength</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4 text-slate-700">
                        {uni.facultyCount}
                      </td>
                    ))}
                  </tr>

                  {/* Student-to-Faculty Ratio */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50">Student-Faculty Ratio</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4 font-mono font-bold text-blue-900">
                        {uni.studentFacultyRatio}
                      </td>
                    ))}
                  </tr>

                  {/* Campus Area */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50">Campus Grounds</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4 text-slate-700">
                        {uni.campusArea}
                      </td>
                    ))}
                  </tr>

                  {/* Hostels */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50">Hostel Facilities</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4">
                        {uni.hostelFacility ? (
                          <span className="inline-flex items-center gap-1 text-green-700 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Available (Boys & Girls)
                          </span>
                        ) : (
                          <span className="text-slate-400">Off-campus Only</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Accreditations */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50">Accreditations</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {uni.accreditations.map((acc, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded text-[10px] font-semibold"
                            >
                              {acc}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Popular Programs */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50">Popular Programs</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4">
                        <ul className="space-y-1 text-xs text-slate-700">
                          {uni.popularPrograms.map((prog, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                              <span>{prog}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Official Website */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-500 bg-slate-50/50">Official Portal</td>
                    {compareList.map((uni) => (
                      <td key={uni.id} className="px-6 py-4">
                        <a
                          href={uni.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-bold hover:underline"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
