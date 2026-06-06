type TriageInputPanelProps = {
  input: string;
  isLoading: boolean;
  error: string | null;
  onInputChange: (value: string) => void;
  onReset: () => void;
  onTriage: () => void;
};

export function TriageInputPanel({
  input,
  isLoading,
  error,
  onInputChange,
  onReset,
  onTriage,
}: TriageInputPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] lg:overflow-auto">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Founder Signal Triage
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Decision clarity before work becomes work.
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
          Existing tools help store, schedule, and execute work. Founder Signal
          Triage helps decide what deserves founder attention first.
        </p>
      </header>

      <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <label
          className="text-sm font-semibold text-slate-700"
          htmlFor="founder-input"
        >
          Messy founder input
        </label>
        <textarea
          className="mt-3 min-h-56 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-base leading-7 text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          id="founder-input"
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Drop investor, customer, team, market, execution, and founder-state signals here."
          value={input}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-xl bg-slate-950 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!input.trim() || isLoading}
            onClick={onTriage}
          >
            {isLoading ? "Triaging..." : "Triage today"}
          </button>
          <button
            className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
            onClick={onReset}
          >
            Reload sample
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-950">Demo thesis</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Founder OS helps early-stage founders decide what deserves to become
          work, using decision history to protect judgment under signal
          overload.
        </p>
        {error ? (
          <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs font-semibold leading-5 text-amber-900">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
