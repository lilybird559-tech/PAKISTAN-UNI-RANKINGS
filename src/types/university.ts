export type UniversityType = 'Public' | 'Private' | 'Semi-Government';

export type Province =
  | 'Islamabad ICT'
  | 'Punjab'
  | 'Sindh'
  | 'Khyber Pakhtunkhwa'
  | 'Balochistan'
  | 'Azad Jammu & Kashmir'
  | 'Gilgit-Baltistan';

export type UniversityCategory =
  | 'Overall'
  | 'Engineering'
  | 'Computer Science & AI'
  | 'Medical & Health Sciences'
  | 'Business & Management'
  | 'Law & Legal Studies'
  | 'Arts & Humanities'
  | 'Agriculture & Veterinary'
  | 'Research & Science'
  | 'Public'
  | 'Private';

export interface RankingScores {
  overall: number; // e.g. 98.4
  academicReputation: number; // 0-100
  researchOutput: number; // 0-100
  facultyQuality: number; // 0-100
  studentSatisfaction: number; // 0-100
  employability: number; // 0-100
  infrastructure: number; // 0-100
  internationalization: number; // 0-100
  citationsPerFaculty: number; // 0-100
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  arabicOrUrduName?: string;
  logo: string;
  badgeColor?: string;
  bannerImage: string;
  city: string;
  province: Province;
  type: UniversityType;
  established: number;
  currentRank: number;
  previousRank: number;
  rankChange: number; // 0 = no change, positive = moved up, negative = dropped
  scores: RankingScores;
  categoryRanks: { [key in UniversityCategory]?: number } & { [key: string]: number | undefined };
  website: string;
  portalUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  contact?: {
    address: string;
    phone: string;
    email: string;
  };
  description: string;
  studentEnrollment: string;
  facultyCount: string;
  studentFacultyRatio: string;
  accreditations: string[]; // ['HEC (W4)', 'PEC', 'PMDC', 'NAEAC']
  popularPrograms: string[];
  faculties: string[];
  history?: { year: number; rank: number; score: number }[];
  rankingHistory?: { year: number; rank: number; score: number }[];
  isFeatured?: boolean;
  scholarshipAvailable?: boolean;
  campusArea: string;
  hostelFacility: boolean;
}

export interface UniversityRegistrationRequest {
  id: string;
  name: string;
  shortName: string;
  city: string;
  province: Province;
  type: UniversityType;
  established: number;
  website: string;
  contactEmail: string;
  contactPhone: string;
  contactPersonName: string;
  contactPersonDesignation: string;
  description: string;
  popularPrograms: string[];
  studentEnrollment: string;
  facultyCount: string;
  hostelFacility: boolean;
  accreditations: string[];
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export type PageView =
  | 'home'
  | 'universities'
  | 'rankings'
  | 'compare'
  | 'categories'
  | 'match-finder'
  | 'register'
  | 'admin'
  | 'about'
  | 'favorites';
