import type { DecisionLoop } from "@/lib/triage/types";

type DecisionLoopStripProps = {
  decisionLoop: DecisionLoop;
};

export function DecisionLoopStrip({ decisionLoop }: DecisionLoopStripProps) {
  return (
    <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-300">
        Decision loop used
      </p>
      <div className="mt-4 grid gap-2 text-sm font-bold leading-6 md:grid-cols-5">
        {[
          ["Trigger", decisionLoop.trigger],
          ["State", decisionLoop.state],
          ["Decision", decisionLoop.decision],
          ["Action", decisionLoop.action],
          ["Outcome", decisionLoop.outcome],
        ].map(([label, value]) => (
          <div className="rounded-2xl bg-white/10 p-3" key={label}>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-orange-300">
              {label}
            </p>
            <p className="mt-2 text-stone-100">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
