/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CompareStickyDrawer } from './components/layout/CompareStickyDrawer';
import { HomeView } from './components/home/HomeView';
import { UniversitiesView } from './components/universities/UniversitiesView';
import { RankingsView } from './components/rankings/RankingsView';
import { CompareView } from './components/compare/CompareView';
import { CategoriesView } from './components/categories/CategoriesView';
import { StudentFitFinder } from './components/student/StudentFitFinder';
import { RegisterUniversityView } from './components/registration/RegisterUniversityView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { AboutView } from './components/about/AboutView';
import { FavoritesView } from './components/favorites/FavoritesView';
import { UniversityDetailModal } from './components/details/UniversityDetailModal';

const AppContent: React.FC = () => {
  const { currentPage, selectedUniversity, setSelectedUniversity } = useApp();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'universities':
        return <UniversitiesView />;
      case 'rankings':
        return <RankingsView />;
      case 'compare':
        return <CompareView />;
      case 'categories':
        return <CategoriesView />;
      case 'match-finder':
        return <StudentFitFinder />;
      case 'register':
        return <RegisterUniversityView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'about':
        return <AboutView />;
      case 'favorites':
        return <FavoritesView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Persistent Compare Drawer */}
      <CompareStickyDrawer />

      {/* University Detail Modal */}
      <UniversityDetailModal
        university={selectedUniversity}
        onClose={() => setSelectedUniversity(null)}
      />

      {/* Platform Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
