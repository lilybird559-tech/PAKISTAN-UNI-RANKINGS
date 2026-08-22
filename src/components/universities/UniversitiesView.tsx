import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { University, UniversityType, Province } from '../../types/university';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Building,
  GraduationCap,
  Award,
  ExternalLink,
  Heart,
  Scale,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';

export const UniversitiesView: React.FC = () => {
  const {
    universities,
    setSelectedUniversity,
    addToCompare,
    removeFromCompare,
    compareList,
    favorites,
    toggleFavorite,
    filters,
    setFilters,
    resetFilters,
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 9;

  // Distinct lists for dropdowns
  const provinces: string[] = [
    'All',
    'Islamabad ICT',
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Azad Jammu & Kashmir',
    'Gilgit-Baltistan',
  ];

  const cities: string[] = useMemo(() => {
    const citySet = new Set<string>();
    universities.forEach((u) => citySet.add(u.city));
    return ['All', ...Array.from(citySet).sort()];
  }, [universities]);

  const categories: string[] = [
    'All',
    'Engineering',
    'Computer Science & AI',
    'Medical & Health Sciences',
    'Business & Management',
    'Law & Legal Studies',
    'Arts & Humanities',
    'Agriculture & Veterinary',
    'Research & Science',
  ];

  // Filtering & Sorting logic
  const filteredUniversities = useMemo(() => {
    return universities
      .filter((uni) => {
        // Search query (name, shortName, city, programs)
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matchesName = uni.name.toLowerCase().includes(q);
          const matchesShort = uni.shortName.toLowerCase().includes(q);
          const matchesCity = uni.city.toLowerCase().includes(q);
          const matchesProvince = uni.province.toLowerCase().includes(q);
          const matchesPrograms = uni.popularPrograms.some((p) => p.toLowerCase().includes(q));
          if (!matchesName && !matchesShort && !matchesCity && !matchesProvince && !matchesPrograms) {
            return false;
          }
        }

        // Province filter
        if (filters.province !== 'All' && uni.province !== filters.province) {
          return false;
        }

        // City filter
        if (filters.city !== 'All' && uni.city !== filters.city) {
          return false;
        }

        // Type filter (Public/Private)
        if (filters.type !== 'All' && uni.type !== filters.type) {
          return false;
        }

        // Category filter
        if (filters.category !== 'All') {
          const categoryKey = filters.category as keyof typeof uni.categoryRanks;
          if (!uni.categoryRanks[categoryKey]) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'rank') {
          return filters.sortOrder === 'asc'
            ? a.currentRank - b.currentRank
            : b.currentRank - a.currentRank;
        }
        if (filters.sortBy === 'score') {
          return filters.sortOrder === 'asc'
            ? a.scores.overall - b.scores.overall
            : b.scores.overall - a.scores.overall;
        }
        if (filters.sortBy === 'name') {
          return filters.sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (filters.sortBy === 'established') {
          return filters.sortOrder === 'asc'
            ? a.established - b.established
            : b.established - a.established;
        }
        return a.currentRank - b.currentRank;
      });
  }, [universities, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage) || 1;
  const paginatedUniversities = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredUniversities.slice(start, start + itemsPerPage);
  }, [filteredUniversities, currentPageNum]);

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.province !== 'All' ||
    filters.city !== 'All' ||
    filters.type !== 'All' ||
    filters.category !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-20">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-900" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Universities Directory of Pakistan
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Explore verified accredited public and private universities across Islamabad, Punjab, Sindh, KPK,
            Balochistan, AJ&K, and Gilgit-Baltistan.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR PANEL */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
              setCurrentPageNum(1);
            }}
            placeholder="Search by university name, short name (e.g. NUST, LUMS, IBA), city, or degree..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          {/* Province */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Province / Region
            </label>
            <select
              value={filters.province}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, province: e.target.value, city: 'All' }));
                setCurrentPageNum(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
            >
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              City
            </label>
            <select
              value={filters.city}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, city: e.target.value }));
                setCurrentPageNum(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Sector / Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, type: e.target.value }));
                setCurrentPageNum(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="All">All Types</option>
              <option value="Public">Public (Govt)</option>
              <option value="Private">Private</option>
              <option value="Semi-Government">Semi-Government</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, category: e.target.value }));
                setCurrentPageNum(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Sort By
            </label>
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('-') as [
                  'rank' | 'score' | 'name' | 'established',
                  'asc' | 'desc'
                ];
                setFilters((prev) => ({ ...prev, sortBy: by, sortOrder: order }));
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="rank-asc">Rank (1 to 30)</option>
              <option value="score-desc">Overall Score (High to Low)</option>
              <option value="name-asc">Name (A to Z)</option>
              <option value="established-asc">Oldest First</option>
              <option value="established-desc">Newest First</option>
            </select>
          </div>
        </div>

        {/* Results Count & Reset Filter Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Found <span className="font-bold text-blue-900">{filteredUniversities.length}</span> universities matching
            your criteria
          </div>

          {hasActiveFilters && (
            <button
              onClick={() => {
                resetFilters();
                setCurrentPageNum(1);
              }}
              className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* RESULTS DISPLAY: GRID OR TABLE */}
      {filteredUniversities.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Universities Found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn't find any institutions matching your search or filters. Try adjusting your filters or clearing
            your search query.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedUniversities.map((uni) => {
            const isFav = favorites.includes(uni.id);
            const isInCompare = compareList.some((c) => c.id === uni.id);

            return (
              <div
                key={uni.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Banner header with logo */}
                  <div className="relative h-28 bg-slate-900 overflow-hidden">
                    <img
                      src={uni.bannerImage}
                      alt={uni.name}
                      className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>

                    {/* Rank pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-white rounded-lg text-xs font-bold border border-white/10 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Rank #{uni.currentRank}</span>
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          uni.type === 'Public' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                        }`}
                      >
                        {uni.type}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(uni.id)}
                      className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                        isFav
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-900/80 text-slate-300 hover:text-rose-400'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* University Name preview on banner */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="flex items-center gap-1 text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-blue-300" />
                        {uni.city}, {uni.province}
                      </span>
                      <span className="text-[11px] text-slate-300">Est. {uni.established}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={uni.logo}
                        alt={uni.shortName}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          onClick={() => setSelectedUniversity(uni)}
                          className="font-bold text-slate-900 hover:text-blue-700 transition-colors text-base leading-snug cursor-pointer line-clamp-1"
                        >
                          {uni.name}
                        </h3>
                        <p className="text-xs text-slate-500">{uni.shortName}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {uni.description}
                    </p>

                    {/* Key Metrics Chips */}
                    <div className="grid grid-cols-3 gap-2 py-2 bg-slate-50 rounded-xl text-center border border-slate-100">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold">Overall</div>
                        <div className="font-mono font-bold text-blue-900 text-sm">
                          {uni.scores.overall}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold">Research</div>
                        <div className="font-mono font-bold text-indigo-900 text-sm">
                          {uni.scores.researchOutput}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold">Employability</div>
                        <div className="font-mono font-bold text-emerald-800 text-sm">
                          {uni.scores.employability}
                        </div>
                      </div>
                    </div>

                    {/* Popular Programs Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {uni.popularPrograms.slice(0, 2).map((prog, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium truncate max-w-[140px]"
                        >
                          {prog}
                        </span>
                      ))}
                      {uni.popularPrograms.length > 2 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{uni.popularPrograms.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedUniversity(uni)}
                    className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold transition-colors"
                  >
                    View Details
                  </button>
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors"
                    title="Visit Official Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
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
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3.5 text-center">Rank</th>
                  <th className="px-4 py-3.5">University</th>
                  <th className="px-4 py-3.5">City & Province</th>
                  <th className="px-3 py-3.5 text-center">Type</th>
                  <th className="px-3 py-3.5 text-center">Score</th>
                  <th className="px-4 py-3.5 text-center">Employability</th>
                  <th className="px-4 py-3.5 text-center">Research</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedUniversities.map((uni) => {
                  const isFav = favorites.includes(uni.id);
                  const isInCompare = compareList.some((c) => c.id === uni.id);

                  return (
                    <tr key={uni.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-4 text-center">
                        <span className="w-7 h-7 mx-auto flex items-center justify-center bg-slate-100 text-slate-700 font-bold rounded-full text-xs">
                          {uni.currentRank}
                        </span>
                      </td>

                      <td className="px-4 py-4">
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
                            <div className="text-xs text-slate-500">{uni.shortName} • Est. {uni.established}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-xs text-slate-600">
                        <div className="font-medium text-slate-800">{uni.city}</div>
                        <div className="text-slate-400">{uni.province}</div>
                      </td>

                      <td className="px-3 py-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            uni.type === 'Public'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {uni.type}
                        </span>
                      </td>

                      <td className="px-3 py-4 text-center font-mono font-bold text-blue-900">
                        {uni.scores.overall}
                      </td>

                      <td className="px-4 py-4 text-center font-mono text-xs text-emerald-700 font-semibold">
                        {uni.scores.employability}
                      </td>

                      <td className="px-4 py-4 text-center font-mono text-xs text-indigo-700 font-semibold">
                        {uni.scores.researchOutput}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => toggleFavorite(uni.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isFav
                                ? 'bg-rose-50 border-rose-200 text-rose-600'
                                : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-50'
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
                            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-bold transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-xs text-slate-500">
            Showing {(currentPageNum - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPageNum * itemsPerPage, filteredUniversities.length)} of{' '}
            {filteredUniversities.length} universities
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPageNum - 1)}
              disabled={currentPageNum === 1}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  currentPageNum === pageNum
                    ? 'bg-blue-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPageNum + 1)}
              disabled={currentPageNum === totalPages}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
