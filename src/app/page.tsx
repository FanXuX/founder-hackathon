"use client";

import { useState } from "react";

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

type TriageGroup = {
  label: string;
  description: string;
  priorities: Priority[];
};

type Ownership = "Founder" | "Team" | "Agent draft / Founder review" | "System rule";

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

const demoInput =
  "Investor A didn't reply for a week. Two users said onboarding is confusing. A competitor just launched an AI workflow feature. My teammate wants to add a dashboard before demo day. I'm exhausted but feel like we might need to pivot.";

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

const categoryStyles: Record<SignalCategory, string> = {
  Product: "bg-blue-100 text-blue-900 border-blue-200",
  Market: "bg-purple-100 text-purple-900 border-purple-200",
  Investor: "bg-emerald-100 text-emerald-900 border-emerald-200",
  Team: "bg-pink-100 text-pink-900 border-pink-200",
  Execution: "bg-stone-200 text-stone-950 border-stone-300",
  "Founder State": "bg-orange-100 text-orange-950 border-orange-200",
};

const priorityLabels: Record<Priority, string> = {
  act_now: "Act Now",
  monitor: "Monitor",
  defer: "Defer",
  ignore: "Ignore",
};

const priorityStyles: Record<Priority, string> = {
  act_now: "bg-red-500 text-white",
  monitor: "bg-yellow-300 text-stone-950",
  defer: "bg-stone-800 text-white",
  ignore: "bg-stone-200 text-stone-700",
};

const triageGroups: TriageGroup[] = [
  {
    label: "Act Now",
    description: "Evidence that should become work today.",
    priorities: ["act_now"],
  },
  {
    label: "Monitor",
    description: "Real signals that need awareness, not strategic reset.",
    priorities: ["monitor"],
  },
  {
    label: "Defer",
    description: "Signals to revisit after shipping pressure drops.",
    priorities: ["defer", "ignore"],
  },
];

function getActionOwner(action: string, index: number): Ownership {
  const normalized = action.toLowerCase();

  if (normalized.includes("teammate") || normalized.includes("dashboard")) {
    return "Founder";
  }

  if (normalized.includes("follow-up") || normalized.includes("investor")) {
    return "Agent draft / Founder review";
  }

  if (normalized.includes("no roadmap") || normalized.includes("exhausted")) {
    return "System rule";
  }

  return index === 0 ? "Founder" : "Team";
}

export default function Home() {
  const [input, setInput] = useState(demoInput);
  const [triaged, setTriaged] = useState(false);
  const [result, setResult] = useState<TriageResult>(fallbackResult);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function triageToday() {
    if (!input.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error("Triage request failed.");
      }

      setResult((await response.json()) as TriageResult);
      setTriaged(true);
    } catch {
      setResult(fallbackResult);
      setTriaged(true);
      setError("Live AI failed. Showing the fallback demo output.");
    } finally {
      setIsLoading(false);
    }
  }

  const decisionRiskSignals = result.signals.filter(
    (signal) => signal.stateAmplified,
  );

  return (
    <div className="min-h-screen bg-[#f3efe3] px-4 py-5 text-stone-950 sm:px-6">
      <main className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[0.95fr_1.2fr]">
        <section className="rounded-[2rem] border border-stone-200 bg-[#fffaf0] p-5 shadow-2xl shadow-stone-300/40 sm:p-7 lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:overflow-auto">
          <header>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-600">
              Founder Signal Triage
            </p>
            <h1 className="mt-3 text-4xl font-black leading-none tracking-tight sm:text-5xl">
              Decide before it becomes work.
            </h1>
            <p className="mt-4 text-sm leading-6 text-stone-600 sm:text-base">
              Task tools manage work after a decision is made. Founder Signal
              Triage helps decide what deserves attention right now.
            </p>
          </header>

          <div className="mt-7 rounded-3xl bg-stone-950 p-5 text-white">
            <label
              className="text-sm font-bold text-orange-200"
              htmlFor="founder-input"
            >
              Messy founder input
            </label>
            <textarea
              className="mt-3 min-h-56 w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-base leading-7 text-white outline-none placeholder:text-stone-400 focus:border-orange-300"
              id="founder-input"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Drop investor, customer, team, market, execution, and founder-state signals here."
              value={input}
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                className="rounded-2xl bg-orange-400 px-5 py-4 text-base font-black text-stone-950 shadow-lg shadow-orange-950/20 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!input.trim() || isLoading}
                onClick={triageToday}
              >
                {isLoading ? "Triaging..." : "Triage today"}
              </button>
              <button
                className="rounded-2xl border border-white/20 px-5 py-4 text-base font-black text-white transition hover:bg-white/10"
                onClick={() => {
                  setInput(demoInput);
                  setTriaged(false);
                  setResult(fallbackResult);
                  setError(null);
                }}
              >
                Reset demo
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-dashed border-stone-300 p-4">
            <p className="text-sm font-black">Demo thesis</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Every founder has pulled the same fire alarm before. This system
              remembers, so this time the founder decides instead of reacts.
            </p>
            {error ? (
              <p className="mt-3 rounded-2xl bg-orange-100 p-3 text-xs font-bold leading-5 text-orange-900">
                {error}
              </p>
            ) : null}
          </div>
        </section>

        <section className="space-y-4">
          {!triaged ? (
            <div className="rounded-[2rem] border border-stone-200 bg-[#fffaf0] p-6 shadow-xl shadow-stone-300/30 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-600">
                Waiting for triage
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                One messy update becomes operating clarity.
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {[
                  ["1", "Classify signals"],
                  ["2", "Detect reaction risk"],
                  ["3", "Recall history"],
                  ["4", "Reset priority"],
                ].map(([step, label]) => (
                  <div
                    className="rounded-3xl border border-stone-200 bg-white/70 p-4"
                    key={label}
                  >
                    <p className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200 text-sm font-black text-orange-900">
                      {step}
                    </p>
                    <p className="mt-4 text-sm font-black">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <section className="rounded-[2rem] border border-stone-800 bg-stone-950 p-5 text-white shadow-2xl shadow-stone-400/40 sm:p-7">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-300">
                      Decision intervention
                    </p>
                    <h2 className="mt-3 text-4xl font-black leading-none tracking-tight sm:text-5xl">
                      Before this becomes work, check the pattern.
                    </h2>
                    <p className="mt-4 text-lg font-black leading-7 text-orange-100">
                      {result.patternName}
                    </p>
                    <p className="mt-3 text-base font-bold leading-7 text-stone-200">
                      {result.patternSummary}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-orange-300/30 bg-orange-300 p-4 text-stone-950 xl:w-64">
                    <p className="text-xs font-black uppercase tracking-[0.18em]">
                      Decision risk
                    </p>
                    <p className="mt-2 text-3xl font-black">
                      {result.decisionRisk}
                    </p>
                    <p className="mt-2 text-sm font-bold leading-6">
                      {result.decisionRiskReason}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {result.history.map((entry) => (
                    <div
                      className="relative rounded-3xl border border-white/10 bg-white/5 p-4"
                      key={`${entry.date}-${entry.trigger}`}
                    >
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-300">
                        {entry.date}
                      </p>
                      <p className="mt-3 text-sm font-black text-white">
                        {entry.trigger}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-stone-300">
                        {entry.reaction} → {entry.outcome}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl bg-white/10 p-4 text-sm font-bold leading-6 text-orange-100">
                  Memory insight: {result.memoryInsight}
                </div>
              </section>

              <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <article className="rounded-[2rem] border border-orange-200 bg-orange-100 p-5 shadow-xl shadow-stone-300/30 sm:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-700">
                    Priority reset
                  </p>
                  <h2 className="mt-2 text-4xl font-black leading-none tracking-tight">
                    {result.topPriority}
                  </h2>
                  <p className="mt-4 text-sm font-bold leading-6 text-stone-700">
                    {result.priorityRationale}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Do today", result.nextActions[0]?.action ?? "Pick the highest-evidence action"],
                      ["Block", result.nextActions[1]?.action ?? "Block scope expansion"],
                      ["Defer", result.nextActions[3]?.action ?? "Defer low-evidence strategy changes"],
                    ].map(([label, copy]) => (
                      <div className="rounded-3xl bg-white/70 p-4" key={label}>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-700">
                          {label}
                        </p>
                        <p className="mt-2 text-sm font-black leading-6">
                          {copy}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    {result.nextActions.map((item, index) => {
                      const owner = getActionOwner(item.action, index);

                      return (
                      <div
                        className="flex gap-3 rounded-3xl bg-white/70 p-4"
                        key={item.action}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-950 text-sm font-black text-orange-200">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-black leading-6">
                            {item.action}
                          </p>
                          <p className="mt-2 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.12em]">
                            <span className="rounded-full bg-orange-200 px-2.5 py-1 text-orange-800">
                              {item.timing}
                            </span>
                            <span className="rounded-full bg-stone-950 px-2.5 py-1 text-orange-200">
                              Owner: {owner}
                            </span>
                          </p>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </article>

                <article className="rounded-[2rem] border border-stone-200 bg-[#fffaf0] p-5 shadow-xl shadow-stone-300/30 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-600">
                        Supporting triage evidence
                      </p>
                      <h2 className="mt-2 text-3xl font-black tracking-tight">
                        Why this reset?
                      </h2>
                    </div>
                    <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-black text-orange-200">
                      {result.source === "live_ai" ? "Live AI" : "Fallback demo"}
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {triageGroups.map((group) => {
                      const groupedSignals = result.signals.filter((signal) =>
                        group.priorities.includes(signal.priority),
                      );

                      return (
                        <section
                          className="rounded-3xl border border-stone-200 bg-white/70 p-4"
                          key={group.label}
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-lg font-black">{group.label}</h3>
                            <p className="text-xs font-bold text-stone-500">
                              {group.description}
                            </p>
                          </div>
                          <div className="mt-3 space-y-2">
                            {groupedSignals.map((signal) => (
                              <div
                                className="rounded-2xl border border-stone-200 bg-[#fffaf0] p-3"
                                key={`${signal.category}-${signal.description}`}
                              >
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-black ${categoryStyles[signal.category]}`}
                                  >
                                    {signal.category}
                                  </span>
                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[0.68rem] font-black ${priorityStyles[signal.priority]}`}
                                  >
                                    {priorityLabels[signal.priority]}
                                  </span>
                                </div>
                                <p className="mt-2 text-sm font-black leading-6">
                                  {signal.description}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-stone-600">
                                  {signal.reason}
                                </p>
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    })}

                    <section className="rounded-3xl border border-orange-200 bg-orange-50 p-4">
                      <h3 className="text-lg font-black">Decision Risk</h3>
                      <p className="mt-1 text-xs font-bold leading-5 text-orange-900">
                        Real signals where founder state may amplify the
                        reaction.
                      </p>
                      <div className="mt-3 space-y-2">
                        {decisionRiskSignals.map((signal) => (
                          <p
                            className="rounded-2xl bg-white/80 p-3 text-sm font-bold leading-6 text-orange-950"
                            key={`risk-${signal.category}`}
                          >
                            {signal.category}: {signal.description}
                          </p>
                        ))}
                      </div>
                    </section>
                  </div>
                </article>
              </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
