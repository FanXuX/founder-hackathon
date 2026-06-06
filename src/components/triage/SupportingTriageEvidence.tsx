import {
  categoryStyles,
  priorityLabels,
  priorityStyles,
  triageGroups,
} from "@/lib/triage/constants";
import type { TriageResult } from "@/lib/triage/types";

type SupportingTriageEvidenceProps = {
  result: TriageResult;
};

export function SupportingTriageEvidence({ result }: SupportingTriageEvidenceProps) {
  const decisionRiskSignals = result.signals.filter(
    (signal) => signal.stateAmplified,
  );

  return (
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
            Real signals where founder state may amplify the reaction.
          </p>
          <div className="mt-3 space-y-2">
            {decisionRiskSignals.map((signal, index) => (
              <p
                className="rounded-2xl bg-white/80 p-3 text-sm font-bold leading-6 text-orange-950"
                key={`risk-${signal.category}-${signal.description}-${index}`}
              >
                {signal.category}: {signal.description}
              </p>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
