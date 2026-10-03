import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { useAuth } from '../context/AuthContext';
import { ChapterNote } from '../types';
import {
  Volume2,
  VolumeX,
  Bookmark,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Printer,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
  FileText,
  RotateCw,
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  Feather,
  Layers
} from 'lucide-react';

export const ChapterReader: React.FC = () => {
  const {
    selectedChapter,
    studyProgress,
    updateChapterProgress,
    saveQuizScore,
    toggleBookmark,
    isBookmarked,
    speakText,
    stopSpeaking,
    isSpeaking
  } = useStudy();

  const { userProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'notes' | 'flashcards' | 'quiz' | 'personal'>('notes');
  const [copied, setCopied] = useState(false);
  const [personalNotes, setPersonalNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Flashcards state
  const [currentFcIndex, setCurrentFcIndex] = useState(0);
  const [showFcAnswer, setShowFcAnswer] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const progress = studyProgress[selectedChapter.id];
  const currentStatus = progress?.status || 'not_started';
  const bookmarked = isBookmarked(selectedChapter.id);

  const handleCopyNotes = () => {
    const text = `${selectedChapter.code} - ${selectedChapter.titleGu}\n` +
      `કવિ/લેખક: ${selectedChapter.authorGu} | સાહિત્ય પ્રકાર: ${selectedChapter.genreGu} | સંદર્ભ: ${selectedChapter.sourceBookGu}\n\n` +
      selectedChapter.sections.map((s) => `${s.headingGu}\n` + s.contentGu.join('\n')).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusChange = (status: 'not_started' | 'in_progress' | 'completed' | 'revision_needed') => {
    updateChapterProgress(selectedChapter.id, status, 15);
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    await updateChapterProgress(selectedChapter.id, currentStatus, 5, personalNotes);
    setSavingNotes(false);
  };

  const handleQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    let score = 0;
    selectedChapter.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizSubmitted(true);
    await saveQuizScore(selectedChapter.id, score);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      {/* Chapter Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {selectedChapter.code}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  selectedChapter.type === 'padya'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                {selectedChapter.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                પાનાં {selectedChapter.pages}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-gujarati mb-1">
              {selectedChapter.titleGu}
            </h1>
            <h2 className="text-sm text-slate-500 font-medium">
              {selectedChapter.titleEn}
            </h2>

            {/* Author, Genre & Source Book Meta Box */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-gujarati">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50/80 text-indigo-900 border border-indigo-100">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span>કર્તા: <strong>{selectedChapter.authorGu}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 text-emerald-900 border border-emerald-100">
                <Feather className="w-3.5 h-3.5 text-emerald-600" />
                <span>પ્રકાર: <strong>{selectedChapter.genreGu}</strong></span>
              </div>
              {selectedChapter.sourceBookGu && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50/80 text-amber-900 border border-amber-100">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>સંદર્ભ: <strong>{selectedChapter.sourceBookGu}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Audio Narration */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  const speech = `${selectedChapter.titleGu}. કર્તા: ${selectedChapter.authorGu}. સાહિત્ય પ્રકાર: ${selectedChapter.genreGu}. ${selectedChapter.summaryGu}`;
                  speakText(speech, 'gu-IN');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Speak Chapter Summary in Gujarati"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'બંધ કરો' : 'ઓડિયો સાંભળો'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(selectedChapter, selectedChapter.titleGu, selectedChapter.summaryGu)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                bookmarked
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Bookmark this chapter"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{bookmarked ? 'સાચવેલ (Saved)' : 'બુકમાર્ક'}</span>
            </button>

            {/* Copy Notes */}
            <button
              onClick={handleCopyNotes}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
              title="Copy Chapter Notes"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'કૉપી થઈ ગયું!' : 'કૉપી કરો'}</span>
            </button>

            {/* Print */}
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50"
              title="Print Notes"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Study Status Tracker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">અભ્યાસ સ્થિતિ (Status):</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleStatusChange('in_progress')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  currentStatus === 'in_progress'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                વાંચન ચાલુ
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  currentStatus === 'completed'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                સંપૂર્ણ તૈયાર
              </button>
              <button
                onClick={() => handleStatusChange('revision_needed')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  currentStatus === 'revision_needed'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                રિવિઝન બાકી
              </button>
            </div>
          </div>

          {progress && progress.timeSpentMinutes > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>વિતાવેલો સમય: {progress.timeSpentMinutes} મિનિટ</span>
            </div>
          )}
        </div>
      </div>

      {/* Chapter Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'notes'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>મુખ્ય નોંધ & ભાવાર્થ ({selectedChapter.sections.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'flashcards'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>સ્વ-મૂલ્યાંકન કાર્ડ્સ ({selectedChapter.flashcards.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>બોર્ડ ક્વિઝ / MCQ ({selectedChapter.quiz.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('personal')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'personal'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>મારી વ્યક્તિગત નોંધ</span>
        </button>
      </div>

      {/* Tab 1: Detailed Notes & Sections */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Chapter Summary Callout */}
          <div className="bg-gradient-to-r from-indigo-50/70 to-blue-50/70 rounded-2xl p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-2 text-indigo-900 font-bold text-sm font-gujarati">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>પ્રકરણ સારાંશ (Quick Chapter Essence):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-gujarati mb-2">
              {selectedChapter.summaryGu}
            </p>
            <p className="text-xs text-slate-600 italic">
              {selectedChapter.summaryEn}
            </p>
          </div>

          {/* Quick Facts Grid */}
          {selectedChapter.quickFacts.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                ઝડપી તથ્યો (Quick Reference Facts)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedChapter.quickFacts.map((fact, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 font-gujarati mb-1">
                      {fact.labelGu}
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 font-gujarati">
                      {fact.valueGu}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual Note Sections */}
          <div className="space-y-4">
            {selectedChapter.sections.map((section, idx) => (
              <div
                key={section.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 font-gujarati flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-mono font-bold">
                      {idx + 1}
                    </span>
                    <span>{section.headingGu}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    Page {section.pageRef}
                  </span>
                </div>

                {/* Content points */}
                <ul className="space-y-2.5 font-gujarati text-xs sm:text-sm text-slate-700 leading-relaxed pl-2 mb-4">
                  {section.contentGu.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Section-specific Grammar Highlights */}
                {section.grammarHighlights && section.grammarHighlights.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>આ વિભાગમાંથી પૂછાતું વ્યાકરણ (Grammar Highlights):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {section.grammarHighlights.map((gh, gIdx) => (
                        <div
                          key={gIdx}
                          className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs font-gujarati"
                        >
                          <span className="font-bold text-slate-900">{gh.termGu}</span>
                          <span className="text-emerald-900 text-[11px]">➔ {gh.ruleGu} ({gh.typeGu})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400">
              કાર્ડ {currentFcIndex + 1} / {selectedChapter.flashcards.length}
            </span>
            <span className="text-xs text-slate-500">ક્લિક કરીને ઉત્તર જુઓ</span>
          </div>

          {selectedChapter.flashcards.length > 0 && (
            <div
              onClick={() => setShowFcAnswer(!showFcAnswer)}
              className="min-h-[220px] p-6 rounded-2xl border-2 border-indigo-100 bg-gradient-to-tr from-indigo-50/40 via-white to-blue-50/40 flex flex-col justify-center items-center text-center cursor-pointer shadow-xs hover:border-indigo-300 transition-all select-none"
            >
              {!showFcAnswer ? (
                <div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                    પ્રશ્ન (Question)
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-gujarati">
                    {selectedChapter.flashcards[currentFcIndex].questionGu}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    {selectedChapter.flashcards[currentFcIndex].questionEn}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                    ઉત્તર (Answer)
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-emerald-950 font-gujarati">
                    {selectedChapter.flashcards[currentFcIndex].answerGu}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2">
                    {selectedChapter.flashcards[currentFcIndex].answerEn}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => {
                setShowFcAnswer(false);
                setCurrentFcIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentFcIndex === 0}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>અગાઉનું</span>
            </button>
            <button
              onClick={() => {
                setShowFcAnswer(false);
                setCurrentFcIndex((prev) => Math.min(selectedChapter.flashcards.length - 1, prev + 1));
              }}
              disabled={currentFcIndex === selectedChapter.flashcards.length - 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 transition-colors"
            >
              <span>આગળનું</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-lg font-gujarati">
                {selectedChapter.titleGu} - MCQ બોર્ડ મોક ટેસ્ટ
              </h3>
              <p className="text-xs text-slate-500">બોર્ડ પરીક્ષા પદ્ધતિ અનુસાર સ્વ-મૂલ્યાંકન</p>
            </div>

            {quizSubmitted && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500">મેળવેલા ગુણ</div>
                  <div className="text-lg font-black text-indigo-600">
                    {selectedChapter.quiz.filter((q) => selectedAnswers[q.id] === q.correctIndex).length} / {selectedChapter.quiz.length}
                  </div>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  title="રીસેટ કરો"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {selectedChapter.quiz.map((q, qIndex) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex items-start gap-2.5 mb-3">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-gujarati">
                      {q.questionGu}
                    </h4>
                    <p className="text-xs text-slate-400">{q.questionEn}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7 mb-3">
                  {q.optionsGu.map((opt, optIndex) => {
                    const isChosen = selectedAnswers[q.id] === optIndex;
                    const isCorrect = q.correctIndex === optIndex;
                    let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isChosen && !isCorrect) {
                        btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                      }
                    } else if (isChosen) {
                      btnStyle = 'bg-indigo-600 border-indigo-600 text-white font-bold';
                    }

                    return (
                      <button
                        key={optIndex}
                        disabled={quizSubmitted}
                        onClick={() => handleQuizOption(q.id, optIndex)}
                        className={`p-2.5 rounded-lg border text-left text-xs font-gujarati transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-700" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="pl-7 mt-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-gujarati">
                    <strong className="block mb-0.5">વિશ્લેષણ:</strong>
                    {q.explanationGu}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!quizSubmitted && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-xs"
              >
                ક્વિઝ સબમિટ કરો (Submit Quiz)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Personal Notes */}
      {activeTab === 'personal' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs max-w-3xl">
          <h3 className="font-bold text-slate-900 text-base font-gujarati mb-1">
            {selectedChapter.titleGu} માટે તમારી વ્યક્તિગત નોંધ
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            આ નોંધ તમારા એકાઉન્ટ / શાળા આઈડી સાથે ક્લાઉડમાં સુરક્ષિત રીતે સચવાશે.
          </p>

          <textarea
            value={personalNotes}
            onChange={(e) => setPersonalNotes(e.target.value)}
            placeholder="તમારા મનપસંદ પ્રશ્નો, રિવિઝન પોઇન્ટ્સ કે સંકેતો અહીં લખો..."
            className="w-full h-48 p-4 rounded-xl border border-slate-200 text-xs font-gujarati focus:outline-hidden focus:ring-2 focus:ring-indigo-500 mb-4"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {savingNotes ? 'સાચવી રહ્યું છે...' : 'નોંધ સાચવો (Save Notes)'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
