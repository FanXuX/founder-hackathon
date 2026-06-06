export type SignalCategory =
  | "Product"
  | "Market"
  | "Investor"
  | "Team"
  | "Execution"
  | "Founder State";

export type Priority = "act_now" | "monitor" | "defer" | "ignore";

export type Signal = {
  category: SignalCategory;
  description: string;
  priority: Priority;
  reason: string;
  stateAmplified?: boolean;
};

export type HistoryEntry = {
  date: string;
  trigger: string;
  reaction: string;
  outcome: string;
};

export type NextAction = {
  action: string;
  timing: string;
};

export type DecisionLoop = {
  trigger: string;
  state: string;
  decision: string;
  action: string;
  outcome: string;
};

export type TriageGroup = {
  label: string;
  description: string;
  priorities: Priority[];
};

export type Ownership =
  | "Founder"
  | "Team"
  | "Agent draft / Founder review"
  | "System rule";

export type TriageResult = {
  source: "live_ai" | "fallback";
  patternName: string;
  patternSummary: string;
  memoryInsight: string;
  decisionRisk: "Low" | "Medium" | "High";
  decisionRiskReason: string;
  topPriority: string;
  priorityRationale: string;
  signals: Signal[];
  history: HistoryEntry[];
  nextActions: NextAction[];
  decisionLoop: DecisionLoop;
};
