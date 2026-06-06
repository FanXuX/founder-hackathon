import type { BranchId, DecisionContent, SystemState } from "./types";

const SYSTEM_STATE_KEY = "founder-os:system-state";

export function loadSystemState(): SystemState {
  if (typeof window === "undefined") return initialSystemState;
  try {
    const raw = localStorage.getItem(SYSTEM_STATE_KEY);
    if (!raw) return initialSystemState;
    const parsed = JSON.parse(raw) as SystemState;
    if (!parsed.branches) return initialSystemState;
    const ids: BranchId[] = ["productWedge", "founderState", "teamOwnership", "customerPilots", "investorNarrative", "patternGuardrails"];
    for (const id of ids) {
      const b = parsed.branches[id];
      if (!b || typeof b.label !== "string" || typeof b.state !== "string" || !b.label || !b.state) {
        return initialSystemState;
      }
    }
    return parsed;
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
      latestSignal: "Blocked-path recovery still fails in live warehouse.",
      effect: "Do not expand platform before field recovery proof.",
    },
    founderState: {
      ...initialSystemState.branches.founderState,
      state: "Pressure high",
    },
    teamOwnership: {
      ...initialSystemState.branches.teamOwnership,
      state: "Bottleneck active",
      latestSignal: "Every incident still routes back to Nico.",
      effect: "Define first non-founder incident path.",
    },
    customerPilots: {
      ...initialSystemState.branches.customerPilots,
      state: "Needs test",
    },
    investorNarrative: {
      ...initialSystemState.branches.investorNarrative,
      state: "Platform pressure active",
      latestSignal: "Investor says recovery sounds like a feature.",
      handling: "Capture as narrative input, not roadmap proof.",
    },
    patternGuardrails: {
      ...initialSystemState.branches.patternGuardrails,
      state: "Strengthened",
      latestSignal: "Frontier Vision → Platform Leap",
      handling: "Do not turn platform vision into this week\u2019s backlog.",
    },
  },
};

export const defaultDemoInput =
  "Pilot customer wants fleet optimization.\nInvestor says recovery sounds like a feature, not a Physical AI platform.\nCompetitor just launched a broader robotics orchestration product.\n\nBut our blocked-path recovery still fails in the live warehouse, and every incident comes back to me.\n\nMy co-founder says fix recovery first.\nI\u2019m worried we\u2019ll look too small if we don\u2019t expand.\n\nIs this conviction \u2014 or panic?";

export const demoDecision: DecisionContent = {
  sessionLabel: "Signal Overload",
  affectedBranches: [
    "productWedge",
    "founderState",
    "teamOwnership",
    "customerPilots",
    "investorNarrative",
    "patternGuardrails",
  ],
  decision: {
    headlineLine1: "Do not expand today.",
    headlineLine2: "Prove recovery first.",
    reframe: "Test platform demand without abandoning the recovery loop.",
  },
  systemRead: [
    { label: "Product reality", text: "Recovery still fails in the live warehouse." },
    { label: "Customer signal", text: "Fleet optimization request is real, but not yet validated." },
    { label: "External pressure", text: "Investor and competitor signals are increasing platform pressure." },
    { label: "Operating risk", text: "Incidents still route back to Nico." },
  ],
  reasons: [
    "Recovery still fails in live warehouse. Without field proof, the platform story has no foundation.",
    "Every incident still routes back to Nico. Scaling now would increase founder dependency.",
    "Platform pressure is real, but not roadmap proof. Capture signals, don\u2019t turn them into backlog.",
  ],
  criteria: [
    {
      name: "Wedge Proof",
      source: "Blocked-path recovery still fails in the live warehouse.",
      assessment: "Recovery proof is not strong enough.",
      result: "Do not expand platform today.",
    },
    {
      name: "Founder Bottleneck",
      source: "Every incident comes back to Nico.",
      assessment: "Ownership path is not scalable.",
      result: "Define first non-founder incident path.",
    },
    {
      name: "Roadmap Proof",
      source: "Investor + competitor pressure.",
      assessment: "Real signal, not roadmap proof.",
      result: "Capture, don\u2019t react.",
    },
  ],
  actions: {
    doNow: [
      "Stabilize blocked-path recovery.",
      "Define first non-founder incident path.",
      "Clarify if fleet optimization is required for expansion.",
    ],
    notToday: [
      "No Physical AI OS repositioning.",
      "No fleet optimization roadmap commitment.",
      "No multi-robot orchestration work.",
    ],
  },
  route: {
    founder: "Clarify customer expansion condition.",
    team: "Stabilize recovery and document incident flow.",
    agent: "Draft customer email, summarize competitor launch, create incident template.",
  },
  pattern: {
    name: "Frontier Vision \u2192 Platform Leap",
    description: "This pattern appears when platform pressure rises before the core wedge is stable.",
    guardrail: "Do not turn platform vision into this week\u2019s backlog.",
  },
  updates: {
    productWedge: {
      newState: "Recovery unstable",
      severity: "caution",
      signal: "Blocked-path recovery still fails in live warehouse.",
    },
    founderState: {
      newState: "Pressure high",
      severity: "caution",
      signal: "Platform pressure + founder bottleneck detected.",
    },
    teamOwnership: {
      newState: "Bottleneck active",
      severity: "warn",
      signal: "Every incident still routes back to Nico.",
    },
    customerPilots: {
      newState: "Needs test",
      severity: "neutral",
      signal: "Fleet optimization demand unclear.",
    },
    investorNarrative: {
      newState: "Platform pressure active",
      severity: "caution",
      signal: "Investor says recovery sounds like a feature.",
    },
    patternGuardrails: {
      newState: "Strengthened",
      severity: "active",
      signal: "Frontier Vision \u2192 Platform Leap confirmed.",
    },
  },
  openLoops: [
    "Ask pilot customer: is fleet optimization required for expansion?",
    "Draft incident response template to reduce Nico routing.",
    "Schedule competitor landscape review for next strategy session.",
  ],
};
