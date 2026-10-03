import React, { useState } from 'react';
import { BOARD_LITERATURE_MATRIX } from '../data/chaptersData';
import { X, Search, Filter, Printer, BookOpen, Check } from 'lucide-react';

interface BoardMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string) => void;
}

export const BoardMatrixModal: React.FC<BoardMatrixModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter
}) => {
  const [filterType, setFilterType] = useState<'all' | 'padya' | 'gadya'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = BOARD_LITERATURE_MATRIX.filter((item) => {
    const matchesFilter = filterType === 'all' || item.type === filterType;
    const matchesQuery =
      item.titleGu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authorGu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genreGu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceBookGu.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 font-gujarati flex items-center gap-2">
                <span>બોર્ડ IMP: કૃતિ - કર્તા - સાહિત્ય પ્રકાર - સંદર્ભ ગ્રંથ કોષ્ટક</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-sans">
                  વિભાગ A & B (૧૦ ગુણ)
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-gujarati">
                બોર્ડ પરીક્ષાના જોડકાં (Match the Following) માટે સૌથી ઝડપી રિવિઝન ચાર્ટ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-white/80 transition-colors"
              title="Print Table"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="શોધો (દા.ત. નરસિંહ મહેતા, નવલિકા, રાવજી)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-gujarati"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all font-gujarati ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              બધાં (૨૪)
            </button>
            <button
              onClick={() => setFilterType('padya')}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all font-gujarati ${
                filterType === 'padya'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              પદ્ય - કાવ્યો (૧૨)
            </button>
            <button
              onClick={() => setFilterType('gadya')}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all font-gujarati ${
                filterType === 'gadya'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              ગદ્ય - પાઠ (૧૨)
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs font-gujarati">
              <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-3 w-12 text-center">ક્રમ</th>
                  <th className="py-3 px-3">કૃતિનું નામ</th>
                  <th className="py-3 px-3">સાહિત્ય પ્રકાર</th>
                  <th className="py-3 px-3">કવિ / લેખક (કર્તા)</th>
                  <th className="py-3 px-3">સંદર્ભ સંગ્રહ / ગ્રંથ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-indigo-50/50 transition-colors cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectChapter(`ch-${String(item.chapterNumber).padStart(2, '0')}`);
                    }}
                  >
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-500">
                      {item.chapterNumber}
                    </td>
                    <td className="py-3 px-3 font-black text-slate-900 text-sm">
                      <div className="flex items-center gap-2">
                        <span>{item.titleGu}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-sans font-bold uppercase ${
                            item.type === 'padya'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-indigo-700">
                      {item.genreGu}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      {item.authorGu}
                    </td>
                    <td className="py-3 px-3 text-slate-600 italic">
                      {item.sourceBookGu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <span>કોષ્ટક પર ક્લિક કરીને સીધા તે પ્રકરણ પર પહોંચી શકો છો.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            બંધ કરો (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
