import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types/university';
import {
  GraduationCap,
  Scale,
  Heart,
  PlusCircle,
  Menu,
  X,
  Compass,
  Building2,
  Award,
  Sparkles,
  ShieldCheck,
  Info,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    compareList,
    favorites,
    registrationRequests,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingRequestsCount = registrationRequests.filter(
    (r) => r.status === 'Pending Review'
  ).length;

  const navItems: { id: PageView; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'universities', label: 'Universities' },
    { id: 'rankings', label: 'Rankings' },
    { id: 'compare', label: 'Compare' },
    { id: 'categories', label: 'Categories' },
    { id: 'match-finder', label: 'Fit Finder', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'about', label: 'About & Methodology' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-900/80 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
            2026 Edition
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="text-[11px] text-slate-300 truncate">
            Official Higher Education Rankings & Performance Directory for Pakistani Universities
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] shrink-0 font-medium">
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 hover:text-white transition-colors ${
              currentPage === 'admin' ? 'text-blue-400 font-bold' : 'text-slate-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Admin Portal</span>
            {pendingRequestsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                {pendingRequestsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-hidden"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold tracking-tight text-blue-950 leading-none">
              PAKISTAN <span className="text-green-700">UNI</span> RANKINGS
            </div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
              Higher Education Excellence 2026
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-blue-900 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-blue-800 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                {item.label}
                {item.id === 'compare' && compareList.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-blue-700 text-white rounded-full text-[10px] font-bold">
                    {compareList.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Group */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Favorites Button */}
          <button
            onClick={() => handleNavClick('favorites')}
            title="Saved Universities"
            className={`p-2 rounded-lg border transition-all relative ${
              currentPage === 'favorites'
                ? 'border-rose-200 bg-rose-50 text-rose-600'
                : 'border-slate-200 bg-white text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50'
            }`}
          >
            <Heart className={`w-4.5 h-4.5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Compare Button */}
          <button
            onClick={() => handleNavClick('compare')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-semibold transition-all ${
              compareList.length > 0
                ? 'bg-blue-50 border-blue-200 text-blue-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4 text-blue-700" />
            <span>Compare</span>
            {compareList.length > 0 && (
              <span className="px-1.5 py-0.5 bg-blue-700 text-white rounded text-[10px] font-bold">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Register University CTA */}
          <button
            onClick={() => handleNavClick('register')}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-bold shadow-xs hover:shadow transition-all active:scale-98"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register University</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('favorites')}
            className="p-2 text-slate-700 hover:text-rose-600"
          >
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-blue-900 rounded-lg focus:outline-hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-left ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-900 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.id === 'compare' && compareList.length > 0 && (
                <span className="px-2 py-0.5 bg-blue-700 text-white rounded-full text-xs font-bold">
                  {compareList.length}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('register')}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-700 text-white rounded-lg font-bold text-sm shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Your University</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-200"
            >
              <ShieldCheck className="w-4 h-4 text-blue-800" />
              <span>Admin Management Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
