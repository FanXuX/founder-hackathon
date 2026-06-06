import type { TriageResult } from "./types";

export const fallbackResult: TriageResult = {
  source: "fallback",
  founderModelName: "The Visionary Builder",
  intervention:
    "This is a proof-protection moment, not a vision-expansion moment.",
  patternName: "Vision Pressure -> Scope Expansion",
  patternSummary:
    "Large external signals are pulling the founder toward broader roadmap and positioning moves before the current wedge is proven.",
  memoryInsight:
    "When competitor movement, investor uncertainty, and exhaustion arrive together, Nico's Visionary Builder mode can turn pressure into scope before user evidence is checked.",
  decisionRisk: "High",
  decisionRiskReason:
    "Competitor news and investor silence are real signals, but exhaustion may amplify them into a roadmap-expansion reaction.",
  topPriority:
    "Validate the onboarding problem with users and freeze demo scope before making any roadmap expansion decision.",
  priorityRationale:
    "The operating anchor is to prove the current wedge. Competitor and investor signals should be monitored, but they should not become work until user evidence confirms the wedge is too small.",
  doNotBecomeWorkToday: [
    "Do not pivot because of competitor news.",
    "Do not add the dashboard before demo day.",
    "Do not rewrite the roadmap while exhausted.",
    "Do not treat investor silence as proof the wedge is too small.",
  ],
  signals: [
    {
      category: "Product",
      description: "Two users said onboarding is confusing.",
      priority: "act_now",
      reason: "This is direct validation evidence for the current wedge and should become work now.",
    },
    {
      category: "Execution",
      description: "Demo day pressure makes scope control urgent.",
      priority: "act_now",
      reason: "The current proof window is narrow, so execution reality should constrain new work.",
    },
    {
      category: "Investor",
      description: "Investor A has not replied for a week.",
      priority: "monitor",
      reason: "Investor silence is a real fundraising signal, but not proof that the product wedge is wrong.",
    },
    {
      category: "Market",
      description: "A competitor launched an AI workflow feature.",
      priority: "defer",
      reason: "Real market signal, not a command to pivot or expand roadmap today.",
      stateAmplified: true,
    },
    {
      category: "Team",
      description: "A teammate wants to add a dashboard before demo day.",
      priority: "defer",
      reason: "Dashboard work should stay parked until the current onboarding proof is addressed.",
    },
    {
      category: "Founder State",
      description: "Nico is exhausted but feels like the company may need to pivot.",
      priority: "defer",
      reason: "Exhaustion can convert real pressure into scope expansion. Do not make roadmap decisions from this state.",
      stateAmplified: true,
    },
  ],
  history: [
    {
      date: "Jan 12",
      trigger: "Competitor launched a broader workflow feature",
      reaction: "Considered repositioning before checking user evidence",
      outcome: "Stayed focused on onboarding proof, correct",
    },
    {
      date: "Mar 18",
      trigger: "Advisor pushed for a bigger platform story",
      reaction: "Expanded roadmap for five days",
      outcome: "Cut scope back after demo risk increased, costly",
    },
    {
      date: "May 08",
      trigger: "Team asked to add dashboard before a deadline",
      reaction: "Deferred dashboard and protected the validation sprint",
      outcome: "Core user proof improved",
    },
  ],
  nextActions: [
    {
      action: "Ask 3 users where onboarding breaks",
      timing: "today",
    },
    {
      action: "Tell the team the dashboard is deferred until after demo",
      timing: "today",
    },
    {
      action: "Send one investor follow-up without changing roadmap",
      timing: "tomorrow",
    },
    {
      action: "No roadmap expansion while exhausted",
      timing: "standing rule",
    },
  ],
  decisionLoop: {
    trigger: "Competitor launch plus investor silence plus demo scope request",
    state: "Exhausted Visionary Builder mode turns pressure into expansion urgency",
    decision: "Freeze roadmap expansion and protect current wedge proof",
    action: "Validate onboarding and defer dashboard/pivot work",
    outcome: "Current proof improves while vision expansion stays parked",
  },
};
