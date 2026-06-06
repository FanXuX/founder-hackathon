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

export type DecisionContent = {
  decision: string;
  reframe: string;
  confidence: string;
  reasons: string[];
  criteria: Array<{
    criterion: string;
    source: string;
    assessment: string;
    result: string;
  }>;
  doNow: string[];
  notToday: string[];
  owners: {
    founder: string;
    team: string;
    agent: string;
  };
  pattern: {
    name: string;
    guardrail: string;
  };
};
