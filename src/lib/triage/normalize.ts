import { fallbackResult } from "./fallback-result";
import type { DecisionLoop, Priority, Signal, SignalCategory, TriageResult } from "./types";

export function normalizeCategory(value: unknown): SignalCategory {
  const normalized = String(value).toLowerCase().replace(/[_-]/g, " ");

  if (normalized.includes("market")) return "Market";
  if (normalized.includes("investor")) return "Investor";
  if (normalized.includes("team")) return "Team";
  if (normalized.includes("execution")) return "Execution";
  if (normalized.includes("founder")) return "Founder State";

  return "Product";
}

export function normalizePriority(value: unknown): Priority {
  const normalized = String(value).toLowerCase().replace(/[-\s]/g, "_");

  if (normalized.includes("act")) return "act_now";
  if (normalized.includes("monitor")) return "monitor";
  if (normalized.includes("defer")) return "defer";
  if (normalized.includes("ignore")) return "ignore";

  return "monitor";
}

export function normalizeSignal(signal: Partial<Signal>): Signal {
  return {
    category: normalizeCategory(signal.category),
    description: signal.description || "Unspecified founder signal.",
    priority: normalizePriority(signal.priority),
    reason: signal.reason || "Needs founder review before becoming work.",
    stateAmplified: Boolean(signal.stateAmplified),
  };
}

export function normalizeDecisionLoop(value?: Partial<DecisionLoop>): DecisionLoop {
  return {
    trigger: value?.trigger || fallbackResult.decisionLoop.trigger,
    state: value?.state || fallbackResult.decisionLoop.state,
    decision: value?.decision || fallbackResult.decisionLoop.decision,
    action: value?.action || fallbackResult.decisionLoop.action,
    outcome: value?.outcome || fallbackResult.decisionLoop.outcome,
  };
}

export function normalizeResult(value: Partial<TriageResult>): TriageResult {
  return {
    ...fallbackResult,
    ...value,
    source: "live_ai",
    doNotBecomeWorkToday: value.doNotBecomeWorkToday?.length
      ? value.doNotBecomeWorkToday
      : fallbackResult.doNotBecomeWorkToday,
    signals: value.signals?.length
      ? value.signals.map(normalizeSignal)
      : fallbackResult.signals,
    history: value.history?.length ? value.history : fallbackResult.history,
    nextActions: value.nextActions?.length
      ? value.nextActions
      : fallbackResult.nextActions,
    decisionLoop: normalizeDecisionLoop(value.decisionLoop),
  };
}
