import React from 'react';
import { useApp } from '../../context/AppContext';
import { University } from '../../types/university';
import {
  X,
  Award,
  MapPin,
  Building,
  GraduationCap,
  Scale,
  Heart,
  ExternalLink,
  Phone,
  Mail,
  Users,
  Briefcase,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Globe,
  Sparkles,
  Calendar,
  Building2,
} from 'lucide-react';

interface UniversityDetailModalProps {
  university: University | null;
  onClose: () => void;
}

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  onClose,
}) => {
  const { addToCompare, removeFromCompare, compareList, favorites, toggleFavorite } = useApp();

  if (!university) return null;

  const isFav = favorites.includes(university.id);
  const isInCompare = compareList.some((c) => c.id === university.id);

  const metrics = [
    { label: 'Academic Reputation', score: university.scores.academicReputation, weight: '25%' },
    { label: 'Research Output & Citations', score: university.scores.researchOutput, weight: '20%' },
    { label: 'Graduate Employability', score: university.scores.employability, weight: '15%' },
    { label: 'Faculty Credentials & PhDs', score: university.scores.facultyQuality, weight: '15%' },
    { label: 'Campus & Digital Infrastructure', score: university.scores.infrastructure, weight: '10%' },
    { label: 'Student Satisfaction', score: university.scores.studentSatisfaction, weight: '5%' },
    { label: 'Internationalization', score: university.scores.internationalization, weight: '5%' },
    { label: 'Citations per Faculty', score: university.scores.citationsPerFaculty, weight: '5%' },
  ];

  const historyItems = university.history || university.rankingHistory || [
    { year: 2024, rank: university.currentRank + 1, score: university.scores.overall - 1.2 },
    { year: 2025, rank: university.previousRank, score: university.scores.overall - 0.5 },
    { year: 2026, rank: university.currentRank, score: university.scores.overall },
  ];

  const contactAddress =
    university.contact?.address || university.address || `${university.city}, ${university.province}, Pakistan`;
  const contactPhone = university.contact?.phone || university.phone || '+92-51-111-222-333';
  const contactEmail =
    university.contact?.email || university.email || `info@${university.shortName.toLowerCase()}.edu.pk`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {/* 1. HERO BANNER & BASIC INFO */}
          <div className="relative">
            <div className="h-44 sm:h-52 bg-slate-900 relative overflow-hidden">
              <img
                src={university.bannerImage}
                alt={university.name}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>

              {/* Badges on Banner */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm">
                  <Award className="w-3.5 h-3.5" />
                  <span>National Rank #{university.currentRank}</span>
                </span>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    university.type === 'Public' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                  }`}
                >
                  {university.type} Sector
                </span>
              </div>
            </div>

            {/* University Profile Info Header */}
            <div className="px-6 sm:px-8 pb-6 -mt-12 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <img
                  src={university.logo}
                  alt={university.shortName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-white shrink-0"
                />
                <div className="space-y-0.5">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {university.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">{university.shortName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-700" />
                      {university.city}, {university.province}
                    </span>
                    <span>•</span>
                    <span>Est. {university.established}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => toggleFavorite(university.id)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isFav
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-slate-200 text-slate-600 hover:text-rose-500 hover:bg-slate-50'
                  }`}
                  title="Save to Favorites"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                </button>

                <button
                  onClick={() => {
                    if (isInCompare) {
                      removeFromCompare(university.id);
                    } else {
                      addToCompare(university);
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                    isInCompare
                      ? 'bg-blue-700 border-blue-700 text-white'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isInCompare ? 'In Comparison' : 'Add to Compare'}</span>
                </button>

                <a
                  href={university.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 2. OVERVIEW & DESCRIPTION */}
          <div className="px-6 sm:px-8 py-5 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">About the Institution</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{university.description}</p>
          </div>

          {/* 3. PERFORMANCE METRICS & HISTORICAL TREND */}
          <div className="px-6 sm:px-8 py-6 space-y-5 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700" />
                <span>Institutional Quality Metrics</span>
              </h3>
              <div className="text-xs text-slate-500">
                Overall Index:{' '}
                <span className="font-mono font-bold text-blue-900 text-base">
                  {university.scores.overall}
                </span>{' '}
                / 100
              </div>
            </div>

            {/* Score Bars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((m, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{m.label}</span>
                    <span className="font-mono font-bold text-slate-900">{m.score}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${m.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Historical Rankings Track */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-green-700" />
                  <span>5-Year Ranking History (2022 - 2026)</span>
                </span>
                <span className="text-slate-500">Historical Standings</span>
              </div>

              <div className="flex items-center justify-around gap-2 pt-2">
                {historyItems.map((h) => (
                  <div key={h.year} className="text-center space-y-1">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-xs font-mono text-blue-950 mx-auto">
                      #{h.rank}
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">{h.year}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{h.score.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. DISCIPLINE & CATEGORY STANDINGS */}
          <div className="px-6 sm:px-8 py-5 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Discipline Standings</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(university.categoryRanks).map(([category, rank]) => (
                <div
                  key={category}
                  className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-xs flex items-center gap-2"
                >
                  <span className="font-medium text-slate-700">{category}:</span>
                  <span className="font-bold text-blue-900 font-mono">Rank #{rank}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. FACULTIES & POPULAR PROGRAMS */}
          <div className="px-6 sm:px-8 py-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Faculties & Flagship Programs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Academic Faculties:</span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {university.faculties.map((fac, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Popular Degree Programs:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {university.popularPrograms.map((prog, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6. CAMPUS FACTS & KEY DATA */}
          <div className="px-6 sm:px-8 py-6 bg-slate-50/50 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Campus Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">Student Enrollment</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{university.studentEnrollment}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">Faculty Members</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{university.facultyCount}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">Student-Faculty Ratio</span>
                <div className="font-bold text-blue-900 text-sm font-mono mt-0.5">
                  {university.studentFacultyRatio}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">Campus Ground Area</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{university.campusArea}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">Hostel Accommodation</span>
                <div className="font-bold text-green-700 text-sm mt-0.5">
                  {university.hostelFacility ? 'Available' : 'No Hostels'}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">Accreditations</span>
                <div className="font-bold text-slate-900 text-xs mt-0.5 truncate">
                  {university.accreditations.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* 7. CONTACT & INQUIRIES */}
          <div className="px-6 sm:px-8 py-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Contact & Inquiries</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>{contactAddress}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Phone className="w-4 h-4 text-green-700 shrink-0" />
                <span>{contactPhone}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Mail className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>{contactEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">2026 Academic Evaluation Framework</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
