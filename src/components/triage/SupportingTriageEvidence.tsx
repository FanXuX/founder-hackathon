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
    <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Supporting triage evidence
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Why this recommendation?
          </h2>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          {result.source === "live_ai" ? "Live AI" : "Fallback demo"}
        </span>
      </div>

      <div className="mt-5 grid gap-2 text-sm sm:grid-cols-5">
        {[
          ["Product", "Act now"],
          ["Team", "Freeze scope"],
          ["Market", "Defer"],
          ["Investor", "Monitor"],
          ["State", "Decision risk"],
        ].map(([label, value]) => (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3" key={label}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              {label}
            </p>
            <p className="mt-1 font-semibold text-slate-800">{value}</p>
          </div>
        ))}
      </div>

      <details className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">
          Show classified signals
        </summary>
        <div className="mt-4 space-y-4">
        {triageGroups.map((group) => {
          const groupedSignals = result.signals.filter((signal) =>
            group.priorities.includes(signal.priority),
          );

          return (
            <section
              className="rounded-xl border border-slate-200 bg-white p-4"
              key={group.label}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-950">{group.label}</h3>
                <p className="text-xs text-slate-500">
                  {group.description}
                </p>
              </div>
              <div className="mt-3 space-y-2">
                {groupedSignals.map((signal) => (
                  <div
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                    key={`${signal.category}-${signal.description}`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${categoryStyles[signal.category]}`}
                      >
                        {signal.category}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold ${priorityStyles[signal.priority]}`}
                      >
                        {priorityLabels[signal.priority]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                      {signal.description}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {signal.reason}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-lg font-semibold text-slate-950">Decision Risk</h3>
          <p className="mt-1 text-xs leading-5 text-amber-900">
            Real signals where founder state may amplify the reaction.
          </p>
          <div className="mt-3 space-y-2">
            {decisionRiskSignals.map((signal, index) => (
              <p
                className="rounded-xl bg-white p-3 text-sm leading-6 text-amber-950"
                key={`risk-${signal.category}-${signal.description}-${index}`}
              >
                {signal.category}: {signal.description}
              </p>
            ))}
          </div>
        </section>
        </div>
      </details>
    </article>
  );
}
