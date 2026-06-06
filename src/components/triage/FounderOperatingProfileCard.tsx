import { maturitySteps } from "@/lib/triage/founder-profile";
import type { FounderOperatingProfile } from "@/lib/triage/types";

type FounderOperatingProfileCardProps = {
  profile: FounderOperatingProfile;
};

export function FounderOperatingProfileCard({
  profile,
}: FounderOperatingProfileCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {profile.version}
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
            {profile.stage} · {profile.northStar}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Watch pattern: {profile.highRiskPattern}. Rule: {profile.standingRule}.
          </p>
        </div>
        <div className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
          {profile.patternMaturity}
        </div>
      </div>

      <details className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Profile logic
        </summary>
        <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
          {[
            ["Decision style", profile.decisionStyle],
            ["Intervention", profile.interventionStyle],
            ["Maturity evidence", profile.maturityReason],
          ].map(([label, value]) => (
            <div className="rounded-xl border border-slate-200 bg-white p-3" key={label}>
              <p className="font-semibold text-slate-950">{label}</p>
              <p className="mt-1 leading-5 text-slate-600">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-4">
          {maturitySteps.map((step) => (
            <div
              className="rounded-xl border border-slate-200 bg-white p-3 text-xs"
              key={step.level}
            >
              <p className="font-semibold text-slate-950">{step.level}</p>
              <p className="mt-1 leading-5 text-slate-600">
                {step.condition}
              </p>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
