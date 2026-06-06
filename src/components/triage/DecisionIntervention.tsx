import { fallbackResult } from "@/lib/triage/fallback-result";
import type { FounderOperatingProfile, TriageResult } from "@/lib/triage/types";
import { DecisionLoopStrip } from "./DecisionLoopStrip";

type DecisionInterventionProps = {
  profile: FounderOperatingProfile;
  result: TriageResult;
};

export function DecisionIntervention({
  profile,
  result,
}: DecisionInterventionProps) {
  const decisionLoop = result.decisionLoop ?? fallbackResult.decisionLoop;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Recommended focus
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
            {result.topPriority}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Based on your North Star, standing rule, and {" "}
            {profile.patternMaturity.toLowerCase()} pattern: {result.priorityRationale}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-slate-950 xl:w-56">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
            Decision risk
          </p>
          <p className="mt-2 text-2xl font-semibold">{result.decisionRisk}</p>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            {result.decisionRiskReason}
          </p>
        </div>
      </div>

      <details className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">
          Why this recommendation?
        </summary>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Pattern memory found: {result.patternName}. {result.memoryInsight}
          {" "}This should be treated as calibrated judgment evidence, not a
          personality label.
        </p>
      </details>

      <details className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">
          View decision history
        </summary>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {result.history.map((entry) => (
            <div
              className="relative rounded-xl border border-slate-200 bg-white p-4"
              key={`${entry.date}-${entry.trigger}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {entry.date}
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-950">
                {entry.trigger}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {entry.reaction} {"->"} {entry.outcome}
              </p>
            </div>
          ))}
        </div>
      </details>

      <details className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">
          View decision loop
        </summary>
        <DecisionLoopStrip decisionLoop={decisionLoop} />
      </details>
    </section>
  );
}
