import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  University,
  PageView,
  UniversityCategory,
  Province,
  UniversityType,
  UniversityRegistrationRequest,
} from '../types/university';
import { INITIAL_UNIVERSITIES, INITIAL_REGISTRATION_REQUESTS } from '../data/universitiesData';

export interface FilterState {
  searchQuery: string;
  province: string;
  city: string;
  type: string;
  category: string;
  sortBy: 'rank' | 'score' | 'name' | 'established';
  sortOrder: 'asc' | 'desc';
}

export interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  universities: University[];
  selectedUniversity: University | null;
  setSelectedUniversity: (uni: University | null) => void;
  compareList: University[];
  addToCompare: (uni: University) => boolean;
  removeFromCompare: (uniId: string) => void;
  clearCompare: () => void;
  favorites: string[]; // university IDs
  toggleFavorite: (uniId: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  registrationRequests: UniversityRegistrationRequest[];
  addRegistrationRequest: (
    req: Omit<UniversityRegistrationRequest, 'id' | 'submittedAt' | 'status'>
  ) => UniversityRegistrationRequest;
  updateUniversity: (uniId: string, updatedUni: Partial<University>) => void;
  addUniversity: (uni: Omit<University, 'id' | 'currentRank' | 'previousRank' | 'rankChange'>) => void;
  deleteUniversity: (uniId: string) => void;
  approveRegistrationRequest: (reqId: string) => void;
  rejectRegistrationRequest: (reqId: string) => void;
  approveRegistration: (reqId: string) => void;
  rejectRegistration: (reqId: string) => void;
  resetToInitialData: () => void;
  resetToDefaultData: () => void;
  recalculateRankings: () => void;
  openUniversityDetails: (uni: University) => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  province: 'All',
  city: 'All',
  type: 'All',
  category: 'All',
  sortBy: 'rank',
  sortOrder: 'asc',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_UNIVERSITIES = 'pak_uni_rankings_unis_v1';
const STORAGE_KEY_FAVORITES = 'pak_uni_rankings_favorites_v1';
const STORAGE_KEY_REGISTRATIONS = 'pak_uni_rankings_registrations_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [universities, setUniversities] = useState<University[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_UNIVERSITIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse stored universities', e);
      }
    }
    return INITIAL_UNIVERSITIES;
  });

  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [compareList, setCompareList] = useState<University[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_FAVORITES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
    return ['nust-islamabad', 'lums-lahore', 'aku-karachi'];
  });

  const [registrationRequests, setRegistrationRequests] = useState<UniversityRegistrationRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse registration requests', e);
      }
    }
    return INITIAL_REGISTRATION_REQUESTS;
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_UNIVERSITIES, JSON.stringify(universities));
  }, [universities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(registrationRequests));
  }, [registrationRequests]);

  const addToCompare = (uni: University): boolean => {
    if (compareList.some((u) => u.id === uni.id)) {
      return false;
    }
    if (compareList.length >= 4) {
      alert('You can compare up to 4 universities simultaneously.');
      return false;
    }
    setCompareList((prev) => [...prev, uni]);
    return true;
  };

  const removeFromCompare = (uniId: string) => {
    setCompareList((prev) => prev.filter((u) => u.id !== uniId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const toggleFavorite = (uniId: string) => {
    setFavorites((prev) =>
      prev.includes(uniId) ? prev.filter((id) => id !== uniId) : [...prev, uniId]
    );
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const addRegistrationRequest = (
    req: Omit<UniversityRegistrationRequest, 'id' | 'submittedAt' | 'status'>
  ): UniversityRegistrationRequest => {
    const newReq: UniversityRegistrationRequest = {
      ...req,
      id: `req-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setRegistrationRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const updateUniversity = (uniId: string, updatedData: Partial<University>) => {
    setUniversities((prev) =>
      prev.map((u) => (u.id === uniId ? { ...u, ...updatedData } : u))
    );
    if (selectedUniversity?.id === uniId) {
      setSelectedUniversity((prev) => (prev ? { ...prev, ...updatedData } : null));
    }
  };

  const addUniversity = (uniData: Omit<University, 'id' | 'currentRank' | 'previousRank' | 'rankChange'>) => {
    const id = uniData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30) + `-${Date.now()}`;
    const nextRank = universities.length + 1;
    const newUni: University = {
      ...uniData,
      id,
      currentRank: nextRank,
      previousRank: nextRank,
      rankChange: 0,
      contact: uniData.contact || {
        address: `${uniData.city}, ${uniData.province}, Pakistan`,
        phone: '+92-51-111-222',
        email: `info@${uniData.shortName.toLowerCase()}.edu.pk`,
      },
    };
    setUniversities((prev) => [newUni, ...prev]);
  };

  const deleteUniversity = (uniId: string) => {
    setUniversities((prev) => prev.filter((u) => u.id !== uniId));
    setCompareList((prev) => prev.filter((u) => u.id !== uniId));
    setFavorites((prev) => prev.filter((id) => id !== uniId));
    if (selectedUniversity?.id === uniId) {
      setSelectedUniversity(null);
    }
  };

  const approveRegistrationRequest = (reqId: string) => {
    const req = registrationRequests.find((r) => r.id === reqId);
    if (!req) return;

    const nextRank = universities.length + 1;
    const newUni: University = {
      id: `approved-${req.id}`,
      name: req.name,
      shortName: req.shortName,
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=160&auto=format&fit=crop&q=80',
      badgeColor: 'bg-slate-800 text-white',
      bannerImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
      city: req.city,
      province: req.province,
      type: req.type,
      established: req.established || 2010,
      currentRank: nextRank,
      previousRank: nextRank,
      rankChange: 0,
      scores: {
        overall: 74.0,
        academicReputation: 75.0,
        researchOutput: 72.0,
        facultyQuality: 74.0,
        studentSatisfaction: 75.0,
        employability: 74.0,
        infrastructure: 76.0,
        internationalization: 68.0,
        citationsPerFaculty: 70.0,
      },
      categoryRanks: { Overall: nextRank },
      website: req.website.startsWith('http') ? req.website : `https://${req.website}`,
      contact: {
        address: `${req.city}, ${req.province}, Pakistan`,
        phone: req.contactPhone,
        email: req.contactEmail,
      },
      description: req.description || `${req.name} accredited institution in ${req.city}.`,
      studentEnrollment: req.studentEnrollment || '5,000+ Enrolled Students',
      facultyCount: req.facultyCount || '250+ Teaching Faculty',
      studentFacultyRatio: '20:1',
      accreditations: req.accreditations || ['HEC Recognized'],
      popularPrograms: req.popularPrograms || ['B.S. Information Technology', 'B.S. Management Sciences'],
      faculties: ['Faculty of Computing', 'Faculty of Management'],
      rankingHistory: [{ year: 2026, rank: nextRank, score: 74.0 }],
      scholarshipAvailable: true,
      campusArea: 'Urban Campus',
      hostelFacility: req.hostelFacility ?? true,
    };

    setUniversities((prev) => [...prev, newUni]);
    setRegistrationRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'approved' } : r))
    );
  };

  const rejectRegistrationRequest = (reqId: string) => {
    setRegistrationRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'rejected' } : r))
    );
  };

  const recalculateRankings = () => {
    setUniversities((prev) => {
      // Sort descending by overall score
      const sorted = [...prev].sort((a, b) => b.scores.overall - a.scores.overall);
      return sorted.map((uni, idx) => {
        const newRank = idx + 1;
        const rankChange = uni.currentRank - newRank; // positive if rank improved
        return {
          ...uni,
          previousRank: uni.currentRank,
          currentRank: newRank,
          rankChange,
        };
      });
    });
  };

  const resetToInitialData = () => {
    setUniversities(INITIAL_UNIVERSITIES);
    setRegistrationRequests(INITIAL_REGISTRATION_REQUESTS);
    setFavorites(['nust-islamabad', 'lums-lahore', 'aku-karachi']);
    setCompareList([]);
    localStorage.removeItem(STORAGE_KEY_UNIVERSITIES);
    localStorage.removeItem(STORAGE_KEY_FAVORITES);
    localStorage.removeItem(STORAGE_KEY_REGISTRATIONS);
  };

  const openUniversityDetails = (uni: University) => {
    setSelectedUniversity(uni);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        universities,
        selectedUniversity,
        setSelectedUniversity,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        favorites,
        toggleFavorite,
        filters,
        setFilters,
        resetFilters,
        registrationRequests,
        addRegistrationRequest,
        updateUniversity,
        addUniversity,
        deleteUniversity,
        approveRegistrationRequest,
        rejectRegistrationRequest,
        approveRegistration: approveRegistrationRequest,
        rejectRegistration: rejectRegistrationRequest,
        resetToInitialData,
        resetToDefaultData: resetToInitialData,
        recalculateRankings,
        openUniversityDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
