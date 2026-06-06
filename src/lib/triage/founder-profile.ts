import type {
  FounderJudgmentModel,
  FounderModelId,
  FounderOperatingProfile,
  PatternMaturity,
} from "./types";

export const founderProfileKey = "founder-signal-triage:founder-profile";

export const founderJudgmentModels: FounderJudgmentModel[] = [
  {
    id: "visionary-builder",
    name: "The Visionary Builder",
    keywords: "vision, speed, intensity, ambition, overextension",
    belief: "If we move fast enough, we can bend reality.",
    strengths:
      "Strong vision, fast decisions, ambition, talent magnetism, resilience under pressure.",
    riskPatterns:
      "Overbuild, scope explosion, all-in too early, resource denial, exhaustion reframed as commitment, external signals amplified into strategic pivots.",
    interventionStyle:
      "Protect scope, protect evidence, and protect execution reality without making the founder conservative.",
    standingRule:
      "No roadmap expansion while exhausted or before user evidence is checked.",
  },
  {
    id: "analytical-strategist",
    name: "The Analytical Strategist",
    keywords: "logic, model, evidence, caution, precision",
    belief: "Better reasoning creates better companies.",
    strengths:
      "Clear thinking, risk awareness, complex trade-offs, business model sensitivity.",
    riskPatterns:
      "Analysis paralysis, decision delay, over-modeling, waiting for more data, missing speed windows.",
    interventionStyle:
      "Time-box analysis, force reversible decisions, and separate unknown from unknowable.",
    standingRule:
      "If a decision is reversible, choose a test before asking for more certainty.",
  },
  {
    id: "product-perfectionist",
    name: "The Product Perfectionist",
    keywords: "taste, craft, quality, detail, user experience",
    belief: "If the product is truly great, the market will feel it.",
    strengths:
      "Strong product taste, UX sensitivity, craft, brand quality, user empathy.",
    riskPatterns:
      "Shipping too slowly, over-polishing, hiding launch fear as quality standards, turning feedback into polish instead of validation.",
    interventionStyle:
      "Force shipping thresholds, separate polish from validation, and define enough quality for the current stage.",
    standingRule:
      "Do not polish beyond the threshold needed to validate the core value.",
  },
  {
    id: "scrappy-survivor",
    name: "The Scrappy Survivor",
    keywords: "bootstrap, constraint, hustle, revenue, survival",
    belief: "Cash, customers, and speed matter more than theory.",
    strengths:
      "Pragmatism, revenue focus, resourcefulness, fast workarounds, execution resilience.",
    riskPatterns:
      "Short-term firefighting, customer-request drift, weak strategic narrative, founder becomes permanent operator.",
    interventionStyle:
      "Protect strategic focus, distinguish revenue signal from distraction, and prevent permanent founder bottlenecks.",
    standingRule:
      "Do not accept a customer request as roadmap until it proves repeatable strategic value.",
  },
  {
    id: "relationship-driven",
    name: "The Relationship-Driven Founder",
    keywords: "network, fundraising, stakeholders, narrative, trust",
    belief: "Companies are built through people, timing, and trust.",
    strengths:
      "Storytelling, fundraising, partnerships, stakeholder sensitivity, resource mobilization.",
    riskPatterns:
      "Investor or advisor opinion drift, polite interest mistaken for traction, networking over execution, narrative changes to please others.",
    interventionStyle:
      "Separate signal from social validation, require commitment evidence, and protect product truth.",
    standingRule:
      "Do not change positioning because of positive attention without commitment evidence.",
  },
  {
    id: "technical-optimizer",
    name: "The Technical Optimizer",
    keywords: "system, engineering, scalability, architecture, automation",
    belief: "If the system is correct, scale will follow.",
    strengths:
      "Technical depth, systems thinking, automation, scalability, durable infrastructure instincts.",
    riskPatterns:
      "Premature optimization, early refactors, weak customer validation, replacing business risk with engineering work.",
    interventionStyle:
      "Validate before scaling, force customer evidence, and separate engineering risk from market risk.",
    standingRule:
      "No scaling or refactor work before the customer evidence requires it.",
  },
];

export const defaultFounderModel =
  founderJudgmentModels.find((model) => model.id === "visionary-builder") ??
  founderJudgmentModels[0];

export const defaultFounderProfile: FounderOperatingProfile = {
  version: "Founder Operating Profile v1",
  founderName: "Nico",
  founderRole: "Founder / CEO",
  founderDomain: "AI workflow product",
  companyDescription: "AI operating layer for small teams",
  operatingContext:
    "Working between investor pressure, competitor launches, demo deadlines, team scope requests, and the founder's own high-intensity execution mode.",
  founderModelId: defaultFounderModel.id,
  founderModelName: defaultFounderModel.name,
  founderModelBelief: defaultFounderModel.belief,
  founderModelStrengths: defaultFounderModel.strengths,
  founderModelRisks: defaultFounderModel.riskPatterns,
  modelSignals: [
    "Vision",
    "Speed",
    "Intensity",
    "Ambition",
    "World-changing narrative",
    "Overextension risk",
  ],
  sensitiveSignals: [
    "Investor says the wedge may be too small",
    "Competitor launches a broader product narrative",
    "Team asks to add scope before the current proof is complete",
    "Customer feedback exposes a core validation gap",
    "Founder is exhausted but feels pressure to move faster",
  ],
  confirmedPatternName: "Vision Pressure -> Scope Expansion",
  confirmedPatternSummary:
    "Large external signals may trigger roadmap or positioning expansion before the current wedge is proven.",
  commonTriggers: [
    "Competitor launch",
    "Investor doubt about wedge size",
    "Advisor push toward a bigger narrative",
    "Team request to add demo scope",
    "Exhaustion reframed as commitment",
  ],
  activeGuardrails: [
    "Vision != this week's backlog",
    "Investor pressure != roadmap proof",
    "Competitor movement != command",
    "Current wedge proof before expansion",
    "Do not convert exhaustion into urgency",
  ],
  founderGrowthGoal:
    "Keep high-conviction ambition while building stronger operating discipline around scope, evidence, and execution reality.",
  companyGoal:
    "Prove the current AI workflow wedge with real users before expanding roadmap or repositioning around a broader platform narrative.",
  decisionAnchor: "Build the future. Prove the wedge.",
  anchorRule:
    "If a decision helps prove the current wedge with real users, it is allowed. If it only serves the larger vision narrative, it goes to the parking lot.",
  stage: "MVP validation / demo deadline pressure",
  northStar: "Prove the current wedge with real users before expanding scope",
  highRiskPattern: "Vision Pressure -> Scope Expansion",
  decisionStyle:
    "Fast, intense, high-conviction, highly responsive to large external signals. Fast on reversible execution; evidence-based on roadmap expansion and positioning decisions.",
  interventionStyle: defaultFounderModel.interventionStyle,
  standingRule: defaultFounderModel.standingRule,
  patternMaturity: "Validated",
  maturityReason:
    "Confirmed pattern with 3 relevant events and active guardrails.",
};

export const maturitySteps: Array<{
  level: PatternMaturity;
  condition: string;
  voice: string;
}> = [
  {
    level: "Default",
    condition: "No or little history",
    voice: "This may be...",
  },
  {
    level: "Hypothesis",
    condition: "2 similar triggers and 1 confirmation",
    voice: "A possible pattern is emerging...",
  },
  {
    level: "Validated",
    condition: "3 similar triggers, 2 confirmations, and 1 outcome",
    voice: "This is a validated pattern...",
  },
  {
    level: "Operating Rule",
    condition: "Founder approves rule conversion",
    voice: "Apply rule...",
  },
];

export function getFounderModel(id: FounderModelId) {
  return (
    founderJudgmentModels.find((model) => model.id === id) ??
    defaultFounderModel
  );
}

export function applyFounderModel(
  profile: FounderOperatingProfile,
  modelId: FounderModelId,
): FounderOperatingProfile {
  const model = getFounderModel(modelId);

  return {
    ...profile,
    founderModelId: model.id,
    founderModelName: model.name,
    founderModelBelief: model.belief,
    founderModelStrengths: model.strengths,
    founderModelRisks: model.riskPatterns,
    modelSignals: model.keywords.split(", ").map((keyword) => keyword.trim()),
    highRiskPattern: model.riskPatterns,
    interventionStyle: model.interventionStyle,
    standingRule: model.standingRule,
    patternMaturity: model.id === defaultFounderModel.id ? "Validated" : "Default",
    maturityReason:
      model.id === defaultFounderModel.id
        ? "3 similar triggers, 2 founder confirmations, and at least 1 recorded outcome."
        : "Selected by founder. Treat as a starting hypothesis until recurrence, confirmation, and outcomes validate it.",
  };
}

export function readFounderProfile(): FounderOperatingProfile {
  if (typeof window === "undefined") return defaultFounderProfile;

  try {
    const raw = window.localStorage.getItem(founderProfileKey);
    const storedProfile = raw
      ? (JSON.parse(raw) as Partial<FounderOperatingProfile>)
      : null;

    if (storedProfile && !storedProfile.founderName) {
      return defaultFounderProfile;
    }

    if (!raw || !storedProfile) {
      return defaultFounderProfile;
    }

    const storedModel = founderJudgmentModels.find(
      (model) => model.id === storedProfile.founderModelId,
    );

    if (!storedModel) {
      return defaultFounderProfile;
    }

    return {
      ...defaultFounderProfile,
      ...(storedProfile as FounderOperatingProfile),
      founderModelId: storedModel.id,
      founderModelName: storedModel.name,
      founderModelBelief: storedModel.belief,
      founderModelStrengths: storedModel.strengths,
      founderModelRisks: storedModel.riskPatterns,
    };
  } catch {
    return defaultFounderProfile;
  }
}

export function writeFounderProfile(profile: FounderOperatingProfile) {
  window.localStorage.setItem(founderProfileKey, JSON.stringify(profile));
}

export function resetFounderProfile() {
  window.localStorage.removeItem(founderProfileKey);
  return defaultFounderProfile;
}
