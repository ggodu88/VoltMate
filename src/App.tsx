import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { ProjectList } from "./components/ProjectList";
import { ProjectDetail } from "./components/ProjectDetail";
import { ProjectModal } from "./components/ProjectModal";
import { LogFeed } from "./components/LogFeed";
import { ConstructionMethodCatalog } from "./components/ConstructionMethodCatalog";
import { ConstructionMethodDetailModal } from "./components/ConstructionMethodDetailModal";
import { AdminManagement } from "./components/AdminManagement";
import { AdminMethodEditorModal } from "./components/AdminMethodEditorModal";
import { LogEntryModal } from "./components/LogEntryModal";
import { ChecklistModal } from "./components/ChecklistModal";
import { AiConsultantModal } from "./components/AiConsultantModal";
import { ReportPrintModal } from "./components/ReportPrintModal";
import { LegalStandardsModal } from "./components/LegalStandardsModal";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { getApiAuthHeaders } from "./utils/apiKeyStorage";

import {
  ConstructionLog,
  ConstructionMethod,
  ConstructionPhase,
  PhaseChecklist,
  ProjectSite,
} from "./types";
import {
  getProjects,
  saveProject,
  getMethods,
  saveMethod,
  deleteMethod,
  getLogs,
  saveLog,
  getChecklists,
  saveChecklist,
  exportAllDataAsJSON,
} from "./utils/storage";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { isDark } = useTheme();
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<
    "PROJECTS" | "METHODS" | "LOGS" | "ADMIN"
  >("PROJECTS");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Persistent Data States
  const [projects, setProjects] = useState<ProjectSite[]>([]);
  const [methods, setMethods] = useState<ConstructionMethod[]>([]);
  const [logs, setLogs] = useState<ConstructionLog[]>([]);
  const [checklists, setChecklists] = useState<PhaseChecklist[]>([]);

  // Modals States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectSite | null>(null);

  const [selectedMethodForDetail, setSelectedMethodForDetail] =
    useState<ConstructionMethod | null>(null);

  const [isAdminMethodEditorOpen, setIsAdminMethodEditorOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<ConstructionMethod | null>(null);

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<ConstructionLog | null>(null);
  const [logInitialMethod, setLogInitialMethod] =
    useState<ConstructionMethod | null>(null);

  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [checklistPhase, setChecklistPhase] = useState<ConstructionPhase>(
    ConstructionPhase.INITIATION
  );

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState("");

  const [isLegalStandardsModalOpen, setIsLegalStandardsModalOpen] = useState(false);
  const [selectedLegalStandardId, setSelectedLegalStandardId] = useState<string | undefined>(undefined);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportProject, setReportProject] = useState<ProjectSite | null>(null);

  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const handleOpenLegalStandards = (standardId?: string) => {
    setSelectedLegalStandardId(standardId);
    setIsLegalStandardsModalOpen(true);
  };

  // Initial Load from Storage
  const loadData = () => {
    const p = getProjects();
    const m = getMethods();
    const l = getLogs();
    const c = getChecklists();
    setProjects(p);
    setMethods(m);
    setLogs(l);
    setChecklists(c);

    if (p.length > 0 && !selectedProjectId) {
      setSelectedProjectId(p[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Selected Project Object
  const currentProject =
    projects.find((p) => p.id === selectedProjectId) ||
    (projects.length > 0 ? projects[0] : null);

  // Project Handlers
  const handleSaveProject = (proj: ProjectSite) => {
    saveProject(proj);
    setProjects(getProjects());
    setSelectedProjectId(proj.id);
  };

  const handleUpdateProjectPhase = (
    newPhase: ConstructionPhase,
    newProgress: number
  ) => {
    if (!currentProject) return;
    const updated: ProjectSite = {
      ...currentProject,
      currentPhase: newPhase,
      progressPercent: newProgress,
    };
    saveProject(updated);
    setProjects(getProjects());
  };

  // Method Handlers (Admin & Catalog)
  const handleSaveMethod = (meth: ConstructionMethod) => {
    saveMethod(meth);
    setMethods(getMethods());
  };

  const handleDeleteMethod = (id: string) => {
    deleteMethod(id);
    setMethods(getMethods());
  };

  const handleGenerateAiMethodDraft = async (
    phase: ConstructionPhase,
    title: string,
    requirement?: string
  ): Promise<Partial<ConstructionMethod> | null> => {
    try {
      const res = await fetch("/api/gemini/generate-method", {
        method: "POST",
        headers: getApiAuthHeaders(),
        body: JSON.stringify({ phase, title, requirement }),
      });
      if (!res.ok) throw new Error("AI 생성 오류");
      const data = await res.json();
      return data.methodData || data.method;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  // Log Handlers
  const handleSaveLog = (logItem: ConstructionLog) => {
    saveLog(logItem);
    setLogs(getLogs());
  };

  // Checklist Handlers
  const handleSaveChecklist = (updated: PhaseChecklist) => {
    saveChecklist(updated);
    setChecklists(getChecklists());
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 transition-colors ${
        isDark ? "bg-[#0F172A] text-slate-200" : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Top Main Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
        onOpenAiConsultant={(query) => {
          setAiInitialQuery(query || "");
          setIsAiModalOpen(true);
        }}
        onOpenLegalStandards={() => handleOpenLegalStandards()}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        selectedProjectName={currentProject?.name}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-28 sm:pb-32">
        {/* TAB 1: PROJECTS (List vs Detail) */}
        {activeTab === "PROJECTS" && (
          <div>
            {!selectedProjectId ? (
              <ProjectList
                projects={projects}
                selectedProjectId={selectedProjectId || ""}
                onSelectProject={(pId) => setSelectedProjectId(pId)}
                onOpenNewProjectModal={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                onOpenEditProjectModal={(proj) => {
                  setEditingProject(proj);
                  setIsProjectModalOpen(true);
                }}
              />
            ) : currentProject ? (
              <ProjectDetail
                project={currentProject}
                logs={logs}
                methods={methods}
                onBack={() => setSelectedProjectId(null)}
                onOpenLogModal={(existingLog) => {
                  setEditingLog(existingLog || null);
                  setLogInitialMethod(null);
                  setIsLogModalOpen(true);
                }}
                onOpenChecklistModal={(phase) => {
                  setChecklistPhase(phase);
                  setIsChecklistModalOpen(true);
                }}
                onOpenMethodDetail={(meth) => setSelectedMethodForDetail(meth)}
                onPrintReport={(proj, projLogs) => {
                  setReportProject(proj);
                  setIsReportModalOpen(true);
                }}
                onUpdateProjectPhase={handleUpdateProjectPhase}
                onOpenAiConsultant={(context) => {
                  setAiInitialQuery(context || "");
                  setIsAiModalOpen(true);
                }}
              />
            ) : (
              <ProjectList
                projects={projects}
                selectedProjectId={selectedProjectId || ""}
                onSelectProject={(pId) => setSelectedProjectId(pId)}
                onOpenNewProjectModal={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                onOpenEditProjectModal={(proj) => {
                  setEditingProject(proj);
                  setIsProjectModalOpen(true);
                }}
              />
            )}
          </div>
        )}

        {/* TAB 2: METHODS CATALOG */}
        {activeTab === "METHODS" && (
          <ConstructionMethodCatalog
            methods={methods}
            onSelectMethod={(meth) => setSelectedMethodForDetail(meth)}
            onGoToAdmin={() => setActiveTab("ADMIN")}
            onAskAi={(mTitle) => {
              setAiInitialQuery(mTitle);
              setIsAiModalOpen(true);
            }}
            onOpenLegalStandards={handleOpenLegalStandards}
          />
        )}

        {/* TAB 3: LOGS FEED */}
        {activeTab === "LOGS" && (
          <LogFeed
            logs={logs}
            projects={projects}
            methods={methods}
            selectedProjectId={selectedProjectId}
            onOpenLogModal={(existingLog) => {
              setEditingLog(existingLog || null);
              setLogInitialMethod(null);
              setIsLogModalOpen(true);
            }}
            onPrintReport={(proj, projLogs) => {
              setReportProject(proj);
              setIsReportModalOpen(true);
            }}
            onOpenAiConsultant={(ctx) => {
              setAiInitialQuery(ctx || "");
              setIsAiModalOpen(true);
            }}
            onOpenMethodDetail={(meth) => setSelectedMethodForDetail(meth)}
          />
        )}

        {/* TAB 4: ADMIN MANAGEMENT */}
        {activeTab === "ADMIN" && (
          <AdminManagement
            methods={methods}
            onAddMethod={() => {
              setEditingMethod(null);
              setIsAdminMethodEditorOpen(true);
            }}
            onEditMethod={(meth) => {
              setEditingMethod(meth);
              setIsAdminMethodEditorOpen(true);
            }}
            onDeleteMethod={handleDeleteMethod}
            onRefreshData={loadData}
          />
        )}
      </main>

      {/* Engineering Bottom Status Bar */}
      <footer className="mt-auto h-8 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-4 sm:px-8 text-[9px] text-slate-500 uppercase font-bold tracking-[0.25em]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 font-mono">System Status: Fully Operational</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-500 font-mono">
          <span>Standard: KEC 2024</span>
          <span>Security: Secured</span>
        </div>
        <span className="text-amber-400 font-mono">ElectroGrid Pro v2.4</span>
      </footer>

      {/* ALL MODALS */}

      {/* 1. Project Create/Edit Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />

      {/* 2. Construction Method Detail Modal */}
      <ConstructionMethodDetailModal
        method={selectedMethodForDetail}
        isOpen={!!selectedMethodForDetail}
        onClose={() => setSelectedMethodForDetail(null)}
        onAskAi={(title) => {
          setAiInitialQuery(title);
          setIsAiModalOpen(true);
        }}
        onApplyToLog={(meth) => {
          setEditingLog(null);
          setLogInitialMethod(meth);
          setIsLogModalOpen(true);
        }}
        onOpenLegalStandards={(stdId) => {
          handleOpenLegalStandards(stdId);
        }}
      />

      {/* 3. Admin Method Editor Modal */}
      <AdminMethodEditorModal
        isOpen={isAdminMethodEditorOpen}
        onClose={() => setIsAdminMethodEditorOpen(false)}
        onSave={handleSaveMethod}
        editingMethod={editingMethod}
        onGenerateAiDraft={handleGenerateAiMethodDraft}
      />

      {/* 4. Daily Log Entry Modal */}
      <LogEntryModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSave={handleSaveLog}
        projectId={currentProject?.id || "PROJ-1"}
        methods={methods}
        editingLog={editingLog}
        initialMethod={logInitialMethod}
      />

      {/* 5. Phase Inspection Checklist Modal */}
      <ChecklistModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
        phase={checklistPhase}
        checklists={checklists}
        onSaveChecklist={handleSaveChecklist}
        projectName={currentProject?.name || "전기공사 현장"}
      />

      {/* 6. AI Consultant Modal */}
      <AiConsultantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialQuery={aiInitialQuery}
        projectName={currentProject?.name}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* 7. Construction Report Print Modal */}
      <ReportPrintModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        project={reportProject}
        logs={logs}
      />

      {/* 8. 17 Legal Standards & Technical Codes Modal */}
      <LegalStandardsModal
        isOpen={isLegalStandardsModalOpen}
        onClose={() => setIsLegalStandardsModalOpen(false)}
        initialStandardId={selectedLegalStandardId}
        onSelectPhase={(phase) => {
          setIsLegalStandardsModalOpen(false);
          setActiveTab("METHODS");
        }}
      />

      {/* 9. BYOK Gemini API Key Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
