import { getActionOwner } from "@/lib/triage/ownership";
import type { TriageResult } from "@/lib/triage/types";

type PriorityResetPanelProps = {
  result: TriageResult;
};

export function PriorityResetPanel({ result }: PriorityResetPanelProps) {
  return (
    <article className="rounded-[2rem] border border-orange-200 bg-orange-100 p-5 shadow-xl shadow-stone-300/30 sm:p-7">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-700">
        What deserves work
      </p>
      <h2 className="mt-2 text-4xl font-black leading-none tracking-tight">
        Validate onboarding and freeze demo scope.
      </h2>
      <p className="mt-4 text-sm font-bold leading-6 text-stone-700">
        {result.priorityRationale}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          [
            "Do today",
            result.nextActions[0]?.action ?? "Pick the highest-evidence action",
          ],
          ["Block", result.nextActions[1]?.action ?? "Block scope expansion"],
          [
            "Defer",
            result.nextActions[3]?.action ??
              "Defer low-evidence strategy changes",
          ],
        ].map(([label, copy]) => (
          <div className="rounded-3xl bg-white/70 p-4" key={label}>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-700">
              {label}
            </p>
            <p className="mt-2 text-sm font-black leading-6">{copy}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-3xl border border-orange-300 bg-orange-50 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">
          Do not become work today
        </p>
        <ul className="mt-3 space-y-2 text-sm font-bold leading-6 text-stone-800">
          <li>Do not pivot because of competitor news.</li>
          <li>Do not add the dashboard before demo day.</li>
          <li>Do not rewrite roadmap while exhausted.</li>
        </ul>
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
                <p className="text-sm font-black leading-6">{item.action}</p>
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
  );
}
