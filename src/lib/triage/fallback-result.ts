import type { TriageResult } from "./types";

export const demoInput =
  "Investor A didn't reply for a week. Two users said onboarding is confusing. A competitor just launched an AI workflow feature. My teammate wants to add a dashboard before demo day. I'm exhausted but feel like we might need to pivot.";

export const fallbackResult: TriageResult = {
  source: "fallback",
  patternName: "Competitor-triggered pivot impulse",
  patternSummary:
    "Competitor activity has triggered a pivot impulse 3 times before. The system is warning you before that reaction becomes roadmap work.",
  memoryInsight:
    "When competitors or advisors challenge direction, you tend to question positioning before checking user evidence.",
  decisionRisk: "High",
  decisionRiskReason: "Real market signal plus exhausted founder state.",
  topPriority:
    "This is not a pivot moment. It is a scope-control and onboarding-validation moment.",
  priorityRationale:
    "Competitor news is a real signal, but the highest-evidence work is validating onboarding confusion and protecting demo scope.",
  signals: [
    {
      category: "Product",
      description: "Two users said onboarding is confusing.",
      priority: "act_now",
      reason: "Repeated user friction blocks activation and demo clarity.",
    },
    {
      category: "Team",
      description: "Teammate wants to add a dashboard before demo day.",
      priority: "act_now",
      reason: "Scope creep can reduce shipping quality before the deadline.",
    },
    {
      category: "Execution",
      description: "Demo day creates a delivery deadline risk.",
      priority: "act_now",
      reason: "The product must prove one core flow, not add surface area.",
    },
    {
      category: "Investor",
      description: "Investor A has not replied for a week.",
      priority: "monitor",
      reason: "Worth following up, but it should not reset strategy today.",
    },
    {
      category: "Market",
      description: "Competitor launched an AI workflow feature.",
      priority: "defer",
      reason: "Real market signal, but not enough evidence for a pivot.",
      stateAmplified: true,
    },
    {
      category: "Founder State",
      description: "Exhaustion plus pivot impulse.",
      priority: "monitor",
      reason: "Decision-quality risk: current state may amplify reaction.",
      stateAmplified: true,
    },
  ],
  history: [
    {
      date: "Jan 12",
      trigger: "Competitor launched",
      reaction: "Considered pivot",
      outcome: "Stayed course, correct",
    },
    {
      date: "Mar 18",
      trigger: "Market report",
      reaction: "Expanded roadmap",
      outcome: "Cut back after 5 days, costly",
    },
    {
      date: "May 08",
      trigger: "Advisor suggested enterprise pivot",
      reaction: "Checked evidence first",
      outcome: "SMB direction stayed correct",
    },
  ],
  nextActions: [
    {
      action: "Ask 3 users where onboarding breaks",
      timing: "today",
    },
    {
      action: "Tell teammate the dashboard is deferred until after demo",
      timing: "today",
    },
    {
      action: "Send Investor A a short follow-up",
      timing: "tomorrow",
    },
    {
      action: "No roadmap decision while exhausted",
      timing: "standing rule",
    },
  ],
  decisionLoop: {
    trigger: "Competitor launch plus user onboarding feedback",
    state: "Exhausted, under demo deadline pressure",
    decision: "Do not pivot today",
    action: "Validate onboarding and freeze scope",
    outcome: "Protect execution momentum while checking real user evidence",
  },
};
