import React, { useState } from 'react';
import { GRAMMAR_TOPICS } from '../data/grammarData';
import { GrammarTopic, QuizQuestion } from '../types';
import { useStudy } from '../context/StudyContext';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Volume2,
  VolumeX,
  Search,
  Award,
  Layers,
  Zap,
  Check,
  RotateCw,
  ChevronRight,
  Bookmark
} from 'lucide-react';

export const GrammarHub: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic>(GRAMMAR_TOPICS[0]);
  const [activeTab, setActiveTab] = useState<'rules' | 'examples' | 'quiz' | 'boardImps'>('rules');
  const [exampleSearch, setExampleSearch] = useState('');
  
  // Interactive Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  const { speakText, stopSpeaking, isSpeaking } = useStudy();

  const handleOptionSelect = (qId: string, index: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: index }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleQuizReset = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const filteredExamples = selectedTopic.examples.filter(
    (ex) =>
      ex.inputGu.toLowerCase().includes(exampleSearch.toLowerCase()) ||
      ex.outputGu.toLowerCase().includes(exampleSearch.toLowerCase()) ||
      (ex.explanationGu && ex.explanationGu.toLowerCase().includes(exampleSearch.toLowerCase()))
  );

  const calculateScore = () => {
    let score = 0;
    selectedTopic.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-50">
      {/* Left Sidebar: Grammar Topics List */}
      <aside className="w-full lg:w-80 shrink-0 bg-white border-r border-slate-200 flex flex-col h-auto lg:h-[calc(100vh-6rem)]">
        <div className="p-3.5 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>GSEB વ્યાકરણ વિભાગ (Section C)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              ૨૦ ગુણ
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            ધોરણ ૧૦ બોર્ડ પરીક્ષાના તમામ ૧૨ વ્યાકરણ મુદ્દાઓ વિગતવાર
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {GRAMMAR_TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setSelectedAnswers({});
                  setQuizSubmitted(false);
                  setExampleSearch('');
                }}
                className={`w-full text-left p-3.5 transition-all flex items-start gap-3 group ${
                  isSelected
                    ? 'bg-emerald-50/90 text-emerald-950 font-medium border-l-4 border-emerald-600 shadow-xs'
                    : 'hover:bg-slate-50 text-slate-700 border-l-4 border-transparent'
                }`}
              >
                <div
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                  }`}
                >
                  {topic.topicNumber}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-bold text-xs truncate text-slate-900 font-gujarati">
                      {topic.titleGu}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {topic.titleEn}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {topic.boardWeightage}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 self-center text-slate-400 shrink-0 ${
                    isSelected ? 'text-emerald-600 translate-x-0.5' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Grammar Detail Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  મુદ્દો #{selectedTopic.topicNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {selectedTopic.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  {selectedTopic.boardWeightage}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-gujarati mb-1">
                {selectedTopic.titleGu}
              </h1>
              <h2 className="text-sm text-slate-500 font-medium">
                {selectedTopic.titleEn}
              </h2>
            </div>

            {/* Audio Narration Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isSpeaking) {
                    stopSpeaking();
                  } else {
                    const text = `${selectedTopic.titleGu}. વ્યાખ્યા: ${selectedTopic.definitionGu}. ` +
                      selectedTopic.rules.map((r) => `${r.ruleGu}. ${r.explanationGu}`).join('. ');
                    speakText(text, 'gu-IN');
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isSpeaking
                    ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
                title="Listen to grammar explanation in Gujarati"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'અવાજ બંધ કરો' : 'વાંચી સંભળાવો (Audio)'}</span>
              </button>
            </div>
          </div>

          {/* Definition */}
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed font-gujarati">
            <span className="font-bold text-emerald-800 block mb-1">સંકલ્પના અને વ્યાખ્યા:</span>
            {selectedTopic.definitionGu}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('rules')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'rules'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              નિયમો & સમજૂતી ({selectedTopic.rules.length})
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'examples'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              ઉદાહરણ બેંક ({selectedTopic.examples.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'quiz'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              સ્વ-મૂલ્યાંકન ક્વિઝ ({selectedTopic.quiz.length})
            </button>
            <button
              onClick={() => setActiveTab('boardImps')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'boardImps'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              બોર્ડ IMP ગોલ્ડન પોઇન્ટ્સ
            </button>
          </div>
        </div>

        {/* Tab 1: Rules & Explanations */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            {selectedTopic.rules.map((rule, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all"
              >
                <h3 className="text-base font-bold text-slate-900 font-gujarati mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  {rule.ruleGu}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-gujarati leading-relaxed pl-8 mb-3">
                  {rule.explanationGu}
                </p>

                {rule.examplesGu.length > 0 && (
                  <div className="pl-8">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      ઉદાહરણો:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {rule.examplesGu.map((ex, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50/80 text-emerald-900 border border-emerald-200 font-gujarati"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Example Bank */}
        {activeTab === 'examples' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <h3 className="font-bold text-slate-900 font-gujarati text-lg">
                પાઠ્યપુસ્તક આધારિત પરીક્ષાલક્ષી ઉદાહરણો
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={exampleSearch}
                  onChange={(e) => setExampleSearch(e.target.value)}
                  placeholder="ઉદાહરણ શોધો..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-gujarati"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-extrabold text-slate-900 font-gujarati text-sm">
                      {ex.inputGu}
                    </span>
                    {ex.typeGu && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200 shrink-0">
                        {ex.typeGu}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-emerald-800 font-gujarati mb-1">
                    ➔ {ex.outputGu}
                  </div>
                  {ex.explanationGu && (
                    <div className="text-[11px] text-slate-500 font-gujarati">
                      ({ex.explanationGu})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Practice Quiz */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-lg font-gujarati">
                  વ્યાકરણ સ્વ-મૂલ્યાંકન કસોટી
                </h3>
                <p className="text-xs text-slate-500">
                  બોર્ડ પદ્ધતિ અનુસાર સાચો વિકલ્પ પસંદ કરો
                </p>
              </div>

              {quizSubmitted && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">તમારો સ્કોર</div>
                    <div className="text-lg font-black text-emerald-600">
                      {calculateScore()} / {selectedTopic.quiz.length}
                    </div>
                  </div>
                  <button
                    onClick={handleQuizReset}
                    className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                    title="ફરીથી ટેસ્ટ આપો"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {selectedTopic.quiz.map((q, qIndex) => (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-start gap-2.5 mb-3">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm font-gujarati">
                      {q.questionGu}
                    </h4>
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
                        btnStyle = 'bg-emerald-600 border-emerald-600 text-white font-bold';
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizSubmitted}
                          onClick={() => handleOptionSelect(q.id, optIndex)}
                          className={`p-2.5 rounded-lg border text-left text-xs font-gujarati transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-700" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="pl-7 mt-2 p-3 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 font-gujarati">
                      <strong className="block mb-0.5">સાચો ઉત્તર અને સમજૂતી:</strong>
                      {q.explanationGu}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!quizSubmitted && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-xs"
                >
                  જવાબો સબમિટ કરો (Submit Answers)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Board IMPs */}
        {activeTab === 'boardImps' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 font-gujarati text-lg">
                બોર્ડ પરીક્ષા IMP ગોલ્ડન પોઇન્ટ્સ અને વારંવાર પૂછાતા પ્રશ્નો
              </h3>
            </div>

            <div className="space-y-2.5">
              {selectedTopic.boardImps.map((imp, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-2.5 font-gujarati text-xs sm:text-sm text-slate-800"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
