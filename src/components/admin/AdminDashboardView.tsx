import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { University, Province, UniversityType } from '../../types/university';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Building,
  GraduationCap,
  Sparkles,
  Award,
  Search,
  Check,
  X,
  Lock,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    universities,
    addUniversity,
    updateUniversity,
    deleteUniversity,
    registrationRequests,
    approveRegistrationRequest,
    rejectRegistrationRequest,
    resetToInitialData,
    recalculateRankings,
    setSelectedUniversity,
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'manage' | 'requests' | 'add'>('manage');
  const [searchFilter, setSearchFilter] = useState('');
  const [editingUni, setEditingUni] = useState<University | null>(null);

  // New University Form State
  const [newUniForm, setNewUniForm] = useState({
    name: '',
    shortName: '',
    city: '',
    province: 'Punjab' as Province,
    type: 'Public' as UniversityType,
    established: 2005,
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    website: 'https://www.hec.gov.pk',
    description: '',
    overallScore: 82.5,
    academicReputation: 83,
    researchOutput: 80,
    facultyQuality: 82,
    employability: 84,
    studentSatisfaction: 80,
    infrastructure: 81,
    internationalization: 75,
    citationsPerFaculty: 79,
    popularPrograms: 'Computer Science, Business Administration, Electrical Engineering',
    studentEnrollment: '6,000+',
    facultyCount: '300+',
    hostelFacility: true,
  });

  const handleAddNewUniversity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUniForm.name || !newUniForm.city) return;

    const programs = newUniForm.popularPrograms
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addUniversity({
      name: newUniForm.name,
      shortName: newUniForm.shortName || newUniForm.name.substring(0, 4).toUpperCase(),
      city: newUniForm.city,
      province: newUniForm.province,
      type: newUniForm.type,
      established: Number(newUniForm.established),
      logo: newUniForm.logo,
      bannerImage: newUniForm.bannerImage,
      website: newUniForm.website,
      description:
        newUniForm.description ||
        `${newUniForm.name} is a leading higher educational institution based in ${newUniForm.city}.`,
      scores: {
        overall: Number(newUniForm.overallScore),
        academicReputation: Number(newUniForm.academicReputation),
        researchOutput: Number(newUniForm.researchOutput),
        facultyQuality: Number(newUniForm.facultyQuality),
        employability: Number(newUniForm.employability),
        studentSatisfaction: Number(newUniForm.studentSatisfaction),
        infrastructure: Number(newUniForm.infrastructure),
        internationalization: Number(newUniForm.internationalization),
        citationsPerFaculty: Number(newUniForm.citationsPerFaculty),
      },
      categoryRanks: {},
      history: [
        { year: 2024, rank: 15, score: 79.5 },
        { year: 2025, rank: 14, score: 81.0 },
        { year: 2026, rank: 12, score: Number(newUniForm.overallScore) },
      ],
      faculties: ['Faculty of Computing', 'Faculty of Engineering', 'Faculty of Management Sciences'],
      popularPrograms: programs,
      studentEnrollment: newUniForm.studentEnrollment,
      facultyCount: newUniForm.facultyCount,
      studentFacultyRatio: '18:1',
      campusArea: '120 Acres',
      hostelFacility: newUniForm.hostelFacility,
      accreditations: ['HEC Recognized'],
      contact: {
        address: `${newUniForm.city}, ${newUniForm.province}, Pakistan`,
        phone: '+92-51-111-222',
        email: `info@${newUniForm.shortName.toLowerCase()}.edu.pk`,
      },
    });

    setActiveTab('manage');
  };

  const handleUpdateScores = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUni) return;

    updateUniversity(editingUni.id, editingUni);
    setEditingUni(null);
  };

  const filteredUnis = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      u.shortName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      u.city.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-blue-900" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Institutional Admin Dashboard
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage university directory listings, audit institutional verification requests, and calibrate score metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => recalculateRankings()}
            className="px-4 py-2 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recalculate 2026 Rankings</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all universities to initial 2026 data?')) {
                resetToInitialData();
              }
            }}
            className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center gap-1"
            title="Reset database to default seed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Seed</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'manage'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Manage Universities ({universities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'requests'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Pending Submissions ({registrationRequests.filter((r) => r.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'add'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add New University</span>
        </button>
      </div>

      {/* TAB 1: MANAGE UNIVERSITIES */}
      {activeTab === 'manage' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search registered university to edit..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden"
              />
            </div>
          </div>

          {/* List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-center">Rank</th>
                    <th className="px-4 py-3">University</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-3 py-3 text-center">Type</th>
                    <th className="px-3 py-3 text-center">Score</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUnis.map((uni) => (
                    <tr key={uni.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-center font-bold text-slate-900">
                        #{uni.currentRank}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900 flex items-center gap-2">
                        <img
                          src={uni.logo}
                          alt={uni.shortName}
                          className="w-6 h-6 rounded-md object-cover"
                        />
                        <span>{uni.name}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {uni.city}, {uni.province}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            uni.type === 'Public'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {uni.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center font-mono font-bold text-blue-900">
                        {uni.scores.overall}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingUni({ ...uni })}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-900 text-slate-600 transition-colors"
                            title="Edit University"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${uni.name}?`)) {
                                deleteUniversity(uni.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EDIT DRAWER MODAL */}
          {editingUni && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 border border-slate-200 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Edit: {editingUni.name}</h3>
                  <button
                    onClick={() => setEditingUni(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateScores} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">University Name</label>
                      <input
                        type="text"
                        value={editingUni.name}
                        onChange={(e) => setEditingUni({ ...editingUni, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 mt-1 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Short Name</label>
                      <input
                        type="text"
                        value={editingUni.shortName}
                        onChange={(e) => setEditingUni({ ...editingUni, shortName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 mt-1 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">City</label>
                      <input
                        type="text"
                        value={editingUni.city}
                        onChange={(e) => setEditingUni({ ...editingUni, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 mt-1 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Rank</label>
                      <input
                        type="number"
                        value={editingUni.currentRank}
                        onChange={(e) =>
                          setEditingUni({ ...editingUni, currentRank: Number(e.target.value) })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 mt-1 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-3">
                    <span className="font-bold text-slate-800 uppercase tracking-wider block">
                      Metric Scores (0 - 100)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-slate-600">Overall Score</label>
                        <input
                          type="number"
                          step="0.1"
                          value={editingUni.scores.overall}
                          onChange={(e) =>
                            setEditingUni({
                              ...editingUni,
                              scores: { ...editingUni.scores, overall: Number(e.target.value) },
                            })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 mt-1 font-bold text-blue-900"
                        />
                      </div>
                      <div>
                        <label className="text-slate-600">Academic Rep</label>
                        <input
                          type="number"
                          value={editingUni.scores.academicReputation}
                          onChange={(e) =>
                            setEditingUni({
                              ...editingUni,
                              scores: {
                                ...editingUni.scores,
                                academicReputation: Number(e.target.value),
                              },
                            })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-slate-600">Research Citations</label>
                        <input
                          type="number"
                          value={editingUni.scores.researchOutput}
                          onChange={(e) =>
                            setEditingUni({
                              ...editingUni,
                              scores: {
                                ...editingUni.scores,
                                researchOutput: Number(e.target.value),
                              },
                            })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-slate-600">Employability</label>
                        <input
                          type="number"
                          value={editingUni.scores.employability}
                          onChange={(e) =>
                            setEditingUni({
                              ...editingUni,
                              scores: {
                                ...editingUni.scores,
                                employability: Number(e.target.value),
                              },
                            })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingUni(null)}
                      className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-900 text-white rounded-xl font-bold"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PENDING REGISTRATIONS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {registrationRequests.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
              No registration requests submitted yet.
            </div>
          ) : (
            <div className="space-y-3">
              {registrationRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{req.name}</h4>
                      <span className="text-xs font-semibold text-slate-500">({req.shortName})</span>
                      <span
                        className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                          req.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : req.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {req.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">
                      <span>
                        📍 {req.city}, {req.province} • {req.type} • Est. {req.established}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 pt-1">
                      <span className="font-bold">Contact:</span> {req.contactPersonName} (
                      {req.contactPersonDesignation}) • {req.contactEmail} • {req.contactPhone}
                    </div>
                  </div>

                  {req.status === 'pending' && (
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <button
                        onClick={() => rejectRegistrationRequest(req.id)}
                        className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => approveRegistrationRequest(req.id)}
                        className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Publish</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADD NEW UNIVERSITY */}
      {activeTab === 'add' && (
        <form
          onSubmit={handleAddNewUniversity}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6"
        >
          <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
            Add New University to Rankings Database
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">University Full Name</label>
              <input
                type="text"
                required
                value={newUniForm.name}
                onChange={(e) => setNewUniForm({ ...newUniForm, name: e.target.value })}
                placeholder="e.g. University of Balochistan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Short Name</label>
              <input
                type="text"
                required
                value={newUniForm.shortName}
                onChange={(e) => setNewUniForm({ ...newUniForm, shortName: e.target.value })}
                placeholder="e.g. UOB"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">City</label>
              <input
                type="text"
                required
                value={newUniForm.city}
                onChange={(e) => setNewUniForm({ ...newUniForm, city: e.target.value })}
                placeholder="e.g. Quetta"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Province</label>
              <select
                value={newUniForm.province}
                onChange={(e) => setNewUniForm({ ...newUniForm, province: e.target.value as Province })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              >
                <option value="Islamabad ICT">Islamabad ICT</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Sector</label>
              <select
                value={newUniForm.type}
                onChange={(e) => setNewUniForm({ ...newUniForm, type: e.target.value as UniversityType })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Overall Score (0-100)</label>
              <input
                type="number"
                step="0.1"
                value={newUniForm.overallScore}
                onChange={(e) => setNewUniForm({ ...newUniForm, overallScore: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-blue-900"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors"
            >
              Add University & Compute Standings
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
