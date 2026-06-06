import { getActionOwner } from "@/lib/triage/ownership";
import type { TriageResult } from "@/lib/triage/types";

type PriorityResetPanelProps = {
  result: TriageResult;
};

export function PriorityResetPanel({ result }: PriorityResetPanelProps) {
  const primaryAction = result.nextActions[0];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
        Your next move
      </p>
      <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-slate-950">{primaryAction?.action ?? "Validate onboarding and freeze demo scope."}</h2>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {result.priorityRationale}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["Do", "Validate onboarding with 3 users."],
          ["Don't", "Do not pivot or add dashboard today."],
        ].map(([label, copy]) => (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={label}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">{copy}</p>
          </div>
        ))}
      </div>

      <details className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Do not become work today
        </summary>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          <li>Do not pivot because of competitor news.</li>
          <li>Do not add the dashboard before demo day.</li>
          <li>Do not rewrite roadmap while exhausted.</li>
        </ul>
      </details>

      <details className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">
          Show next actions and ownership
        </summary>
        <div className="mt-4 space-y-3">
        {result.nextActions.map((item, index) => {
          const owner = getActionOwner(item.action, index);

          return (
            <div
              className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
              key={item.action}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold leading-6 text-slate-950">{item.action}</p>
                <p className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.1em]">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                    {item.timing}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                    Owner: {owner}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
        </div>
      </details>
    </article>
  );
}
