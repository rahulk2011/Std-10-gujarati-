import { ChapterNote } from '../types';
import { GUJARATI_CHAPTERS_PART_1 } from './gujaratiChaptersPart1';
import { GUJARATI_CHAPTERS_PART_2 } from './gujaratiChaptersPart2';
import { GUJARATI_CHAPTERS_PART_3 } from './gujaratiChaptersPart3';
import { GUJARATI_CHAPTERS_PART_4 } from './gujaratiChaptersPart4';

export const ALL_CHAPTERS: ChapterNote[] = [
  ...GUJARATI_CHAPTERS_PART_1,
  ...GUJARATI_CHAPTERS_PART_2,
  ...GUJARATI_CHAPTERS_PART_3,
  ...GUJARATI_CHAPTERS_PART_4,
];

export const CATEGORIES = [
  'બધું (All)',
  'પદ્ય (કાવ્ય વિભાગ)',
  'ગદ્ય (પાઠ વિભાગ)'
];

export interface LiteratureItem {
  id: string;
  chapterNumber: number;
  code: string;
  titleGu: string;
  authorGu: string;
  genreGu: string;
  sourceBookGu: string;
  type: 'padya' | 'gadya';
}

export const BOARD_LITERATURE_MATRIX: LiteratureItem[] = [
  { id: 'm-1', chapterNumber: 1, code: 'GUJ:01', titleGu: 'વૈષ્ણવજન', authorGu: 'નરસિંહ મહેતા', genreGu: 'પદ (ભજન / પ્રભાતિયું)', sourceBookGu: 'નરસિંહ શ્રેષ્ઠ પદમાળા', type: 'padya' },
  { id: 'm-2', chapterNumber: 2, code: 'GUJ:02', titleGu: 'રેસનો ઘોડો', authorGu: 'વર્ષા અડાલજા', genreGu: 'નવલિકા (ટૂંકી વાર્તા)', sourceBookGu: 'કોઈ વાર થાય કે...', type: 'gadya' },
  { id: 'm-3', chapterNumber: 3, code: 'GUJ:03', titleGu: 'શીલવંત સાધુને', authorGu: 'ગંગાસતી', genreGu: 'ભજન / પદ', sourceBookGu: 'ગંગાસતીની ભજનગંગા', type: 'padya' },
  { id: 'm-4', chapterNumber: 4, code: 'GUJ:04', titleGu: 'ગોપાળબાપા', authorGu: 'મનુભાઈ પંચોળી ‘દર્શક’', genreGu: 'નવલકથા અંશ', sourceBookGu: 'ઝેર તો પીધાં છે જાણી જાણી (ભાગ-૧)', type: 'gadya' },
  { id: 'm-5', chapterNumber: 5, code: 'GUJ:05', titleGu: 'દીકરી', authorGu: 'અશોક ચાવડા ‘બેદિલ’', genreGu: 'ગઝલ', sourceBookGu: 'પગલાં તળાવમાં', type: 'padya' },
  { id: 'm-6', chapterNumber: 6, code: 'GUJ:06', titleGu: 'વાઇરલ ઇન્ફેક્શન', authorGu: 'ગુણવંત શાહ', genreGu: 'નિબંધ', sourceBookGu: 'મરો ત્યાં સુધી જીવો', type: 'gadya' },
  { id: 'm-7', chapterNumber: 7, code: 'GUJ:07', titleGu: 'હું એવો ગુજરાતી', authorGu: 'વિનોદ જોશી', genreGu: 'ગીત (ગૌરવગીત)', sourceBookGu: 'વિનોદ જોશી કાવ્યસંચય', type: 'padya' },
  { id: 'm-8', chapterNumber: 8, code: 'GUJ:08', titleGu: 'છત્રી', authorGu: 'રતિલાલ બોરીસાગર', genreGu: 'હાસ્ય નિબંધ', sourceBookGu: 'ઓમ હાસ્યમ્', type: 'gadya' },
  { id: 'm-9', chapterNumber: 9, code: 'GUJ:09', titleGu: 'માધવને દીઠો છે ક્યાંય?', authorGu: 'હરીન્દ્ર દવે', genreGu: 'ઉર્મિગીત', sourceBookGu: 'વરસાદની મોસમ છે', type: 'padya' },
  { id: 'm-10', chapterNumber: 10, code: 'GUJ:10', titleGu: 'ડાંગવનો અને...', authorGu: 'મહેન્દ્રસિંહ પરમાર', genreGu: 'પ્રવાસ નિબંધ (પત્ર રૂપ)', sourceBookGu: 'રખડુનો કાગળ', type: 'gadya' },
  { id: 'm-11', chapterNumber: 11, code: 'GUJ:11', titleGu: 'શિકારીને', authorGu: 'કલાપી (સુરસિંહજી ગોહિલ)', genreGu: 'સોનેટ (પ્રકૃતિ કાવ્ય)', sourceBookGu: 'કલાપીનો કેકારવ', type: 'padya' },
  { id: 'm-12', chapterNumber: 12, code: 'GUJ:12', titleGu: 'ચોપડાની ઇન્દ્રજાળ', authorGu: 'ચંદ્રકાન્ત પંડ્યા', genreGu: 'આત્મકથા ખંડ', sourceBookGu: 'બાનો ભીખુ', type: 'gadya' },
  { id: 'm-13', chapterNumber: 13, code: 'GUJ:13', titleGu: 'વતનથી વિદાય થતાં', authorGu: 'જયંત પાઠક', genreGu: 'સોનેટ (સ્મૃતિ કાવ્ય)', sourceBookGu: 'અંતરિક્ષ', type: 'padya' },
  { id: 'm-14', chapterNumber: 14, code: 'GUJ:14', titleGu: 'જનમી', authorGu: 'સુરેશ જોષી', genreGu: 'વાર્તા', sourceBookGu: 'ગૃહપ્રવેશ', type: 'gadya' },
  { id: 'm-15', chapterNumber: 15, code: 'GUJ:15', titleGu: 'તે બેસે અહીં', authorGu: 'સ્નેહી પરમાર', genreGu: 'ગઝલ', sourceBookGu: 'સ્નેહી પરમાર ગઝલસંગ્રહ', type: 'padya' },
  { id: 'm-16', chapterNumber: 16, code: 'GUJ:16', titleGu: 'ગતિભંગ', authorGu: 'મોહનલાલ પટેલ', genreGu: 'લઘુકથા', sourceBookGu: 'મોહનલાલ પટેલની લઘુકથાઓ', type: 'gadya' },
  { id: 'm-17', chapterNumber: 17, code: 'GUJ:17', titleGu: 'દિવસો જુદાઈના જાય છે', authorGu: 'ગની દહીંવાલા', genreGu: 'ગઝલ', sourceBookGu: 'મહેક', type: 'padya' },
  { id: 'm-18', chapterNumber: 18, code: 'GUJ:18', titleGu: 'ભૂખથીય ભૂંડી ભીખ', authorGu: 'પન્નાલાલ પટેલ', genreGu: 'નવલકથા ખંડ', sourceBookGu: 'માનવીની ભવાઈ', type: 'gadya' },
  { id: 'm-19', chapterNumber: 19, code: 'GUJ:19', titleGu: 'એક બપોરે', authorGu: 'રાવજી પટેલ', genreGu: 'ઉર્મિકાવ્ય', sourceBookGu: 'અંગત', type: 'padya' },
  { id: 'm-20', chapterNumber: 20, code: 'GUJ:20', titleGu: 'વિરલ વિભૂતિ', authorGu: 'આત્મર્પિત અપૂર્વજી', genreGu: 'ચરિત્ર નિબંધ', sourceBookGu: 'શ્રીમદ્ રાજચંદ્ર જીવનદર્શન', type: 'gadya' },
  { id: 'm-21', chapterNumber: 21, code: 'GUJ:21', titleGu: 'ચાંદલિયો', authorGu: 'લોકસાહિત્ય (ઝવેરચંદ મેઘાણી સંપાદિત)', genreGu: 'લોકગીત (ગરબો)', sourceBookGu: 'રઢિયાળી રાત', type: 'padya' },
  { id: 'm-22', chapterNumber: 22, code: 'GUJ:22', titleGu: 'પાવન પંથે', authorGu: 'લલિત ત્રિવેદી', genreGu: 'પ્રેરક પ્રસંગ કથા', sourceBookGu: 'જીવન પ્રેરણા કથાઓ', type: 'gadya' },
  { id: 'm-23', chapterNumber: 23, code: 'GUJ:23', titleGu: 'બોલીએ ના કંઈ', authorGu: 'રાજેન્દ્ર શાહ', genreGu: 'ગીત (ચિંતનાત્મક)', sourceBookGu: 'શ્રુતિ', type: 'padya' },
  { id: 'm-24', chapterNumber: 24, code: 'GUJ:24', titleGu: 'ઘોડીની સ્વામીભક્તિ', authorGu: 'જોરાવરસિંહ જાદવ', genreGu: 'લોકકથા', sourceBookGu: 'લોકસાહિત્યની અશ્વકથાઓ', type: 'gadya' },
];
