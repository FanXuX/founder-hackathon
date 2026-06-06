export type BranchId =
  | "productWedge"
  | "founderState"
  | "teamOwnership"
  | "customerPilots"
  | "investorNarrative"
  | "patternGuardrails";

export type BranchDetail = {
  label: string;
  state: string;
  latestSignal?: string;
  effect?: string;
  handling?: string;
};

export type FounderInfo = {
  name: string;
  role: string;
  domain: string;
  anchor: string;
};

export type SystemState = {
  founder: FounderInfo;
  branches: Record<BranchId, BranchDetail>;
};

export type SystemReadRow = {
  label: string;
  text: string;
};

export type BranchUpdate = {
  newState: string;
  severity: "ok" | "caution" | "warn" | "active" | "neutral";
  signal: string;
};

export type DecisionContent = {
  sessionLabel: string;
  affectedBranches: BranchId[];
  decision: {
    headlineLine1: string;
    headlineLine2: string;
    reframe: string;
  };
  systemRead: SystemReadRow[];
  reasons: string[];
  criteria: Array<{
    name: string;
    source: string;
    assessment: string;
    result: string;
  }>;
  actions: {
    doNow: string[];
    notToday: string[];
  };
  route: {
    founder: string;
    team: string;
    agent: string;
  };
  pattern: {
    name: string;
    description: string;
    guardrail: string;
  };
  updates: Record<BranchId, BranchUpdate>;
  openLoops: string[];
};
