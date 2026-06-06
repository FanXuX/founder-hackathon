export function WaitingState() {
  return (
    <div className="rounded-[2rem] border border-stone-200 bg-[#fffaf0] p-6 shadow-xl shadow-stone-300/30 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-600">
        Waiting for triage
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight">
        One messy update becomes decision clarity.
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {[
          ["1", "Classify signals"],
          ["2", "Detect reaction risk"],
          ["3", "Recall history"],
          ["4", "Protect focus"],
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
  );
}
