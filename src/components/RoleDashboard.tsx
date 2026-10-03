import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/StudyContext';
import {
  GraduationCap,
  Users,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  TrendingUp,
  FileSpreadsheet,
  Calendar,
  Building2,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export const RoleDashboard: React.FC<{ onSelectChapter: (chapterId: string) => void }> = ({ onSelectChapter }) => {
  const { currentRole, userProfile, currentSchool } = useAuth();
  const { chapters, studyProgress, totalStudyTimeMinutes, completedChaptersCount } = useStudy();

  const totalChapters = chapters.length; // 24
  const progressPercent = totalChapters > 0 ? Math.round((completedChaptersCount / totalChapters) * 100) : 0;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                {currentRole} portal • {currentSchool.name.split(',')[0]}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                GSEB ધોરણ ૧૦ (2026-27)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-gujarati">
              નમસ્તે, {userProfile?.displayName}
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl font-gujarati leading-relaxed">
              {currentRole === 'student' &&
                'ધોરણ ૧૦ ગુજરાતી પ્રથમ ભાષાના તમામ ૨૪ પ્રકરણો, કવિ-લેખક પરિચય, કૃતિ-કર્તા કોષ્ટક અને સંપૂર્ણ વ્યાકરણ વિભાગની પ્રગતિ.'}
              {currentRole === 'parent' &&
                'તમારા બાળકની ગુજરાતી સાહિત્ય અને વ્યાકરણ તૈયારી, નિયમિત વાંચન સમય અને મોક ટેસ્ટ સ્કોરનું દૈનિક નિરીક્ષણ.'}
              {currentRole === 'teacher' &&
                'વર્ગના વિદ્યાર્થીઓની ગદ્ય-પદ્ય-વ્યાકરણ પ્રગતિ, બોર્ડ પેપર પ્રેક્ટિસ અને મૂલ્યાંકન પરિણામોનું વિશ્લેષણ.'}
              {currentRole === 'principal' &&
                'શાળાના સમગ્ર ધોરણ ૧૦ ના પરિણામનું મોનિટરિંગ, ગુજરાતી વિષયની ગુણવત્તા અને બોર્ડ પરીક્ષા લક્ષ્યાંક.'}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-right">
              <div className="text-xs text-indigo-200 uppercase font-semibold font-gujarati">અભ્યાસક્રમ પૂર્ણતા</div>
              <div className="text-2xl font-black text-white">{progressPercent}%</div>
              <div className="text-[11px] text-slate-300 font-gujarati">{completedChaptersCount} માંથી {totalChapters} પ્રકરણો</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-inner">
              {currentRole === 'student' && <GraduationCap className="w-7 h-7" />}
              {currentRole === 'parent' && <Users className="w-7 h-7" />}
              {currentRole === 'teacher' && <BookOpen className="w-7 h-7" />}
              {currentRole === 'principal' && <ShieldCheck className="w-7 h-7" />}
            </div>
          </div>
        </div>
      </div>

      {/* Role View: STUDENT */}
      {currentRole === 'student' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-2">
                <span className="font-gujarati">તૈયાર પ્રકરણો</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-slate-900">{completedChaptersCount} / {totalChapters}</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1 font-gujarati">ગદ્ય & પદ્ય વિભાગ</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-2">
                <span className="font-gujarati">વ્યાકરણ એકમો</span>
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-slate-900">12 / 12</div>
              <div className="text-xs text-amber-600 font-semibold mt-1 font-gujarati">જોડણી, સંધિ, સમાસ, છંદ...</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-2">
                <span className="font-gujarati">અભ્યાસ સમય</span>
                <Clock className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-black text-slate-900">{totalStudyTimeMinutes} min</div>
              <div className="text-xs text-slate-400 mt-1 font-gujarati">આ અઠવાડિયે સક્રિય</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-2">
                <span className="font-gujarati">બોર્ડ લક્ષ્યાંક</span>
                <Award className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-slate-900">95 / 100</div>
              <div className="text-xs text-purple-600 font-semibold mt-1 font-gujarati">A1 ગ્રેડ ટાર્ગેટ</div>
            </div>
          </div>

          {/* Quick Study Chapters Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base font-gujarati mb-4">
              પ્રકરણવાર પ્રગતિ અને સ્થિતિ (Chapter Progress Tracker)
            </h3>
            <div className="divide-y divide-slate-100">
              {chapters.slice(0, 8).map((ch) => {
                const rec = studyProgress[ch.id];
                const status = rec?.status || 'not_started';
                return (
                  <div key={ch.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-mono text-xs font-bold">
                        {ch.code}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 text-sm font-gujarati">{ch.titleGu}</div>
                        <div className="text-xs text-slate-500 font-gujarati">{ch.authorGu} • {ch.genreGu}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold font-gujarati ${
                          status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : status === 'in_progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {status === 'completed' ? 'તૈયાર' : status === 'in_progress' ? 'ચાલુ' : 'બાકી'}
                      </span>
                      <button
                        onClick={() => onSelectChapter(ch.id)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 font-gujarati"
                      >
                        વાંચો ➔
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Role View: PARENT */}
      {currentRole === 'parent' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-lg font-gujarati mb-2">
              વિદ્યાર્થી પ્રગતિ અહેવાલ (Student Academic Report)
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-gujarati">
              વિદ્યાર્થી: આરવ પટેલ (રોલ નં: 10A-14) • શાળા: {currentSchool.name}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-gujarati">સંપૂર્ણ તૈયાર પ્રકરણો</div>
                <div className="text-xl font-bold text-slate-900 mt-1">{completedChaptersCount} / 24</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-gujarati">વ્યાકરણ પ્રાવીણ્યતા</div>
                <div className="text-xl font-bold text-emerald-600 mt-1">92% (ઉત્કૃષ્ટ)</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-gujarati">સરેરાશ મોક સ્કોર</div>
                <div className="text-xl font-bold text-indigo-600 mt-1">18 / 20</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role View: TEACHER */}
      {currentRole === 'teacher' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-lg font-gujarati">
                વર્ગ ૧૦-A ગુજરાતી વિષય પરિણામ (Class 10-A Analytics)
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
                કુલ વિદ્યાર્થીઓ: 48
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs text-emerald-800 font-bold font-gujarati">A1 ગ્રેડ સંભવિત</div>
                <div className="text-2xl font-black text-emerald-900 mt-1">28 વિદ્યાર્થીઓ</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-xs text-blue-800 font-bold font-gujarati">A2 ગ્રેડ સંભવિત</div>
                <div className="text-2xl font-black text-blue-900 mt-1">16 વિદ્યાર્થીઓ</div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-xs text-amber-800 font-bold font-gujarati">ધ્યાન આપવાની જરૂર</div>
                <div className="text-2xl font-black text-amber-900 mt-1">4 વિદ્યાર્થીઓ</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role View: PRINCIPAL */}
      {currentRole === 'principal' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-lg font-gujarati mb-2">
              શાળા વહીવટી ડેશબોર્ડ (Institutional SaaS Overview)
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Tenant ID: <strong className="text-slate-800">{currentSchool.id}</strong> • {currentSchool.name}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-gujarati">કુલ નામાંકિત વિદ્યાર્થીઓ</div>
                <div className="text-xl font-bold text-slate-900 mt-1">{currentSchool.totalStudents}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-gujarati">ભાષા શિક્ષકો</div>
                <div className="text-xl font-bold text-slate-900 mt-1">{currentSchool.totalTeachers}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-gujarati">સરેરાશ બોર્ડ પરિણામ લક્ષ્યાંક</div>
                <div className="text-xl font-bold text-emerald-600 mt-1">98.5%</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-gujarati">ડિજિટલ નોટ્સ વપરાશ</div>
                <div className="text-xl font-bold text-indigo-600 mt-1">94.2%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
