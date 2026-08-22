import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { University, UniversityCategory } from '../../types/university';
import {
  Search,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Cpu,
  HeartPulse,
  Briefcase,
  Building,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  MapPin,
  Scale,
  Heart,
  Layers,
  GraduationCap,
  ExternalLink,
  ShieldAlert,
  Flame,
  BarChart3,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    universities,
    setCurrentPage,
    setSelectedUniversity,
    addToCompare,
    compareList,
    favorites,
    toggleFavorite,
    setFilters,
  } = useApp();

  const [heroSearchInput, setHeroSearchInput] = useState('');

  // Top 5 universities
  const top5Unis = [...universities]
    .sort((a, b) => a.currentRank - b.currentRank)
    .slice(0, 5);

  // Statistics calculation
  const totalUniversitiesCount = 230;
  const publicCount = universities.filter((u) => u.type === 'Public').length + 130;
  const privateCount = universities.filter((u) => u.type === 'Private').length + 75;
  const engineeringCount = 42;
  const medicalCount = 38;

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      setFilters((prev) => ({
        ...prev,
        searchQuery: heroSearchInput.trim(),
        province: 'All',
        city: 'All',
        type: 'All',
        category: 'All',
      }));
      setCurrentPage('universities');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('universities');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryName,
      searchQuery: '',
    }));
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProvinceClick = (provinceName: string) => {
    setFilters((prev) => ({
      ...prev,
      province: provinceName,
      searchQuery: '',
    }));
    setCurrentPage('universities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoriesOverview = [
    {
      id: 'Engineering',
      title: 'Engineering & Tech',
      count: '42 Universities',
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 hover:bg-blue-100/80 border-blue-100',
      description: 'NUST, UET Lahore, PIEAS, GIKI, NED Karachi',
    },
    {
      id: 'Computer Science & AI',
      title: 'CS, AI & Cyber',
      count: '65 Universities',
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-100',
      description: 'FAST-NUCES, NUST SEECS, LUMS, COMSATS, Air Uni',
    },
    {
      id: 'Medical & Health Sciences',
      title: 'Medical & Dental',
      count: '38 Universities',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50 hover:bg-rose-100/80 border-rose-100',
      description: 'Aga Khan Uni, KEMU Lahore, DUHS Karachi, UOL',
    },
    {
      id: 'Business & Management',
      title: 'Business & Leadership',
      count: '48 Universities',
      icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-100',
      description: 'LUMS SDSB, IBA Karachi, NUST NBS, CUI Business',
    },
    {
      id: 'Research & Science',
      title: 'Research & Natural Sciences',
      count: '30 Universities',
      icon: <BookOpen className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50 hover:bg-purple-100/80 border-purple-100',
      description: 'QAU Islamabad, PIEAS, UoK HEJ, Punjab Uni',
    },
    {
      id: 'Agriculture & Veterinary',
      title: 'Agriculture & Food Tech',
      count: '16 Universities',
      icon: <Building className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-100',
      description: 'UAF Faisalabad, BZU Multan, IUB Bahawalpur, SAU',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900 shadow-sm">
        {/* Background Subtle Circles */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 -mb-24 w-80 h-80 bg-green-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>2026 Higher Education Performance Directory & Rankings</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Pakistan Universities <span className="text-green-400">Rankings 2026</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
            Empowering students and parents to explore, compare, and choose accredited Pakistani universities across
            Islamabad, Punjab, Sindh, KPK, Balochistan, and Gilgit-Baltistan with transparent academic benchmarks.
          </p>

          {/* Search Box */}
          <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto pt-2">
            <div className="bg-white p-1.5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
              <div className="flex items-center gap-3 w-full px-3 py-2 text-slate-800">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={heroSearchInput}
                  onChange={(e) => setHeroSearchInput(e.target.value)}
                  placeholder="Search university by name, city (e.g. NUST, LUMS, Lahore)..."
                  className="w-full bg-transparent border-none outline-hidden text-sm sm:text-base text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shrink-0 transition-all active:scale-98 shadow-sm"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Action CTAs & Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setCurrentPage('rankings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span>Explore Full 2026 Rankings</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs sm:text-sm font-bold border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2"
            >
              <Scale className="w-4 h-4" />
              <span>Compare Universities</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('match-finder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Student Match Finder</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. KEY STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Universities</span>
              <GraduationCap className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-3xl font-extrabold text-blue-950">{totalUniversitiesCount}+</div>
            <p className="text-xs text-slate-500 mt-1">Recognized Higher Education Institutes</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-green-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Public Sector</span>
              <Building className="w-4 h-4 text-green-700" />
            </div>
            <div className="text-3xl font-extrabold text-green-800">{publicCount}</div>
            <p className="text-xs text-slate-500 mt-1">Federal & Provincial Govt</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Private Sector</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-indigo-900">{privateCount}</div>
            <p className="text-xs text-slate-500 mt-1">Chartered Independent Unis</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Engineering</span>
              <Cpu className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-800">{engineeringCount}</div>
            <p className="text-xs text-slate-500 mt-1">PEC Washington Accord Tier</p>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-rose-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Medical & Health</span>
              <HeartPulse className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-3xl font-extrabold text-rose-800">{medicalCount}</div>
            <p className="text-xs text-slate-500 mt-1">PMDC & CPSP Certified</p>
          </div>
        </div>
      </section>

      {/* 3. MAIN DASHBOARD CONTENT: TOP 5 RANKINGS & CATEGORY QUICK ACCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Top 5 Rankings Table Card (8 Columns) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <h2 className="font-bold text-slate-900 text-lg sm:text-xl">
                    Top National Rankings 2026
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Based on academic reputation, research citations, employability & faculty metrics
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded-full text-xs font-bold">
                  2026 Edition
                </span>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                  Sample Data
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3 w-16 text-center">Rank</th>
                    <th className="px-4 py-3">University</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Location</th>
                    <th className="px-3 py-3 text-center hidden md:table-cell">Type</th>
                    <th className="px-4 py-3 text-center">Score</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {top5Unis.map((uni) => {
                    const isFav = favorites.includes(uni.id);
                    const isInCompare = compareList.some((c) => c.id === uni.id);

                    return (
                      <tr key={uni.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Rank Badge */}
                        <td className="px-5 py-4 text-center">
                          {uni.currentRank === 1 ? (
                            <span className="w-8 h-8 mx-auto flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-extrabold rounded-full text-sm shadow-xs ring-2 ring-amber-200">
                              🥇 1
                            </span>
                          ) : uni.currentRank === 2 ? (
                            <span className="w-8 h-8 mx-auto flex items-center justify-center bg-slate-200 text-slate-800 font-extrabold rounded-full text-sm ring-2 ring-slate-100">
                              🥈 2
                            </span>
                          ) : uni.currentRank === 3 ? (
                            <span className="w-8 h-8 mx-auto flex items-center justify-center bg-amber-100 text-amber-900 font-extrabold rounded-full text-sm ring-2 ring-amber-50">
                              🥉 3
                            </span>
                          ) : (
                            <span className="w-7 h-7 mx-auto flex items-center justify-center bg-slate-100 text-slate-600 font-bold rounded-full text-xs">
                              {uni.currentRank}
                            </span>
                          )}
                        </td>

                        {/* Uni Name & Logo */}
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
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                <span className="font-semibold text-slate-700">{uni.shortName}</span>
                                <span className="sm:hidden">• {uni.city}</span>
                                <span className="hidden sm:inline">• Est. {uni.established}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-4 py-4 hidden sm:table-cell text-xs text-slate-600">
                          <div className="font-medium text-slate-800">{uni.city}</div>
                          <div className="text-slate-400">{uni.province}</div>
                        </td>

                        {/* Type */}
                        <td className="px-3 py-4 text-center hidden md:table-cell">
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
                          <span className="font-mono font-extrabold text-blue-900 text-base">
                            {uni.scores.overall.toFixed(1)}
                          </span>
                          <div className="text-[10px] text-slate-400">/ 100</div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => toggleFavorite(uni.id)}
                              title="Save to Favorites"
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isFav
                                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                                  : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-50'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                            </button>

                            <button
                              onClick={() => setSelectedUniversity(uni)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
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

            {/* Table Footer Link */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Showing top 5 of {universities.length} universities
              </span>
              <button
                onClick={() => {
                  setCurrentPage('rankings');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>View Full 2026 Ranking Table</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories & Province Explorer Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Category Quick Selector */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-700" />
                  <span>Browse by Category</span>
                </h3>
                <button
                  onClick={() => {
                    setCurrentPage('categories');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs text-blue-700 font-semibold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2.5">
                {categoriesOverview.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer group flex items-start gap-3 ${cat.bg}`}
                  >
                    <div className="p-2 rounded-lg bg-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 text-sm group-hover:text-blue-900 transition-colors">
                          {cat.title}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">{cat.count}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provinces Quick Pill Filter */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-700" />
                <span>Explore by Province & Territory</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Islamabad ICT', count: 6 },
                  { name: 'Punjab', count: 11 },
                  { name: 'Sindh', count: 6 },
                  { name: 'Khyber Pakhtunkhwa', count: 3 },
                  { name: 'Balochistan', count: 1 },
                  { name: 'Azad Jammu & Kashmir', count: 1 },
                  { name: 'Gilgit-Baltistan', count: 1 },
                ].map((prov) => (
                  <button
                    key={prov.name}
                    onClick={() => handleProvinceClick(prov.name)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-all flex items-center gap-1.5"
                  >
                    <span>{prov.name}</span>
                    <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.2 rounded-full border border-slate-200">
                      {prov.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED TOP UNIVERSITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Featured Centers of Academic Excellence
            </h2>
            <p className="text-sm text-slate-500">
              High-ranking Pakistani institutions with internationally accredited faculties and research hubs
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('universities');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>Browse All {universities.length} Universities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.slice(0, 6).map((uni) => {
            const isFav = favorites.includes(uni.id);
            const isInCompare = compareList.some((c) => c.id === uni.id);

            return (
              <div
                key={uni.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col group"
              >
                {/* Banner Thumbnail */}
                <div className="h-36 relative overflow-hidden bg-slate-900">
                  <img
                    src={uni.bannerImage}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-white rounded-lg text-xs font-bold border border-white/10 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>Rank #{uni.currentRank}</span>
                    </span>

                    <button
                      onClick={() => toggleFavorite(uni.id)}
                      className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                        isFav
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-900/80 text-slate-300 hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* City & Type on banner */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-300" />
                      {uni.city}, {uni.province}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        uni.type === 'Public' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                      }`}
                    >
                      {uni.type}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <img
                        src={uni.logo}
                        alt={uni.shortName}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 mt-0.5"
                      />
                      <div>
                        <h3
                          onClick={() => setSelectedUniversity(uni)}
                          className="font-bold text-slate-900 hover:text-blue-700 transition-colors text-base leading-snug cursor-pointer line-clamp-1"
                        >
                          {uni.name}
                        </h3>
                        <p className="text-xs text-slate-500">Established {uni.established}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {uni.description}
                    </p>
                  </div>

                  {/* Score Breakdown Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-500 font-semibold">Overall Score</div>
                      <div className="font-mono font-bold text-blue-900 text-sm">
                        {uni.scores.overall}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-500 font-semibold">Employability</div>
                      <div className="font-mono font-bold text-emerald-800 text-sm">
                        {uni.scores.employability}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-500 font-semibold">Research</div>
                      <div className="font-mono font-bold text-indigo-900 text-sm">
                        {uni.scores.researchOutput}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setSelectedUniversity(uni)}
                      className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold transition-colors text-center"
                    >
                      View Full Profile
                    </button>
                    <button
                      onClick={() => addToCompare(uni)}
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
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. STUDENT GUIDANCE / MATCH FINDER PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Admission Recommender</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Find Your Perfect University Match Based on Your Grades & Budget
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Input your FSC / A-Levels percentage, desired study field (CS, Engineering, Medical, Business), and
              preferred cities to instantly receive tailored recommendations with cutoff estimations.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setCurrentPage('match-finder');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Launch Student Match Finder</span>
                <ArrowRight className="w-4 h-4 text-emerald-900" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('register');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm border border-white/20 transition-all"
              >
                For Universities: Submit Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST RANKINGS UPDATES & METHODOLOGY SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest Updates Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-700" />
                <span>2026 Ranking Insights & Updates</span>
              </h3>
              <span className="text-xs text-slate-400">Feb 2026</span>
            </div>

            <div className="space-y-3 divide-y divide-slate-100 text-xs">
              <div className="pt-2">
                <div className="font-bold text-slate-800">
                  NUST retains #1 position overall in Engineering & Computer Science
                </div>
                <p className="text-slate-500 mt-1">
                  High publication rate in AI, robotics, and patent commercialization at the National Science & Technology
                  Park (NSTP) cemented top standing.
                </p>
              </div>

              <div className="pt-3">
                <div className="font-bold text-slate-800">
                  Quaid-i-Azam University leads natural sciences & citation density
                </div>
                <p className="text-slate-500 mt-1">
                  QAU achieved the highest citation impact factor per faculty across Physics and Biological Sciences.
                </p>
              </div>

              <div className="pt-3">
                <div className="font-bold text-slate-800">
                  Aga Khan University and LUMS rank highest in graduate employability
                </div>
                <p className="text-slate-500 mt-1">
                  Over 98% of medical and business graduates secured top residency positions or corporate leadership within 6
                  months.
                </p>
              </div>
            </div>
          </div>

          {/* Ranking Methodology Highlights */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
                <span>Ranking Evaluation Pillars</span>
              </h3>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-blue-700 font-semibold hover:underline"
              >
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-blue-900">Academic Reputation</span>
                <div className="text-[11px] text-slate-500 mt-0.5">25% Weightage</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-blue-900">Research & Citations</span>
                <div className="text-[11px] text-slate-500 mt-0.5">20% Weightage</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-blue-900">Faculty PhD Ratio</span>
                <div className="text-[11px] text-slate-500 mt-0.5">15% Weightage</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-blue-900">Graduate Employability</span>
                <div className="text-[11px] text-slate-500 mt-0.5">15% Weightage</div>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-start gap-2 bg-amber-50/80 p-3 rounded-xl border border-amber-200/60">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Demonstration data synthesized from open academic repositories, HEC accreditations, and verified faculty
                metrics.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
