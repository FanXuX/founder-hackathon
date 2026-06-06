import type { FounderOperatingProfile, PatternMaturity } from "./types";

export const founderProfileKey = "founder-signal-triage:founder-profile";

export const defaultFounderProfile: FounderOperatingProfile = {
  version: "Founder Operating Profile v1",
  stage: "MVP validation",
  northStar: "Validate onboarding clarity and first paid use case",
  highRiskPattern: "Competitor-triggered pivot impulse",
  decisionStyle: "Fast to react to external validation signals",
  interventionStyle: "Challenge premature pivots and protect focus",
  standingRule:
    "No roadmap decision while exhausted or before user evidence is checked",
  patternMaturity: "Validated",
  maturityReason:
    "3 similar triggers, 2 founder confirmations, and at least 1 recorded outcome.",
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

export function readFounderProfile(): FounderOperatingProfile {
  if (typeof window === "undefined") return defaultFounderProfile;

  try {
    const raw = window.localStorage.getItem(founderProfileKey);
    return raw
      ? { ...defaultFounderProfile, ...(JSON.parse(raw) as FounderOperatingProfile) }
      : defaultFounderProfile;
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
