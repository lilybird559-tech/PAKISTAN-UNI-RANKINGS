import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Province, UniversityType } from '../../types/university';
import confetti from 'canvas-confetti';
import {
  Building,
  GraduationCap,
  Mail,
  Phone,
  Globe,
  MapPin,
  CheckCircle2,
  Send,
  Award,
  Sparkles,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export const RegisterUniversityView: React.FC = () => {
  const { addRegistrationRequest, setCurrentPage } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    city: '',
    province: 'Punjab' as Province,
    type: 'Public' as UniversityType,
    established: 2000,
    website: '',
    contactEmail: '',
    contactPhone: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    description: '',
    popularPrograms: '',
    studentEnrollment: '5,000+',
    facultyCount: '350+',
    hostelFacility: true,
    accreditations: 'HEC, PEC',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.city.trim() || !formData.contactEmail.trim()) {
      setErrorMsg('Please fill in all mandatory fields (Name, City, Official Email).');
      return;
    }

    const programsArray = formData.popularPrograms
      ? formData.popularPrograms.split(',').map((s) => s.trim()).filter(Boolean)
      : ['Computer Science', 'Business Administration', 'Engineering'];

    const accreditationsArray = formData.accreditations
      ? formData.accreditations.split(',').map((s) => s.trim()).filter(Boolean)
      : ['HEC Recognized'];

    const newRequest = addRegistrationRequest({
      name: formData.name,
      shortName: formData.shortName || formData.name.substring(0, 4).toUpperCase(),
      city: formData.city,
      province: formData.province,
      type: formData.type,
      established: Number(formData.established) || 2000,
      website: formData.website || 'https://www.hec.gov.pk',
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone || '+92-51-111-222',
      contactPersonName: formData.contactPersonName || 'Quality Enhancement Cell (QEC)',
      contactPersonDesignation: formData.contactPersonDesignation || 'Director QEC / Registrar',
      description: formData.description || `${formData.name} is a premier higher education institution in ${formData.city}, Pakistan.`,
      popularPrograms: programsArray,
      studentEnrollment: formData.studentEnrollment,
      facultyCount: formData.facultyCount,
      hostelFacility: formData.hostelFacility,
      accreditations: accreditationsArray,
    });

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setSubmittedId(newRequest.id);
    setErrorMsg(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <Building className="w-7 h-7 text-blue-900" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Verification & Registration
          </h1>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Submit official university data for evaluation and inclusion in the Pakistan Universities Rankings directory.
        </p>
      </div>

      {submittedId ? (
        /* SUCCESS CONFIRMATION STATE */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-700">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-slate-900">Application Submitted Successfully</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Thank you for submitting <strong className="text-slate-900">{formData.name}</strong>. Our academic review
              board will verify the provided accreditation data against regulatory records.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Application Reference ID
            </div>
            <div className="text-base font-mono font-extrabold text-blue-900">{submittedId}</div>
            <div className="text-[11px] text-slate-500">Status: Pending Verification</div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSubmittedId(null);
                setFormData({
                  name: '',
                  shortName: '',
                  city: '',
                  province: 'Punjab',
                  type: 'Public',
                  established: 2000,
                  website: '',
                  contactEmail: '',
                  contactPhone: '',
                  contactPersonName: '',
                  contactPersonDesignation: '',
                  description: '',
                  popularPrograms: '',
                  studentEnrollment: '5,000+',
                  facultyCount: '350+',
                  hostelFacility: true,
                  accreditations: 'HEC, PEC',
                });
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Submit Another University
            </button>

            <button
              onClick={() => {
                setCurrentPage('universities');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Back to Universities Directory
            </button>
          </div>
        </div>
      ) : (
        /* REGISTRATION FORM */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
              <GraduationCap className="w-5 h-5 text-blue-700" />
              <span>1. University Basic Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Full Chartered University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. National University of Sciences and Technology"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Acronym / Short Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  placeholder="e.g. NUST, FAST, IBA"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Year Established / Chartered
                </label>
                <input
                  type="number"
                  value={formData.established}
                  onChange={(e) => setFormData({ ...formData, established: Number(e.target.value) })}
                  placeholder="e.g. 1991"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Islamabad, Lahore, Karachi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Province / Region</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value as Province })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden"
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
                <label className="text-xs font-bold text-slate-700">Sector / Charter Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as UniversityType })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden"
                >
                  <option value="Public">Public (Govt Charter)</option>
                  <option value="Private">Private (Independent)</option>
                  <option value="Semi-Government">Semi-Government</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Official Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.university.edu.pk"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Official Verification */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck className="w-5 h-5 text-green-700" />
              <span>2. Institutional Contact & QEC Representative</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Official Institutional Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="registrar@uni.edu.pk or qec@uni.edu.pk"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Official Phone / Helpline</label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+92-51-90850000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Representative Name</label>
                <input
                  type="text"
                  value={formData.contactPersonName}
                  onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                  placeholder="e.g. Dr. Muhammad Ahmad"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Designation / Department</label>
                <input
                  type="text"
                  value={formData.contactPersonDesignation}
                  onChange={(e) => setFormData({ ...formData, contactPersonDesignation: e.target.value })}
                  placeholder="e.g. Director Quality Enhancement Cell (QEC)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Academic Stats */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>3. Academic Capacity & Accreditations</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Popular Degree Programs (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.popularPrograms}
                  onChange={(e) => setFormData({ ...formData, popularPrograms: e.target.value })}
                  placeholder="e.g. BS Computer Science, BE Electrical Engineering, BBA, MBBS"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Accreditations Held</label>
                <input
                  type="text"
                  value={formData.accreditations}
                  onChange={(e) => setFormData({ ...formData, accreditations: e.target.value })}
                  placeholder="e.g. HEC, PEC (Washington Accord), PMDC, NBEAC"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Student Enrollment</label>
                <input
                  type="text"
                  value={formData.studentEnrollment}
                  onChange={(e) => setFormData({ ...formData, studentEnrollment: e.target.value })}
                  placeholder="e.g. 12,000+ Students"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">Institutional Overview / Mission</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a concise summary of your university's research focus, campus facilities, and academic achievements..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Submitted records undergo verification before appearing on the live board.
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Registration Request</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
