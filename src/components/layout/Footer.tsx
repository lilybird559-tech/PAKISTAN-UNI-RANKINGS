import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types/university';
import {
  GraduationCap,
  ShieldAlert,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Heart,
  Scale,
  Award,
  Globe,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Accuracy & Sample Data Notice Banner */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3 justify-between text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-slate-300">
              <span className="font-bold text-amber-400 uppercase tracking-wider mr-2">
                Ranking Transparency & Methodology Notice:
              </span>
              Rankings displayed on this platform are compiled for informational and academic demonstration purposes
              synthesizing public citations, accreditation tiers, and peer benchmarks. Rankings are not directly issued by
              government regulatory bodies unless explicitly cited.
            </div>
          </div>
          <button
            onClick={() => handleNavigate('about')}
            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 shrink-0"
          >
            Read Methodology →
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-green-600 rounded-xl flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  PAKISTAN <span className="text-green-400">UNI</span> RANKINGS
                </span>
                <p className="text-xs text-slate-400">2026 Academic Evaluation Framework</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              The comprehensive guide for Pakistani students, parents, and scholars to explore higher education
              institutions, analyze research output, compare engineering and medical faculties, and find the perfect
              academic fit across all provinces.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-all"
              >
                <span className="font-bold text-xs">f</span>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center text-slate-300 hover:text-white transition-all"
              >
                <span className="font-bold text-xs">𝕏</span>
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-700 flex items-center justify-center text-slate-300 hover:text-white transition-all"
              >
                <span className="font-bold text-xs">in</span>
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition-all"
              >
                <span className="font-bold text-xs">▶</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Platform Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('universities')}
                  className="hover:text-white transition-colors"
                >
                  Universities Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('rankings')}
                  className="hover:text-white transition-colors"
                >
                  2026 National Rankings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('compare')}
                  className="hover:text-white transition-colors"
                >
                  Compare Universities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('match-finder')}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Student Match Finder ✨
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('register')}
                  className="text-green-400 hover:text-green-300 font-medium transition-colors"
                >
                  Register Your University
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Top Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Best Engineering Universities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Best Computer Science & AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Best Medical & Health Colleges
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Best Business & Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Top Public Sector Universities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('categories')}
                  className="hover:text-white transition-colors"
                >
                  Top Private Sector Universities
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Coverage & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Provinces Covered</h4>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-400">
              <span className="px-2 py-1 bg-slate-800 rounded">Islamabad (ICT)</span>
              <span className="px-2 py-1 bg-slate-800 rounded">Punjab</span>
              <span className="px-2 py-1 bg-slate-800 rounded">Sindh</span>
              <span className="px-2 py-1 bg-slate-800 rounded">Khyber Pakhtunkhwa</span>
              <span className="px-2 py-1 bg-slate-800 rounded">Balochistan</span>
              <span className="px-2 py-1 bg-slate-800 rounded">Azad Kashmir</span>
              <span className="px-2 py-1 bg-slate-800 rounded">Gilgit-Baltistan</span>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>support@pakistanunirankings.edu.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Islamabad Capital Territory, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Pakistan Universities Rankings. All rights reserved. Dedicated to educational transparency.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavigate('about')}
              className="hover:text-slate-400 transition-colors"
            >
              Methodology & Weights
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavigate('admin')}
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Institutional Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
