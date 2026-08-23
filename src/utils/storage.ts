import { ConstructionLog, ConstructionMethod, InspectionTemplateItem, PhaseChecklist, ProjectSite, ConstructionPhase, PHASE_CONFIG } from "../types";
import { INITIAL_METHODS } from "../data/initialMethods";
import { INITIAL_PROJECTS, INITIAL_LOGS } from "../data/initialProjects";
import { INITIAL_CHECKLISTS } from "../data/initialChecklists";
import {
  saveSingleMethodToCloud,
  deleteSingleMethodFromCloud,
  saveSingleProjectToCloud,
  deleteSingleProjectFromCloud,
  saveSingleLogToCloud,
  deleteSingleLogFromCloud,
  saveSingleChecklistToCloud,
  syncMethodsToCloud,
  syncProjectsToCloud,
  syncLogsToCloud,
  pullAllCloudData,
  pushAllLocalDataToCloud,
} from "./cloudSync";

const STORAGE_KEYS = {
  METHODS: "elec_mgmt_methods_v3_wbs100",
  PROJECTS: "elec_mgmt_projects_v1",
  LOGS: "elec_mgmt_logs_v1",
  CHECKLISTS: "elec_mgmt_phase_checklists_v2",
};

// ---------------- Methods ----------------
export function getMethods(): ConstructionMethod[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.METHODS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.METHODS, JSON.stringify(INITIAL_METHODS));
      return INITIAL_METHODS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load methods from storage", e);
    return INITIAL_METHODS;
  }
}

export function saveMethods(methods: ConstructionMethod[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.METHODS, JSON.stringify(methods));
    syncMethodsToCloud(methods).catch((err) =>
      console.warn("Cloud batch sync methods warning:", err)
    );
  } catch (e) {
    console.error("Failed to save methods", e);
  }
}

// Helper to parse 3-digit WBS string like "004" to number 4
function parseWbsNumber(wbs?: string): number | null {
  if (!wbs) return null;
  const num = parseInt(wbs.trim(), 10);
  return isNaN(num) ? null : num;
}

// Helper to format number back to standard 3-digit WBS code string
function formatWbsCode(num: number): string {
  return String(num).padStart(3, "0");
}

export function saveMethod(method: ConstructionMethod): ConstructionMethod[] {
  return addOrUpdateMethod(method);
}

export function addOrUpdateMethod(method: ConstructionMethod): ConstructionMethod[] {
  const current = getMethods();
  const existingIdx = current.findIndex((m) => m.id === method.id);
  const targetWbsNum = parseWbsNumber(method.wbsCode);
  const itemToSave: ConstructionMethod = {
    ...method,
    wbsCode: targetWbsNum !== null ? formatWbsCode(targetWbsNum) : method.wbsCode?.trim() || undefined,
    updatedAt: new Date().toISOString().split("T")[0],
  };

  let updated: ConstructionMethod[] = [];

  if (existingIdx >= 0) {
    // Existing item edit: if WBS code changed to a specific number that conflicts with other items, shift
    const oldWbsNum = parseWbsNumber(current[existingIdx].wbsCode);
    if (targetWbsNum !== null && targetWbsNum !== oldWbsNum) {
      // Check if target WBS conflicts with any other method
      const hasConflict = current.some((m, idx) => idx !== existingIdx && parseWbsNumber(m.wbsCode) === targetWbsNum);
      if (hasConflict) {
        // Shift all methods (excluding this one) with WBS >= targetWbsNum by +1
        updated = current.map((m, idx) => {
          if (idx === existingIdx) return itemToSave;
          const currentWbs = parseWbsNumber(m.wbsCode);
          if (currentWbs !== null && currentWbs >= targetWbsNum) {
            return {
              ...m,
              wbsCode: formatWbsCode(currentWbs + 1),
            };
          }
          return m;
        });
      } else {
        updated = [...current];
        updated[existingIdx] = itemToSave;
      }
    } else {
      updated = [...current];
      updated[existingIdx] = itemToSave;
    }
  } else {
    // New item insertion:
    if (targetWbsNum !== null) {
      // Shift any existing method with WBS >= targetWbsNum by +1
      const shifted = current.map((m) => {
        const currentWbs = parseWbsNumber(m.wbsCode);
        if (currentWbs !== null && currentWbs >= targetWbsNum) {
          return {
            ...m,
            wbsCode: formatWbsCode(currentWbs + 1),
          };
        }
        return m;
      });
      // Add the new item
      updated = [itemToSave, ...shifted];
    } else {
      updated = [itemToSave, ...current];
    }
  }

  // Sort methods primarily by WBS code if present, keeping stable order
  updated.sort((a, b) => {
    const numA = parseWbsNumber(a.wbsCode);
    const numB = parseWbsNumber(b.wbsCode);
    if (numA !== null && numB !== null) return numA - numB;
    if (numA !== null) return -1;
    if (numB !== null) return 1;
    return 0;
  });

  try {
    localStorage.setItem(STORAGE_KEYS.METHODS, JSON.stringify(updated));
    // Cloud sync full batch if renumbering happened
    syncMethodsToCloud(updated).catch((err) =>
      console.warn("Cloud sync methods batch warning:", err)
    );
  } catch (e) {
    console.error("Failed to save method", e);
  }
  return updated;
}

export function deleteMethod(id: string): ConstructionMethod[] {
  const current = getMethods();
  const updated = current.filter((m) => m.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.METHODS, JSON.stringify(updated));
    deleteSingleMethodFromCloud(id).catch((err) =>
      console.warn("Cloud delete method warning:", err)
    );
  } catch (e) {
    console.error("Failed to delete method", e);
  }
  return updated;
}

export function resetMethodsToDefault(): ConstructionMethod[] {
  saveMethods(INITIAL_METHODS);
  return INITIAL_METHODS;
}

// ---------------- Projects ----------------
export function getProjects(): ProjectSite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load projects", e);
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: ProjectSite[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    syncProjectsToCloud(projects).catch((err) =>
      console.warn("Cloud sync projects warning:", err)
    );
  } catch (e) {
    console.error("Failed to save projects", e);
  }
}

export function saveProject(project: ProjectSite): ProjectSite[] {
  return addOrUpdateProject(project);
}

export function addOrUpdateProject(project: ProjectSite): ProjectSite[] {
  const current = getProjects();
  const index = current.findIndex((p) => p.id === project.id);
  let updated: ProjectSite[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = project;
  } else {
    updated = [project, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    saveSingleProjectToCloud(project).catch((err) =>
      console.warn("Cloud save single project warning:", err)
    );
  } catch (e) {
    console.error("Failed to save project", e);
  }
  return updated;
}

export function deleteProject(id: string): ProjectSite[] {
  const current = getProjects();
  const updated = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    deleteSingleProjectFromCloud(id).catch((err) =>
      console.warn("Cloud delete project warning:", err)
    );
  } catch (e) {
    console.error("Failed to delete project", e);
  }
  return updated;
}

// ---------------- Logs ----------------
export function getLogs(): ConstructionLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(INITIAL_LOGS));
      return INITIAL_LOGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load logs", e);
    return INITIAL_LOGS;
  }
}

export function saveLogs(logs: ConstructionLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
    syncLogsToCloud(logs).catch((err) =>
      console.warn("Cloud sync logs warning:", err)
    );
  } catch (e) {
    console.error("Failed to save logs", e);
  }
}

export function saveLog(log: ConstructionLog): ConstructionLog[] {
  return addOrUpdateLog(log);
}

export function addOrUpdateLog(log: ConstructionLog): ConstructionLog[] {
  const current = getLogs();
  const index = current.findIndex((l) => l.id === log.id);
  let updated: ConstructionLog[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = log;
  } else {
    updated = [log, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
    saveSingleLogToCloud(log).catch((err) =>
      console.warn("Cloud save single log warning:", err)
    );
  } catch (e) {
    console.error("Failed to save log", e);
  }
  return updated;
}

export function deleteLog(id: string): ConstructionLog[] {
  const current = getLogs();
  const updated = current.filter((l) => l.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
    deleteSingleLogFromCloud(id).catch((err) =>
      console.warn("Cloud delete log warning:", err)
    );
  } catch (e) {
    console.error("Failed to delete log", e);
  }
  return updated;
}

// ---------------- Checklists ----------------
function generateInitialPhaseChecklists(): PhaseChecklist[] {
  const phases = Object.keys(PHASE_CONFIG) as ConstructionPhase[];
  return phases.map((phase) => {
    const itemsForPhase = INITIAL_CHECKLISTS.filter((item) => item.phase === phase);
    return {
      phase,
      title: `${PHASE_CONFIG[phase].label} 품질 검측표`,
      items: itemsForPhase.map((template) => ({
        id: template.id,
        item: template.title,
        criteria: `${template.criteria} [${template.kecRef || ""}]`,
        result: "PASS",
        note: "KEC 표준 만족",
      })),
    };
  });
}

export function getChecklists(): PhaseChecklist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    if (!raw) {
      const init = generateInitialPhaseChecklists();
      localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load phase checklists", e);
    return generateInitialPhaseChecklists();
  }
}

export function saveChecklist(checklist: PhaseChecklist): void {
  try {
    const current = getChecklists();
    const idx = current.findIndex((c) => c.phase === checklist.phase);
    let updated: PhaseChecklist[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = checklist;
    } else {
      updated = [...current, checklist];
    }
    localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(updated));
    saveSingleChecklistToCloud(checklist).catch((err) =>
      console.warn("Cloud save single checklist warning:", err)
    );
  } catch (e) {
    console.error("Failed to save checklist", e);
  }
}

export function getChecklistTemplates(): InspectionTemplateItem[] {
  return INITIAL_CHECKLISTS;
}

// ---------------- Backup & Cloud Synchronization ----------------
export async function syncAllWithCloud(): Promise<{
  methods: ConstructionMethod[];
  projects: ProjectSite[];
  logs: ConstructionLog[];
  checklists: PhaseChecklist[];
}> {
  try {
    const cloudData = await pullAllCloudData();
    if (cloudData.methods && cloudData.methods.length > 0) {
      localStorage.setItem(STORAGE_KEYS.METHODS, JSON.stringify(cloudData.methods));
    }
    if (cloudData.projects && cloudData.projects.length > 0) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(cloudData.projects));
    }
    if (cloudData.logs && cloudData.logs.length > 0) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(cloudData.logs));
    }
    if (cloudData.checklists && cloudData.checklists.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(cloudData.checklists));
    }
    return {
      methods: getMethods(),
      projects: getProjects(),
      logs: getLogs(),
      checklists: getChecklists(),
    };
  } catch (err) {
    console.error("Failed to full sync with cloud:", err);
    throw err;
  }
}

export async function uploadLocalToCloud(): Promise<void> {
  await pushAllLocalDataToCloud({
    methods: getMethods(),
    projects: getProjects(),
    logs: getLogs(),
    checklists: getChecklists(),
  });
}

export function exportAllDataAsJSON(): string {
  const payload = {
    version: "1.0.0",
    exportDate: new Date().toISOString(),
    methods: getMethods(),
    projects: getProjects(),
    logs: getLogs(),
    checklists: getChecklistTemplates(),
  };
  return JSON.stringify(payload, null, 2);
}

export function importAllDataFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.methods && Array.isArray(parsed.methods)) {
      saveMethods(parsed.methods);
    }
    if (parsed.projects && Array.isArray(parsed.projects)) {
      saveProjects(parsed.projects);
    }
    if (parsed.logs && Array.isArray(parsed.logs)) {
      saveLogs(parsed.logs);
    }
    return true;
  } catch (e) {
    console.error("Import failed:", e);
    return false;
  }
}

