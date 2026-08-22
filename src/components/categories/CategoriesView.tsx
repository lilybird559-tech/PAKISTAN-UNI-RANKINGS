import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { University, UniversityCategory } from '../../types/university';
import {
  Cpu,
  Sparkles,
  HeartPulse,
  Briefcase,
  Scale,
  Palette,
  Building2,
  BookOpen,
  Award,
  Building,
  GraduationCap,
  Heart,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface CategoryConfig {
  id: string;
  name: string;
  categoryKey?: keyof University['categoryRanks'];
  typeFilter?: 'Public' | 'Private';
  icon: React.ReactNode;
  badgeColor: string;
  description: string;
  evaluationCriteria: string;
}

export const CategoriesView: React.FC = () => {
  const {
    universities,
    setSelectedUniversity,
    addToCompare,
    removeFromCompare,
    compareList,
    favorites,
    toggleFavorite,
  } = useApp();

  const categoryConfigs: CategoryConfig[] = [
    {
      id: 'Engineering',
      name: 'Engineering & Technology',
      categoryKey: 'Engineering',
      icon: <Cpu className="w-5 h-5" />,
      badgeColor: 'bg-blue-600',
      description:
        'Institutions excelling in Electrical, Mechanical, Software, Civil, Chemical, and Aerospace engineering accredited by the Pakistan Engineering Council (PEC) under the Washington Accord.',
      evaluationCriteria: 'PEC Accreditation Level, Lab Equipment, Industrial MoUs, Patent Filings',
    },
    {
      id: 'Computer Science & AI',
      name: 'Computer Science, AI & Cyber',
      categoryKey: 'Computer Science & AI',
      icon: <Sparkles className="w-5 h-5" />,
      badgeColor: 'bg-indigo-600',
      description:
        'Premier technology faculties pioneering Artificial Intelligence, Data Science, Cyber Security, Software Engineering, and Cloud Systems with massive tech hiring pipelines.',
      evaluationCriteria: 'NCEAC Rating, Hackathon Podiums, Tech Incubator Startups, Coding Rigor',
    },
    {
      id: 'Medical & Health Sciences',
      name: 'Medical & Dental Sciences',
      categoryKey: 'Medical & Health Sciences',
      icon: <HeartPulse className="w-5 h-5" />,
      badgeColor: 'bg-rose-600',
      description:
        'PMDC-recognized medical universities and teaching hospitals offering MBBS, BDS, Nursing, Pharmacy (Pharm-D), and specialized clinical postgraduate residencies.',
      evaluationCriteria: 'Hospital Bed Capacity, PMDC Compliance, USMLE/FCPS Passing Rates, Clinical Exposure',
    },
    {
      id: 'Business & Management',
      name: 'Business, Economics & Leadership',
      categoryKey: 'Business & Management',
      icon: <Briefcase className="w-5 h-5" />,
      badgeColor: 'bg-emerald-600',
      description:
        'Business schools offering BBA, MBA, Executive Management, Accounting & Finance (ACCA/CFA integrated) with top corporate leadership alumni across multinational enterprises.',
      evaluationCriteria: 'NBEAC W-Category Accreditation, Corporate Placement, Case-Study Pedagogy',
    },
    {
      id: 'Law & Legal Studies',
      name: 'Law & Jurisprudence',
      categoryKey: 'Law & Legal Studies',
      icon: <Scale className="w-5 h-5" />,
      badgeColor: 'bg-amber-600',
      description:
        'Institutions recognized by the Pakistan Bar Council (PBC) offering 5-year LLB and LLM degrees with active moot court societies and judicial clerkships.',
      evaluationCriteria: 'Pakistan Bar Council Rating, Judicial Appointments, Moot Court Performance',
    },
    {
      id: 'Arts & Humanities',
      name: 'Arts, Humanities & Social Sciences',
      categoryKey: 'Arts & Humanities',
      icon: <Palette className="w-5 h-5" />,
      badgeColor: 'bg-pink-600',
      description:
        'Centres of creative thought, fine arts, architecture, international relations, linguistics, media studies, and cultural preservation.',
      evaluationCriteria: 'PCATP Accreditation, Creative Exhibitions, Policy Think-Tank Contributions',
    },
    {
      id: 'Agriculture & Veterinary',
      name: 'Agriculture & Food Sciences',
      categoryKey: 'Agriculture & Veterinary',
      icon: <Building2 className="w-5 h-5" />,
      badgeColor: 'bg-lime-700',
      description:
        'Universities driving national food security, smart agronomy, horticulture, veterinary medicine, and agricultural biotechnology research.',
      evaluationCriteria: 'Experimental Farms, Crop Yield Patents, Livestock Care, Food Tech Patents',
    },
    {
      id: 'Research & Science',
      name: 'Natural & Applied Sciences',
      categoryKey: 'Research & Science',
      icon: <BookOpen className="w-5 h-5" />,
      badgeColor: 'bg-purple-600',
      description:
        'High-impact physics, chemistry, biotechnology, mathematics, and environmental science research clusters with high citation index per faculty.',
      evaluationCriteria: 'WOS Impact Factor Citations, H-Index, International Research Grants',
    },
    {
      id: 'Public',
      name: 'Top Public (Govt) Universities',
      typeFilter: 'Public',
      icon: <Building className="w-5 h-5" />,
      badgeColor: 'bg-green-700',
      description:
        'Subsidized federal and provincial charter universities with extensive campuses, subsidized fee structures, and quota-based open merit seats.',
      evaluationCriteria: 'National Inclusivity, Provincial Affiliations, Subsidized Research Labs',
    },
    {
      id: 'Private',
      name: 'Top Private Universities',
      typeFilter: 'Private',
      icon: <Award className="w-5 h-5" />,
      badgeColor: 'bg-blue-700',
      description:
        'Independent chartered higher education institutes featuring modern infrastructure, global university linkages, and generous need-blind financial aid scholarships.',
      evaluationCriteria: 'Financial Aid Volume, Modern Smart Classrooms, Career Placement Cell',
    },
  ];

  const [activeCategoryId, setActiveCategoryId] = useState<string>('Engineering');

  const selectedCategory =
    categoryConfigs.find((c) => c.id === activeCategoryId) || categoryConfigs[0];

  // Get and sort universities for the selected category
  const categoryUniversities = universities
    .filter((uni) => {
      if (selectedCategory.typeFilter) {
        return uni.type === selectedCategory.typeFilter;
      }
      if (selectedCategory.categoryKey) {
        return uni.categoryRanks[selectedCategory.categoryKey] !== undefined;
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedCategory.categoryKey) {
        const rankA = a.categoryRanks[selectedCategory.categoryKey] || 999;
        const rankB = b.categoryRanks[selectedCategory.categoryKey] || 999;
        return rankA - rankB;
      }
      return a.currentRank - b.currentRank;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-blue-900" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Rankings by Academic Discipline & Sector
          </h1>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Specialized rankings across Engineering, Computer Science & AI, Medical, Business, Law, Agriculture, and
          Public/Private sectors.
        </p>
      </div>

      {/* CATEGORY SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categoryConfigs.map((cat) => {
          const isActive = activeCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* SELECTED CATEGORY BANNER */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`p-3 rounded-2xl text-white ${selectedCategory.badgeColor}`}>
              {selectedCategory.icon}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Top Institutions for {selectedCategory.name}
              </h2>
              <span className="text-xs text-slate-400">
                {categoryUniversities.length} Institutions Evaluated
              </span>
            </div>
          </div>

          <div className="px-3.5 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Criteria Focus:</span> {selectedCategory.evaluationCriteria}
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          {selectedCategory.description}
        </p>
      </div>

      {/* CATEGORY RANKINGS LIST */}
      <div className="space-y-4">
        {categoryUniversities.map((uni, index) => {
          const disciplineRank = selectedCategory.categoryKey
            ? uni.categoryRanks[selectedCategory.categoryKey] || index + 1
            : index + 1;
          const isFav = favorites.includes(uni.id);
          const isInCompare = compareList.some((c) => c.id === uni.id);

          return (
            <div
              key={uni.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              {/* Left Rank & Details */}
              <div className="flex items-start sm:items-center gap-4 flex-1">
                {/* Discipline Rank Badge */}
                <div className="shrink-0 text-center">
                  {disciplineRank === 1 ? (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex flex-col items-center justify-center font-extrabold shadow-xs">
                      <span className="text-xs">🥇</span>
                      <span className="text-sm font-black">#1</span>
                    </div>
                  ) : disciplineRank === 2 ? (
                    <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-800 flex flex-col items-center justify-center font-extrabold">
                      <span className="text-xs">🥈</span>
                      <span className="text-sm font-black">#2</span>
                    </div>
                  ) : disciplineRank === 3 ? (
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex flex-col items-center justify-center font-extrabold">
                      <span className="text-xs">🥉</span>
                      <span className="text-sm font-black">#3</span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center font-bold">
                      <span className="text-[10px] text-slate-400 uppercase">Rank</span>
                      <span className="text-sm font-extrabold">#{disciplineRank}</span>
                    </div>
                  )}
                </div>

                {/* Logo & Text */}
                <img
                  src={uni.logo}
                  alt={uni.shortName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      onClick={() => setSelectedUniversity(uni)}
                      className="font-bold text-slate-900 hover:text-blue-700 text-base cursor-pointer transition-colors"
                    >
                      {uni.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500">({uni.shortName})</span>
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        uni.type === 'Public' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {uni.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>
                      📍 {uni.city}, {uni.province}
                    </span>
                    <span>•</span>
                    <span>National Overall Rank #{uni.currentRank}</span>
                    <span>•</span>
                    <span>Est. {uni.established}</span>
                  </div>

                  {/* Accreditations & Programs */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {uni.popularPrograms.slice(0, 3).map((prog, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Score & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                {/* Score */}
                <div className="text-left md:text-right pr-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</div>
                  <div className="text-lg font-black text-blue-900 font-mono">
                    {uni.scores.overall}
                    <span className="text-xs text-slate-400 font-normal"> / 100</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(uni.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isFav
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-slate-200 text-slate-400 hover:text-rose-500'
                    }`}
                    title="Save"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
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

                  <button
                    onClick={() => setSelectedUniversity(uni)}
                    className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
