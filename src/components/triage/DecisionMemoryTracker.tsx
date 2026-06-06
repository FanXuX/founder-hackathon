import type { DecisionRecord, TriageResult } from "@/lib/triage/types";

type DecisionMemoryTrackerProps = {
  memoryCount: number;
  result: TriageResult;
  onSave: (evaluation: DecisionRecord["evaluation"]) => void;
};

export function DecisionMemoryTracker({
  memoryCount,
  result,
  onSave,
}: DecisionMemoryTrackerProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        Decision memory
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
        Track this outcome later.
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        This is how the product becomes history-based: save the trigger,
        founder state, decision, action, and outcome. Future triage can compare
        against these records.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
        <p>
          <span className="font-semibold text-slate-950">Current pattern:</span>{" "}
          {result.patternName}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-slate-950">Saved decisions:</span> {memoryCount}
        </p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <button
          className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          onClick={() => onSave("unknown")}
        >
          Save, outcome unknown
        </button>
        <button
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
          onClick={() => onSave("correct")}
        >
          Later: correct
        </button>
        <button
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800 transition hover:bg-rose-100"
          onClick={() => onSave("costly")}
        >
          Later: costly
        </button>
      </div>
    </section>
  );
}
