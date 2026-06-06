import { NextResponse } from "next/server";

type SignalCategory =
  | "Product"
  | "Market"
  | "Investor"
  | "Team"
  | "Execution"
  | "Founder State";

type Priority = "act_now" | "monitor" | "defer" | "ignore";

type Signal = {
  category: SignalCategory;
  description: string;
  priority: Priority;
  reason: string;
  stateAmplified?: boolean;
};

type HistoryEntry = {
  date: string;
  trigger: string;
  reaction: string;
  outcome: string;
};

type NextAction = {
  action: string;
  timing: string;
};

type TriageResult = {
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
};

const fallbackResult: TriageResult = {
  source: "fallback",
  patternName: "Competitor-triggered pivot impulse",
  patternSummary:
    "Competitor activity has triggered a pivot impulse 3 times before. The system is warning you before that reaction becomes roadmap work.",
  memoryInsight:
    "When competitors or advisors challenge direction, you tend to question positioning before checking user evidence.",
  decisionRisk: "High",
  decisionRiskReason: "Real market signal plus exhausted founder state.",
  topPriority: "Validate onboarding. Freeze scope. Do not pivot today.",
  priorityRationale:
    "The strongest signal is user onboarding friction plus delivery risk, not competitor activity.",
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
};

const systemPrompt = `You are Founder Signal Triage, not a therapist and not a task manager.

Your job: help an early-stage founder decide what deserves to become work right now.

Classify messy founder input into signals across exactly these categories:
- Product
- Market
- Investor
- Team
- Execution
- Founder State

Founder State is decision-quality risk only. Do not provide therapy language.

Allowed priorities: act_now, monitor, defer, ignore.

Return only valid JSON matching this TypeScript shape:
{
  "patternName": string,
  "patternSummary": string,
  "memoryInsight": string,
  "decisionRisk": "Low" | "Medium" | "High",
  "decisionRiskReason": string,
  "topPriority": string,
  "priorityRationale": string,
  "signals": [{
    "category": "Product" | "Market" | "Investor" | "Team" | "Execution" | "Founder State",
    "description": string,
    "priority": "act_now" | "monitor" | "defer" | "ignore",
    "reason": string,
    "stateAmplified": boolean
  }],
  "history": [{ "date": string, "trigger": string, "reaction": string, "outcome": string }],
  "nextActions": [{ "action": string, "timing": string }]
}

Rules:
- Output one singular topPriority.
- Provide 3-4 nextActions with timing.
- If the input contains competitor/advisor/market pressure plus exhaustion/anxiety/pivot language, detect a competitor-triggered pivot impulse.
- Use the supplied founder history as memory evidence.
- Do not say signals are fake. Use real signal, state-amplified reaction, and decision distortion risk framing.`;

const seedHistory = fallbackResult.history;

function normalizeCategory(value: unknown): SignalCategory {
  const normalized = String(value).toLowerCase().replace(/[_-]/g, " ");

  if (normalized.includes("market")) return "Market";
  if (normalized.includes("investor")) return "Investor";
  if (normalized.includes("team")) return "Team";
  if (normalized.includes("execution")) return "Execution";
  if (normalized.includes("founder")) return "Founder State";

  return "Product";
}

function normalizePriority(value: unknown): Priority {
  const normalized = String(value).toLowerCase().replace(/[-\s]/g, "_");

  if (normalized.includes("act")) return "act_now";
  if (normalized.includes("monitor")) return "monitor";
  if (normalized.includes("defer")) return "defer";
  if (normalized.includes("ignore")) return "ignore";

  return "monitor";
}

function normalizeSignal(signal: Partial<Signal>): Signal {
  return {
    category: normalizeCategory(signal.category),
    description: signal.description || "Unspecified founder signal.",
    priority: normalizePriority(signal.priority),
    reason: signal.reason || "Needs founder review before becoming work.",
    stateAmplified: Boolean(signal.stateAmplified),
  };
}

function normalizeResult(value: Partial<TriageResult>): TriageResult {
  return {
    ...fallbackResult,
    ...value,
    source: "live_ai",
    signals: value.signals?.length
      ? value.signals.map(normalizeSignal)
      : fallbackResult.signals,
    history: value.history?.length ? value.history : fallbackResult.history,
    nextActions: value.nextActions?.length
      ? value.nextActions
      : fallbackResult.nextActions,
  };
}

export async function POST(request: Request) {
  const { input } = (await request.json()) as { input?: string };

  if (!input?.trim()) {
    return NextResponse.json(
      { error: "Founder input is required." },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(fallbackResult);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: JSON.stringify({
              today: new Date().toISOString().slice(0, 10),
              founder_input: input,
              seed_history: seedHistory,
            }),
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(fallbackResult);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(fallbackResult);
    }

    return NextResponse.json(normalizeResult(JSON.parse(content)));
  } catch {
    return NextResponse.json(fallbackResult);
  }
}
