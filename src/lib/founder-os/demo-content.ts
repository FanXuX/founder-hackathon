import type { DecisionContent, SystemState, SystemReadRow } from "./types";

const SYSTEM_STATE_KEY = "founder-os:system-state";

export function loadSystemState(): SystemState {
  if (typeof window === "undefined") return initialSystemState;
  try {
    const raw = localStorage.getItem(SYSTEM_STATE_KEY);
    return raw ? (JSON.parse(raw) as SystemState) : initialSystemState;
  } catch {
    return initialSystemState;
  }
}

export function saveSystemState(state: SystemState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SYSTEM_STATE_KEY, JSON.stringify(state));
  } catch {}
}

export const initialSystemState: SystemState = {
  founder: {
    name: "Nico",
    role: "Physical AI Founder",
    domain: "Warehouse Robotics · Recovery Layer",
    anchor: "Build the future. Prove recovery loop.",
  },
  branches: {
    productWedge: {
      label: "Product / Wedge",
      state: "In progress",
    },
    founderState: {
      label: "Founder State",
      state: "Stable",
    },
    teamOwnership: {
      label: "Team / Ownership",
      state: "Known risk",
    },
    customerPilots: {
      label: "Customer Pilots",
      state: "No active request",
    },
    investorNarrative: {
      label: "Investor Narrative",
      state: "Quiet",
    },
    patternGuardrails: {
      label: "Pattern Guardrails",
      state: "Active",
    },
  },
};

export const updatedSystemState: SystemState = {
  founder: initialSystemState.founder,
  branches: {
    productWedge: {
      ...initialSystemState.branches.productWedge,
      state: "Recovery unstable",
      latestSignal:
        "Blocked-path recovery still fails in live warehouse.",
      effect:
        "Do not expand platform before field recovery proof.",
    },
    founderState: {
      ...initialSystemState.branches.founderState,
      state: "Pressure high",
    },
    teamOwnership: {
      ...initialSystemState.branches.teamOwnership,
      state: "Bottleneck active",
      latestSignal:
        "Every incident still routes back to Nico.",
      effect:
        "Define first non-founder incident path.",
    },
    customerPilots: {
      ...initialSystemState.branches.customerPilots,
      state: "Needs test",
    },
    investorNarrative: {
      ...initialSystemState.branches.investorNarrative,
      state: "Platform pressure active",
      latestSignal:
        "Investor says recovery sounds like a feature.",
      handling:
        "Capture as narrative input, not roadmap proof.",
    },
    patternGuardrails: {
      ...initialSystemState.branches.patternGuardrails,
      state: "Strengthened",
      latestSignal:
        "Frontier Vision → Platform Leap",
      handling:
        "Do not turn platform vision into this week\u2019s backlog.",
    },
  },
};

export const defaultDemoInput =
  "Pilot customer wants fleet optimization.\nInvestor says recovery sounds like a feature, not a Physical AI platform.\nCompetitor just launched a broader robotics orchestration product.\n\nBut our blocked-path recovery still fails in the live warehouse, and every incident comes back to me.\n\nMy co-founder says fix recovery first.\nI\u2019m worried we\u2019ll look too small if we don\u2019t expand.\n\nIs this conviction \u2014 or panic?";

export const demoSystemReadRows: SystemReadRow[] = [
  { label: "Product reality", text: "Recovery still fails in the live warehouse." },
  { label: "Customer signal", text: "Fleet optimization request is real, but not yet validated." },
  { label: "External pressure", text: "Investor and competitor signals are increasing platform pressure." },
  { label: "Operating risk", text: "Incidents still route back to Nico." },
];

export const defaultPreAssessmentChips: string[] = [
  "customer-condition-unclear",
  "founder-bottleneck",
  "not-sure",
];

export const demoDecision: DecisionContent = {
  decision: "Do not expand today. Prove recovery first.",
  reframe:
    "Can we test platform demand without abandoning the recovery loop?",
  confidence: "High on internal readiness. Lower on market timing.",
  reasons: [
    "Recovery still fails in live warehouse. Without field recovery proof, the platform story has no foundation.",
    "Every incident still routes back to Nico. Scaling now would increase founder dependency.",
    "Platform pressure is real, but not roadmap proof. Investor and competitor signals should be captured, not turned into this week\u2019s backlog.",
  ],
  criteria: [
    {
      criterion: "Wedge Proof",
      source:
        "blocked-path recovery still fails in the live warehouse",
      assessment: "Recovery proof is not strong enough.",
      result: "Do not expand platform today.",
    },
    {
      criterion: "Founder Bottleneck",
      source: "every incident comes back to me",
      assessment: "Ownership path is not scalable.",
      result: "Define first non-founder incident path.",
    },
    {
      criterion: "Roadmap Proof",
      source:
        "investor says recovery sounds like a feature; competitor launched broader robotics orchestration product",
      assessment:
        "External pressure is real, but not sufficient evidence for immediate roadmap expansion.",
      result:
        "Capture for strategy review, do not act today.",
    },
    {
      criterion: "Customer Expansion Condition",
      source: "Pilot customer wants fleet optimization.",
      assessment: "Demand is unclear.",
      result:
        "Ask whether fleet optimization is required for expansion.",
    },
    {
      criterion: "Pattern Guardrail",
      source:
        "Matched pattern + active guardrail",
      assessment: "Pattern triggered.",
      result:
        "No platform repositioning today.",
    },
  ],
  doNow: [
    "Stabilize blocked-path recovery.",
    "Define first non-founder incident path.",
    'Ask pilot customer: "Is fleet optimization required for expansion, or a future roadmap item?"',
  ],
  notToday: [
    "Do not reposition as Physical AI OS.",
    "Do not add fleet optimization to roadmap.",
    "Do not build multi-robot orchestration.",
  ],
  owners: {
    founder: "Clarify customer expansion condition.",
    team: "Stabilize recovery and document incident flow.",
    agent:
      "Draft customer email, summarize competitor launch, create incident template.",
  },
  pattern: {
    name: "Frontier Vision \u2192 Platform Leap",
    guardrail:
      "Do not turn platform vision into this week\u2019s backlog.",
  },
};
