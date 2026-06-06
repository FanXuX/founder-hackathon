import { fallbackResult } from "@/lib/triage/fallback-result";
import type { TriageResult } from "@/lib/triage/types";
import { DecisionLoopStrip } from "./DecisionLoopStrip";

type DecisionInterventionProps = {
  result: TriageResult;
};

export function DecisionIntervention({ result }: DecisionInterventionProps) {
  const decisionLoop = result.decisionLoop ?? fallbackResult.decisionLoop;

  return (
    <section className="rounded-[2rem] border border-stone-800 bg-stone-950 p-5 text-white shadow-2xl shadow-stone-400/40 sm:p-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-300">
            Decision intervention
          </p>
          <h2 className="mt-3 text-4xl font-black leading-none tracking-tight sm:text-5xl">
            {result.topPriority}
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
          <p className="mt-2 text-3xl font-black">{result.decisionRisk}</p>
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
              {entry.reaction} {"->"} {entry.outcome}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-3xl bg-white/10 p-4 text-sm font-bold leading-6 text-orange-100">
        Memory insight: {result.memoryInsight}
      </div>

      <DecisionLoopStrip decisionLoop={decisionLoop} />
    </section>
  );
}
