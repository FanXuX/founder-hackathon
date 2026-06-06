import type { DecisionRecord, TriageResult } from "./types";

export const decisionMemoryKey = "founder-signal-triage:decision-memory";

export function readDecisionMemory(): DecisionRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(decisionMemoryKey);
    return raw ? (JSON.parse(raw) as DecisionRecord[]) : [];
  } catch {
    return [];
  }
}

export function writeDecisionMemory(records: DecisionRecord[]) {
  window.localStorage.setItem(decisionMemoryKey, JSON.stringify(records));
}

export function createDecisionRecord(
  result: TriageResult,
  evaluation: DecisionRecord["evaluation"],
): DecisionRecord {
  return {
    ...result.decisionLoop,
    id: crypto.randomUUID(),
    date: new Date().toISOString().slice(0, 10),
    patternName: result.patternName,
    evaluation,
  };
}
