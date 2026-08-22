import React, { useState } from 'react';
import { RANKING_METHODOLOGY_CRITERIA } from '../../data/universitiesData';
import {
  BookOpen,
  GraduationCap,
  ShieldAlert,
  Award,
  CheckCircle2,
  HelpCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Globe,
  Sparkles,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the purpose of the Pakistan Universities Rankings?',
      a: 'The platform provides an intuitive, data-driven resource for students, parents, and scholars across Pakistan to explore accredited higher education institutions, compare engineering and medical faculties, understand merit cutoff benchmarks, and make informed academic decisions.',
    },
    {
      q: 'Are these rankings official government rankings from the HEC?',
      a: 'This ranking platform operates an independent assessment model synthesizing published faculty research impact, national accreditations (HEC, PEC, PMDC, PBC), graduate employability, and peer citations. Unless explicitly cited as a statutory ranking, the rankings are computed under our open methodology for guidance and academic modeling.',
    },
    {
      q: 'How can a university submit or update its official institutional data?',
      a: 'Institutional Quality Enhancement Cells (QEC) or Registrar offices can use the "Register University" portal to submit verified metrics, campus updates, new degree accreditations, or correction requests.',
    },
    {
      q: 'How is the Graduate Employability score calculated?',
      a: 'Graduate Employability (15% weight) is evaluated using corporate campus recruitment activity, alumni leadership tracking across major Pakistani employers, and job placement survey indexes within 6-12 months of graduation.',
    },
    {
      q: 'How does the Student Match Finder work?',
      a: 'The Match Finder analyzes your FSC or A-Level percentage against historical university admission cutoffs and program competitiveness tiers to estimate your likelihood of acceptance (High Chance, Target Match, or Dream/Reach).',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-900" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            About & Ranking Methodology
          </h1>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Our mission, assessment framework, quality indicators, and data transparency commitments.
        </p>
      </div>

      {/* 1. MISSION & VISION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold">
          <GraduationCap className="w-4 h-4" />
          <span>Our Academic Mission</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
          Empowering Pakistani Students Through Transparent Higher Education Insights
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          Choosing a university is one of the most critical decisions for a student in Pakistan. Navigating through
          provincial quotas, engineering accreditation tiers (PEC Washington Accord), medical council recognitions
          (PMDC), and business accreditations (NBEAC) can be overwhelming. Pakistan Universities Rankings was built to
          unify this information into a cohesive, interactive portal.
        </p>
      </div>

      {/* 2. TRANSPARENCY & ACCURACY NOTICE */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Ranking Modeling Transparency Notice</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed">
          Please note that the rankings and metric scores published on this platform represent our independent academic
          evaluation framework synthesized from publicly available university publications, accreditation records, and
          educational research benchmarks. They are designed to serve as an illustrative guide for students and do not
          replace direct official regulatory announcements from statutory bodies such as the Higher Education Commission
          (HEC) of Pakistan.
        </p>
      </div>

      {/* 3. EVALUATION PILLARS & WEIGHTS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            2026 Evaluation Framework & Criteria Weights
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Total 100% composite score derived from 8 balanced pillars
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RANKING_METHODOLOGY_CRITERIA.map((crit) => (
            <div
              key={crit.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">{crit.name}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{crit.description}</p>
              </div>
              <span className="px-2.5 py-1 bg-blue-100 text-blue-900 rounded-lg text-xs font-mono font-extrabold shrink-0">
                {crit.weight}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-700" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;

            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. CONTACT INFO */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-green-700" />
          <span>Contact Academic Review Secretariat</span>
        </h3>
        <p className="text-xs text-slate-500">
          For university profile corrections, research verification, or institutional inquiries, reach out to our team:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>Higher Education Directorate, Islamabad, Pakistan</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-700 shrink-0" />
            <span>evaluation@pakistanunirankings.edu.pk</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-700 shrink-0" />
            <span>+92 (51) 9085-3000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
