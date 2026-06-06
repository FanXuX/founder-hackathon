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
    <section className="rounded-[2rem] border border-stone-200 bg-[#fffaf0] p-5 shadow-2xl shadow-stone-300/40 sm:p-7 lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:overflow-auto">
      <header>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-600">
          Founder Signal Triage
        </p>
        <h1 className="mt-3 text-4xl font-black leading-none tracking-tight sm:text-5xl">
          Decision clarity before work becomes work.
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600 sm:text-base">
          Existing tools help store, schedule, and execute work. Founder Signal
          Triage helps decide what deserves founder attention first.
        </p>
      </header>

      <div className="mt-7 rounded-3xl bg-stone-950 p-5 text-white">
        <label
          className="text-sm font-bold text-orange-200"
          htmlFor="founder-input"
        >
          Messy founder input
        </label>
        <textarea
          className="mt-3 min-h-56 w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-base leading-7 text-white outline-none placeholder:text-stone-400 focus:border-orange-300"
          id="founder-input"
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Drop investor, customer, team, market, execution, and founder-state signals here."
          value={input}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-2xl bg-orange-400 px-5 py-4 text-base font-black text-stone-950 shadow-lg shadow-orange-950/20 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!input.trim() || isLoading}
            onClick={onTriage}
          >
            {isLoading ? "Triaging..." : "Triage today"}
          </button>
          <button
            className="rounded-2xl border border-white/20 px-5 py-4 text-base font-black text-white transition hover:bg-white/10"
            onClick={onReset}
          >
            Reset demo
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-dashed border-stone-300 p-4">
        <p className="text-sm font-black">Demo thesis</p>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Founder OS helps early-stage founders decide what deserves to become
          work, using decision history to protect judgment under signal
          overload.
        </p>
        {error ? (
          <p className="mt-3 rounded-2xl bg-orange-100 p-3 text-xs font-bold leading-5 text-orange-900">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
