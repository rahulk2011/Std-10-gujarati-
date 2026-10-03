/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { StudyProvider, useStudy } from './context/StudyContext';
import { Navbar } from './components/Navbar';
import { ChapterSidebar } from './components/ChapterSidebar';
import { ChapterReader } from './components/ChapterReader';
import { GrammarHub } from './components/GrammarHub';
import { BoardMatrixModal } from './components/BoardMatrixModal';
import { RoleDashboard } from './components/RoleDashboard';
import { BookmarksModal } from './components/BookmarksModal';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<'notes' | 'grammar' | 'dashboard'>('notes');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isBoardMatrixOpen, setIsBoardMatrixOpen] = useState(false);
  const { setSelectedChapter, chapters } = useStudy();

  const handleSelectChapterById = (chapterId: string) => {
    const found = chapters.find((c) => c.id.toLowerCase().includes(chapterId.toLowerCase()) || c.id === chapterId);
    if (found) {
      setSelectedChapter(found);
      setActiveTab('notes');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenBoardMatrix={() => setIsBoardMatrixOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden max-w-7xl w-full mx-auto">
        {activeTab === 'notes' ? (
          <>
            {/* Desktop & Mobile Chapter Sidebar */}
            <div
              className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
                isSidebarOpen ? 'translate-x-0 top-16 bg-white shadow-2xl' : '-translate-x-full'
              } lg:top-0 lg:shadow-none`}
            >
              <ChapterSidebar onSelectChapter={() => setIsSidebarOpen(false)} />
            </div>

            {/* Mobile backdrop */}
            {isSidebarOpen && (
              <div
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/40 z-20 lg:hidden"
              />
            )}

            {/* Chapter Reader */}
            <ChapterReader />
          </>
        ) : activeTab === 'grammar' ? (
          /* Comprehensive Grammar Section C Hub */
          <GrammarHub />
        ) : (
          /* Multi-Tenant SaaS Role Dashboard (Student, Parent, Teacher, Principal) */
          <RoleDashboard onSelectChapter={handleSelectChapterById} />
        )}
      </div>

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        onSelectChapter={handleSelectChapterById}
      />

      {/* Board Literature Matrix Modal (કૃતિ - કર્તા - પ્રકાર - સંદર્ભ ગ્રંથ) */}
      <BoardMatrixModal
        isOpen={isBoardMatrixOpen}
        onClose={() => setIsBoardMatrixOpen(false)}
        onSelectChapter={handleSelectChapterById}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StudyProvider>
        <MainAppContent />
      </StudyProvider>
    </AuthProvider>
  );
}
