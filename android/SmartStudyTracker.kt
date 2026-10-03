package com.edusmart.studytracker

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob

/**
 * Smart Study Tracker - Pan-India B2B EdTech SaaS Architecture
 * GSEB Class 10 Gujarati First Language (ધોરણ ૧૦ ગુજરાતી પ્રથમ ભાષા) & Grammar Hub (સંપૂર્ણ વ્યાકરણ)
 *
 * Clean Architecture + MVVM + Jetpack Compose (Material 3) + Firebase Multi-Tenancy (schoolId)
 */

// ==========================================
// 1. DOMAIN LAYER: ENTITIES & VALUE OBJECTS
// ==========================================

enum class UserRole {
    STUDENT,
    PARENT,
    TEACHER,
    PRINCIPAL
}

enum class ChapterStudyStatus {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED,
    REVISION_NEEDED
}

enum class LiteratureType {
    PADYA,  // કાવ્ય (Poetry)
    GADYA   // પાઠ (Prose)
}

data class SchoolTenant(
    val schoolId: String,
    val schoolName: String,
    val schoolCode: String,
    val city: String,
    val state: String,
    val boardAffiliation: String,
    val totalStudents: Int,
    val totalTeachers: Int
)

data class AppUser(
    val uid: String,
    val email: String,
    val displayName: String,
    val role: UserRole,
    val schoolId: String,
    val classGrade: String? = "Class 10",
    val rollNumber: String? = null,
    val childrenStudentIds: List<String> = emptyList()
)

data class GujaratiChapter(
    val id: String,
    val chapterNumber: Int,
    val code: String,
    val titleGu: String,
    val titleEn: String,
    val authorGu: String,      // કવિ / લેખક
    val genreGu: String,       // સાહિત્ય પ્રકાર
    val sourceBookGu: String,  // સંદર્ભ ગ્રંથ
    val type: LiteratureType,
    val pagesRange: String,
    val summaryGu: String,
    val totalSectionsCount: Int
)

data class GrammarTopicModel(
    val id: String,
    val topicNumber: Int,
    val titleGu: String,
    val titleEn: String,
    val boardWeightage: String,
    val rulesCount: Int,
    val totalExamples: Int
)

data class StudentProgress(
    val progressId: String,
    val studentId: String,
    val schoolId: String,      // Strict multi-tenant isolation
    val chapterId: String,
    val status: ChapterStudyStatus,
    val timeSpentMinutes: Int,
    val quizScore: Int?,
    val personalNotes: String,
    val lastUpdatedTimestamp: Long
)

data class SchoolAnalyticsMetric(
    val schoolId: String,
    val totalEnrolledStudents: Int,
    val overallSyllabusCompletionRate: Float,
    val averageGujaratiScore: Float,
    val grammarProficiencyRate: Float
)

// ==========================================
// 2. DATA LAYER: REPOSITORY & TENANT ISOLATION
// ==========================================

interface GujaratiStudyRepository {
    suspend fun getChaptersForSchool(schoolId: String): List<GujaratiChapter>
    suspend fun getGrammarTopics(): List<GrammarTopicModel>
    suspend fun getStudentProgress(schoolId: String, studentId: String): List<StudentProgress>
    suspend fun saveProgress(progress: StudentProgress): Result<Unit>
    suspend fun getSchoolAnalytics(schoolId: String): Result<SchoolAnalyticsMetric>
}

class FirestoreGujaratiStudyRepository : GujaratiStudyRepository {
    private val inMemoryProgress = mutableMapOf<String, StudentProgress>()

    override suspend fun getChaptersForSchool(schoolId: String): List<GujaratiChapter> {
        // Multi-tenant check: schoolId is strictly enforced
        require(schoolId.isNotBlank()) { "Security Violation: schoolId cannot be blank for tenant query" }
        return listOf(
            GujaratiChapter(
                id = "ch-01-vaishnavjan",
                chapterNumber = 1,
                code = "GUJ:01",
                titleGu = "વૈષ્ણવજન",
                titleEn = "Vaishnav Jan To Tene Kahiye",
                authorGu = "નરસિંહ મહેતા",
                genreGu = "પદ / ભજન",
                sourceBookGu = "નરસિંહ શ્રેષ્ઠ પદમાળા",
                type = LiteratureType.PADYA,
                pagesRange = "1 - 4",
                summaryGu = "આદિકવિ નરસિંહ મહેતા રચિત ગાંધીજીનું પ્રિય ભજન: સાચા વૈષ્ણવના સદ્ગુણોનું દર્શન.",
                totalSectionsCount = 3
            ),
            GujaratiChapter(
                id = "ch-02-res-no-ghodo",
                chapterNumber = 2,
                code = "GUJ:02",
                titleGu = "રેસનો ઘોડો",
                titleEn = "Res No Ghodo",
                authorGu = "વર્ષા અડાલજા",
                genreGu = "નવલિકા",
                sourceBookGu = "કોઈ વાર થાય કે...",
                type = LiteratureType.GADYA,
                pagesRange = "5 - 12",
                summaryGu = "બાળકોને શિક્ષણના ભારણમાંથી મુક્ત કરી સંસ્કાર અને પ્રેમ આપવાની પ્રેરક નવલિકા.",
                totalSectionsCount = 2
            ),
            GujaratiChapter(
                id = "ch-03-sheelvant-sadhune",
                chapterNumber = 3,
                code = "GUJ:03",
                titleGu = "શીલવંત સાધુને",
                titleEn = "Sheelvant Sadhune",
                authorGu = "ગંગાસતી",
                genreGu = "ભજન / પદ",
                sourceBookGu = "ગંગાસતીની ભજનગંગા",
                type = LiteratureType.PADYA,
                pagesRange = "13 - 16",
                summaryGu = "પાનબાઈને ઉદ્દેશીને ગવાયેલું પદ: ચારિત્ર્યવાન સાચા સંતનાં પવિત્ર લક્ષણો.",
                totalSectionsCount = 2
            ),
            GujaratiChapter(
                id = "ch-04-gopalbapa",
                chapterNumber = 4,
                code = "GUJ:04",
                titleGu = "ગોપાળબાપા",
                titleEn = "Gopalbapa",
                authorGu = "મનુભાઈ પંચોળી ‘દર્શક’",
                genreGu = "નવલકથા અંશ",
                sourceBookGu = "ઝેર તો પીધાં છે જાણી જાણી (ભાગ-૧)",
                type = LiteratureType.GADYA,
                pagesRange = "17 - 24",
                summaryGu = "મહારાજા સયાજીરાવ અને ગોપાળબાપા વચ્ચેનો અમર સંવાદ અને મિત્રપ્રેમ.",
                totalSectionsCount = 2
            ),
            GujaratiChapter(
                id = "ch-11-shikarine",
                chapterNumber = 11,
                code = "GUJ:11",
                titleGu = "શિકારીને",
                titleEn = "Shikarine",
                authorGu = "કલાપી",
                genreGu = "સોનેટ",
                sourceBookGu = "કલાપીનો કેકારવ",
                type = LiteratureType.PADYA,
                pagesRange = "61 - 64",
                summaryGu = "સૌંદર્ય પામતાં પહેલાં સૌંદર્ય બનવું પડે: અહિંસા અને પ્રકૃતિ પ્રેમનું સોનેટ.",
                totalSectionsCount = 2
            ),
            GujaratiChapter(
                id = "ch-18-bhukhthiy-bhundi-bhikh",
                chapterNumber = 18,
                code = "GUJ:18",
                titleGu = "ભૂખથીય ભૂંડી ભીખ",
                titleEn = "Bhukhthiy Bhundi Bhikh",
                authorGu = "પન્નાલાલ પટેલ",
                genreGu = "નવલકથા ખંડ",
                sourceBookGu = "માનવીની ભવાઈ",
                type = LiteratureType.GADYA,
                pagesRange = "97 - 104",
                summaryGu = "છપ્પનિયા દુકાળની કરુણ વાસ્તવિકતા અને કાળુ ખેડૂતની અડગ ખુમારી.",
                totalSectionsCount = 2
            )
        )
    }

    override suspend fun getGrammarTopics(): List<GrammarTopicModel> {
        return listOf(
            GrammarTopicModel("v1", 1, "જોડણી અને નિયમો", "Spelling Rules", "2 Marks", 5, 25),
            GrammarTopicModel("v2", 2, "સંધિ (જોડો & છોડો)", "Sandhi", "2 Marks", 4, 30),
            GrammarTopicModel("v3", 3, "સમાસ ઓળખાવો", "Samas", "2 Marks", 7, 40),
            GrammarTopicModel("v4", 4, "અલંકાર ઓળખાવો", "Alankar", "2 Marks", 8, 35),
            GrammarTopicModel("v5", 5, "છંદ પરિચય & બંધારણ", "Chhand", "2 Marks", 6, 20),
            GrammarTopicModel("v6", 6, "કૃદંત અને પ્રકારો", "Krudant", "1 Mark", 6, 25),
            GrammarTopicModel("v7", 7, "નિપાત ઓળખાવો", "Nipat", "1 Mark", 4, 20),
            GrammarTopicModel("v8", 8, "વાક્ય રૂપાંતર (કર્તરિ/કર્મણિ)", "Voice Transformation", "2 Marks", 4, 25),
            GrammarTopicModel("v9", 9, "રૂઢિપ્રયોગો અને અર્થ", "Idioms & Phrases", "2 Marks", 2, 45),
            GrammarTopicModel("v10", 10, "કહેવતો અને અર્થ", "Proverbs", "1 Mark", 2, 25),
            GrammarTopicModel("v11", 11, "શબ્દસમૂહ માટે એક શબ્દ", "One Word Substitution", "2 Marks", 2, 50),
            GrammarTopicModel("v12", 12, "વિભક્તિ, અનુગ & સંયોજક", "Case Markers & Conjunctions", "2 Marks", 3, 30)
        )
    }

    override suspend fun getStudentProgress(schoolId: String, studentId: String): List<StudentProgress> {
        require(schoolId.isNotBlank()) { "Security Exception: Missing tenant boundary schoolId" }
        return inMemoryProgress.values.filter { it.schoolId == schoolId && it.studentId == studentId }
    }

    override suspend fun saveProgress(progress: StudentProgress): Result<Unit> {
        require(progress.schoolId.isNotBlank()) { "Tenant violation: Empty schoolId" }
        inMemoryProgress[progress.progressId] = progress
        return Result.success(Unit)
    }

    override suspend fun getSchoolAnalytics(schoolId: String): Result<SchoolAnalyticsMetric> {
        require(schoolId.isNotBlank()) { "Security Exception: schoolId required" }
        return Result.success(
            SchoolAnalyticsMetric(
                schoolId = schoolId,
                totalEnrolledStudents = 240,
                overallSyllabusCompletionRate = 84.5f,
                averageGujaratiScore = 88.2f,
                grammarProficiencyRate = 91.0f
            )
        )
    }
}

// ==========================================
// 3. DOMAIN USE CASES
// ==========================================

class GetGujaratiSyllabusUseCase(private val repository: GujaratiStudyRepository) {
    suspend operator fun invoke(schoolId: String): Result<List<GujaratiChapter>> {
        return try {
            val list = repository.getChaptersForSchool(schoolId)
            Result.success(list)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

class GetGrammarTopicsUseCase(private val repository: GujaratiStudyRepository) {
    suspend operator fun invoke(): Result<List<GrammarTopicModel>> {
        return try {
            val topics = repository.getGrammarTopics()
            Result.success(topics)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

class UpdateGujaratiProgressUseCase(private val repository: GujaratiStudyRepository) {
    suspend operator fun invoke(
        studentId: String,
        schoolId: String,
        chapterId: String,
        newStatus: ChapterStudyStatus,
        additionalMinutes: Int
    ): Result<Unit> {
        val progress = StudentProgress(
            progressId = "${studentId}_${chapterId}",
            studentId = studentId,
            schoolId = schoolId,
            chapterId = chapterId,
            status = newStatus,
            timeSpentMinutes = additionalMinutes,
            quizScore = null,
            personalNotes = "",
            lastUpdatedTimestamp = System.currentTimeMillis()
        )
        return repository.saveProgress(progress)
    }
}

// ==========================================
// 4. PRESENTATION: MVVM VIEWMODEL WITH UDF
// ==========================================

data class GujaratiStudyUiState(
    val currentRole: UserRole = UserRole.STUDENT,
    val activeSchool: SchoolTenant = SchoolTenant(
        schoolId = "school_dps_gn",
        schoolName = "Delhi Public School, Gandhinagar",
        schoolCode = "DPS-GUJ-01",
        city = "Gandhinagar",
        state = "Gujarat",
        boardAffiliation = "GSEB / CBSE",
        totalStudents = 1240,
        totalTeachers = 68
    ),
    val chapters: List<GujaratiChapter> = emptyList(),
    val grammarTopics: List<GrammarTopicModel> = emptyList(),
    val completedCount: Int = 0,
    val totalStudyMinutes: Int = 0,
    val activeTab: String = "chapters", // "chapters", "grammar", "matrix", "dashboard"
    val isLoading: Boolean = false,
    val errorMessage: String? = null
)

sealed interface GujaratiUiIntent {
    data class SwitchRole(val role: UserRole) : GujaratiUiIntent
    data class SwitchSchool(val school: SchoolTenant) : GujaratiUiIntent
    data class SwitchTab(val tab: String) : GujaratiUiIntent
    data class MarkChapterStatus(val chapterId: String, val status: ChapterStudyStatus) : GujaratiUiIntent
    object RefreshData : GujaratiUiIntent
}

class GujaratiStudyTrackerViewModel(
    private val getSyllabusUseCase: GetGujaratiSyllabusUseCase,
    private val getGrammarUseCase: GetGrammarTopicsUseCase,
    private val updateProgressUseCase: UpdateGujaratiProgressUseCase,
    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main + SupervisorJob())
) {
    private val _uiState = MutableStateFlow(GujaratiStudyUiState())
    val uiState: StateFlow<GujaratiStudyUiState> = _uiState.asStateFlow()

    init {
        loadData()
    }

    fun handleIntent(intent: GujaratiUiIntent) {
        when (intent) {
            is GujaratiUiIntent.SwitchRole -> {
                _uiState.update { it.copy(currentRole = intent.role) }
            }
            is GujaratiUiIntent.SwitchSchool -> {
                _uiState.update { it.copy(activeSchool = intent.school) }
                loadData()
            }
            is GujaratiUiIntent.SwitchTab -> {
                _uiState.update { it.copy(activeTab = intent.tab) }
            }
            is GujaratiUiIntent.MarkChapterStatus -> {
                updateChapterStatus(intent.chapterId, intent.status)
            }
            is GujaratiUiIntent.RefreshData -> {
                loadData()
            }
        }
    }

    private fun loadData() {
        val currentTenant = _uiState.value.activeSchool.schoolId
        _uiState.update { it.copy(isLoading = true, errorMessage = null) }
        coroutineScope.launch {
            val syllabusResult = getSyllabusUseCase(currentTenant)
            val grammarResult = getGrammarUseCase()

            if (syllabusResult.isSuccess && grammarResult.isSuccess) {
                val chapters = syllabusResult.getOrThrow()
                val grammar = grammarResult.getOrThrow()
                _uiState.update {
                    it.copy(
                        chapters = chapters,
                        grammarTopics = grammar,
                        completedCount = chapters.size,
                        totalStudyMinutes = 240,
                        isLoading = false
                    )
                }
            } else {
                _uiState.update {
                    it.copy(
                        isLoading = false,
                        errorMessage = "Failed to load Gujarati syllabus and grammar data"
                    )
                }
            }
        }
    }

    private fun updateChapterStatus(chapterId: String, status: ChapterStudyStatus) {
        val tenant = _uiState.value.activeSchool.schoolId
        coroutineScope.launch {
            updateProgressUseCase(
                studentId = "student_aarav_guj_10042",
                schoolId = tenant,
                chapterId = chapterId,
                newStatus = status,
                additionalMinutes = 20
            )
            loadData()
        }
    }
}
