import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  ConstructionMethod,
  ProjectSite,
  ConstructionLog,
  PhaseChecklist,
} from "../types";
import { INITIAL_METHODS } from "../data/initialMethods";
import { INITIAL_PROJECTS, INITIAL_LOGS } from "../data/initialProjects";
import { INITIAL_CHECKLISTS } from "../data/initialChecklists";

// Helper to remove undefined fields which Firestore rejects
function cleanForFirestore<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const COLLECTIONS = {
  METHODS: "elec_methods",
  PROJECTS: "elec_projects",
  LOGS: "elec_logs",
  CHECKLISTS: "elec_checklists",
  META: "elec_sync_meta",
};

export interface CloudSyncState {
  status: "INITIALIZING" | "SYNCED" | "SYNCING" | "OFFLINE" | "ERROR";
  lastSyncedAt: string | null;
  error?: string;
  isCloudConnected: boolean;
}

// ---------------- Methods Cloud Operations ----------------
export async function syncMethodsToCloud(methods: ConstructionMethod[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const m of methods) {
      const ref = doc(db, COLLECTIONS.METHODS, m.id);
      batch.set(ref, cleanForFirestore(m));
    }
    await batch.commit();
  } catch (error) {
    console.error("Failed to sync methods to cloud:", error);
    throw error;
  }
}

export async function saveSingleMethodToCloud(method: ConstructionMethod): Promise<void> {
  try {
    const ref = doc(db, COLLECTIONS.METHODS, method.id);
    await setDoc(ref, cleanForFirestore(method));
  } catch (error) {
    console.error("Failed to save method to cloud:", error);
  }
}

export async function deleteSingleMethodFromCloud(methodId: string): Promise<void> {
  try {
    const ref = doc(db, COLLECTIONS.METHODS, methodId);
    await deleteDoc(ref);
  } catch (error) {
    console.error("Failed to delete method from cloud:", error);
  }
}

export async function fetchMethodsFromCloud(): Promise<ConstructionMethod[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.METHODS));
    if (snap.empty) {
      // Seed default methods to cloud if empty
      await syncMethodsToCloud(INITIAL_METHODS);
      return INITIAL_METHODS;
    }
    const results: ConstructionMethod[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as ConstructionMethod);
    });
    return results;
  } catch (error) {
    console.error("Failed to fetch methods from cloud:", error);
    throw error;
  }
}

// ---------------- Projects Cloud Operations ----------------
export async function syncProjectsToCloud(projects: ProjectSite[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const p of projects) {
      const ref = doc(db, COLLECTIONS.PROJECTS, p.id);
      batch.set(ref, cleanForFirestore(p));
    }
    await batch.commit();
  } catch (error) {
    console.error("Failed to sync projects to cloud:", error);
    throw error;
  }
}

export async function saveSingleProjectToCloud(project: ProjectSite): Promise<void> {
  try {
    const ref = doc(db, COLLECTIONS.PROJECTS, project.id);
    await setDoc(ref, cleanForFirestore(project));
  } catch (error) {
    console.error("Failed to save project to cloud:", error);
  }
}

export async function deleteSingleProjectFromCloud(projectId: string): Promise<void> {
  try {
    const ref = doc(db, COLLECTIONS.PROJECTS, projectId);
    await deleteDoc(ref);
  } catch (error) {
    console.error("Failed to delete project from cloud:", error);
  }
}

export async function fetchProjectsFromCloud(): Promise<ProjectSite[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.PROJECTS));
    if (snap.empty) {
      await syncProjectsToCloud(INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
    const results: ProjectSite[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as ProjectSite);
    });
    return results;
  } catch (error) {
    console.error("Failed to fetch projects from cloud:", error);
    throw error;
  }
}

// ---------------- Logs Cloud Operations ----------------
export async function syncLogsToCloud(logs: ConstructionLog[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const l of logs) {
      const ref = doc(db, COLLECTIONS.LOGS, l.id);
      batch.set(ref, cleanForFirestore(l));
    }
    await batch.commit();
  } catch (error) {
    console.error("Failed to sync logs to cloud:", error);
    throw error;
  }
}

export async function saveSingleLogToCloud(log: ConstructionLog): Promise<void> {
  try {
    const ref = doc(db, COLLECTIONS.LOGS, log.id);
    await setDoc(ref, cleanForFirestore(log));
  } catch (error) {
    console.error("Failed to save log to cloud:", error);
  }
}

export async function deleteSingleLogFromCloud(logId: string): Promise<void> {
  try {
    const ref = doc(db, COLLECTIONS.LOGS, logId);
    await deleteDoc(ref);
  } catch (error) {
    console.error("Failed to delete log from cloud:", error);
  }
}

export async function fetchLogsFromCloud(): Promise<ConstructionLog[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.LOGS));
    if (snap.empty) {
      await syncLogsToCloud(INITIAL_LOGS);
      return INITIAL_LOGS;
    }
    const results: ConstructionLog[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as ConstructionLog);
    });
    return results;
  } catch (error) {
    console.error("Failed to fetch logs from cloud:", error);
    throw error;
  }
}

// ---------------- Checklists Cloud Operations ----------------
export async function syncChecklistsToCloud(checklists: PhaseChecklist[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const c of checklists) {
      const ref = doc(db, COLLECTIONS.CHECKLISTS, c.phase);
      batch.set(ref, cleanForFirestore(c));
    }
    await batch.commit();
  } catch (error) {
    console.error("Failed to sync checklists to cloud:", error);
    throw error;
  }
}

export async function saveSingleChecklistToCloud(checklist: PhaseChecklist): Promise<void> {
  try {
    const ref = doc(db, COLLECTIONS.CHECKLISTS, checklist.phase);
    await setDoc(ref, cleanForFirestore(checklist));
  } catch (error) {
    console.error("Failed to save checklist to cloud:", error);
  }
}

export async function fetchChecklistsFromCloud(): Promise<PhaseChecklist[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.CHECKLISTS));
    if (snap.empty) {
      return [];
    }
    const results: PhaseChecklist[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as PhaseChecklist);
    });
    return results;
  } catch (error) {
    console.error("Failed to fetch checklists from cloud:", error);
    throw error;
  }
}

// ---------------- Full Cloud Sync Engine ----------------
export async function pushAllLocalDataToCloud(data: {
  methods: ConstructionMethod[];
  projects: ProjectSite[];
  logs: ConstructionLog[];
  checklists: PhaseChecklist[];
}): Promise<void> {
  await syncMethodsToCloud(data.methods);
  await syncProjectsToCloud(data.projects);
  await syncLogsToCloud(data.logs);
  if (data.checklists.length > 0) {
    await syncChecklistsToCloud(data.checklists);
  }
  const metaRef = doc(db, COLLECTIONS.META, "sync_info");
  await setDoc(metaRef, {
    lastSyncedAt: new Date().toISOString(),
    methodsCount: data.methods.length,
    projectsCount: data.projects.length,
    logsCount: data.logs.length,
  });
}

export async function pullAllCloudData(): Promise<{
  methods: ConstructionMethod[];
  projects: ProjectSite[];
  logs: ConstructionLog[];
  checklists: PhaseChecklist[];
}> {
  const [methods, projects, logs, checklists] = await Promise.all([
    fetchMethodsFromCloud(),
    fetchProjectsFromCloud(),
    fetchLogsFromCloud(),
    fetchChecklistsFromCloud(),
  ]);
  return { methods, projects, logs, checklists };
}
