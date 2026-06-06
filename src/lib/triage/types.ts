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

export type DecisionRecord = DecisionLoop & {
  id: string;
  date: string;
  patternName: string;
  evaluation: "correct" | "costly" | "unknown";
};

export type PatternMaturity = "Default" | "Hypothesis" | "Validated" | "Operating Rule";

export type FounderModelId =
  | "visionary-builder"
  | "analytical-strategist"
  | "product-perfectionist"
  | "scrappy-survivor"
  | "relationship-driven"
  | "technical-optimizer";

export type FounderJudgmentModel = {
  id: FounderModelId;
  name: string;
  keywords: string;
  belief: string;
  strengths: string;
  riskPatterns: string;
  interventionStyle: string;
  standingRule: string;
};

export type FounderOperatingProfile = {
  version: string;
  founderName: string;
  founderRole: string;
  founderDomain: string;
  companyDescription: string;
  operatingContext: string;
  founderModelId: FounderModelId;
  founderModelName: string;
  founderModelBelief: string;
  founderModelStrengths: string;
  founderModelRisks: string;
  modelSignals: string[];
  sensitiveSignals: string[];
  confirmedPatternName: string;
  confirmedPatternSummary: string;
  commonTriggers: string[];
  activeGuardrails: string[];
  founderGrowthGoal: string;
  companyGoal: string;
  decisionAnchor: string;
  anchorRule: string;
  stage: string;
  northStar: string;
  highRiskPattern: string;
  decisionStyle: string;
  interventionStyle: string;
  standingRule: string;
  patternMaturity: PatternMaturity;
  maturityReason: string;
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
  founderModelName: string;
  intervention: string;
  patternName: string;
  patternSummary: string;
  memoryInsight: string;
  decisionRisk: "Low" | "Medium" | "High";
  decisionRiskReason: string;
  topPriority: string;
  priorityRationale: string;
  doNotBecomeWorkToday: string[];
  signals: Signal[];
  history: HistoryEntry[];
  nextActions: NextAction[];
  decisionLoop: DecisionLoop;
};
