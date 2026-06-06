export function WaitingState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        Waiting for triage
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        One messy update becomes decision clarity.
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {[
          ["1", "Load profile"],
          ["2", "Classify signals"],
          ["3", "Check pattern maturity"],
          ["4", "Apply rule"],
        ].map(([step, label]) => (
          <div
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            key={label}
          >
            <p className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-600 ring-1 ring-slate-200">
              {step}
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-800">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
