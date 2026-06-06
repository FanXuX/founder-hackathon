"use client";

import { useState } from "react";
import {
  createDecisionRecord,
  readDecisionMemory,
  writeDecisionMemory,
} from "@/lib/triage/decision-memory";
import { demoInput, fallbackResult } from "@/lib/triage/fallback-result";
import {
  maturitySteps,
  readFounderProfile,
  resetFounderProfile,
  writeFounderProfile,
} from "@/lib/triage/founder-profile";
import type {
  DecisionRecord,
  FounderOperatingProfile,
  PatternMaturity,
  TriageResult,
} from "@/lib/triage/types";

type AppPage = "today" | "path" | "decision" | "profile" | "memory";

const pageLabels: Array<{ id: AppPage; label: string }> = [
  { id: "today", label: "Today" },
  { id: "path", label: "Path" },
  { id: "decision", label: "Decision" },
  { id: "profile", label: "Profile" },
  { id: "memory", label: "Memory" },
];

export default function Home() {
  const [activePage, setActivePage] = useState<AppPage>("today");
  const [input, setInput] = useState(demoInput);
  const [triaged, setTriaged] = useState(false);
  const [result, setResult] = useState<TriageResult>(fallbackResult);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [founderProfile, setFounderProfile] = useState<FounderOperatingProfile>(
    () => readFounderProfile(),
  );
  const [decisionMemory, setDecisionMemory] = useState<DecisionRecord[]>(() =>
    readDecisionMemory(),
  );

  async function triageToday() {
    if (!input.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          founderProfile,
          history: decisionMemory,
          input,
        }),
      });

      if (!response.ok) {
        throw new Error("Triage request failed.");
      }

      setResult((await response.json()) as TriageResult);
      setTriaged(true);
      setActivePage("decision");
    } catch {
      setResult(fallbackResult);
      setTriaged(true);
      setActivePage("decision");
      setError("Live AI failed. Showing fallback demo output.");
    } finally {
      setIsLoading(false);
    }
  }

  function saveDecision(evaluation: DecisionRecord["evaluation"]) {
    const nextMemory = [
      createDecisionRecord(result, evaluation),
      ...decisionMemory,
    ].slice(0, 20);

    setDecisionMemory(nextMemory);
    writeDecisionMemory(nextMemory);
    setActivePage("memory");
  }

  function updateFounderProfile(nextProfile: FounderOperatingProfile) {
    setFounderProfile(nextProfile);
    writeFounderProfile(nextProfile);
  }

  function restoreDefaultProfile() {
    const defaultProfile = resetFounderProfile();
    setFounderProfile(defaultProfile);
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white">
        <header className="px-5 pb-4 pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Founder Signal Triage
          </p>
          <div className="mt-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              Decide what becomes work.
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              One signal path. One decision. Optional evidence later.
            </p>
          </div>
          {error ? (
            <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
              {error}
            </p>
          ) : null}
        </header>

        <section className="flex-1 overflow-y-auto px-5 py-5 pb-28">
          {activePage === "today" ? (
            <TodayPage
              input={input}
              isLoading={isLoading}
              onInputChange={setInput}
              onTriage={triageToday}
              triaged={triaged}
            />
          ) : null}

          {activePage === "path" ? (
            <PathPage result={result} triaged={triaged} />
          ) : null}

          {activePage === "decision" ? (
            <DecisionPage
              onSave={saveDecision}
              result={result}
              triaged={triaged}
            />
          ) : null}

          {activePage === "profile" ? (
            <ProfilePage
              onChange={updateFounderProfile}
              onReset={restoreDefaultProfile}
              profile={founderProfile}
            />
          ) : null}

          {activePage === "memory" ? (
            <MemoryPage memory={decisionMemory} result={result} triaged={triaged} />
          ) : null}
        </section>

        <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md bg-white/95 px-4 py-3 backdrop-blur">
          <div className="grid grid-cols-5 gap-1 rounded-2xl bg-slate-100 p-1">
            {pageLabels.map((page) => {
              const isActive = activePage === page.id;

              return (
                <button
                  className={`rounded-xl px-2 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500"
                  }`}
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                >
                  {page.label}
                </button>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
}

function TodayPage({
  input,
  isLoading,
  onInputChange,
  onTriage,
  triaged,
}: {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onTriage: () => void;
  triaged: boolean;
}) {
  return (
    <div className="space-y-5">
      <section>
        <p className="text-sm font-semibold text-slate-950">What happened?</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Paste the messy update. Do not organize it first.
        </p>
        <textarea
          className="mt-4 min-h-64 w-full resize-none rounded-2xl bg-slate-50 p-4 text-base leading-7 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100"
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Investor silence, user feedback, competitor news, team requests, founder state..."
          value={input}
        />
      </section>

      <button
        className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!input.trim() || isLoading}
        onClick={onTriage}
      >
        {isLoading ? "Finding decision path..." : "Find decision path"}
      </button>

      <p className="text-center text-sm text-slate-400">
        {triaged ? "Decision ready" : "No decision yet"}
      </p>

      <section className="pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          How it works
        </p>
        <div className="mt-4 space-y-3">
          {[
            "Read signal",
            "Check profile",
            "Find distortion risk",
            "Choose next action",
          ].map((label, index) => (
            <div className="flex items-center gap-3" key={label}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-slate-700">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PathPage({ result, triaged }: { result: TriageResult; triaged: boolean }) {
  const path = [
    ["Trigger", result.decisionLoop.trigger],
    ["Founder state", result.decisionLoop.state],
    ["Pattern check", result.patternName],
    ["Decision", result.decisionLoop.decision],
    ["Next action", result.decisionLoop.action],
  ];

  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Decision path"
        title="See how the system reached the recommendation."
      />
      {!triaged ? <EmptyState copy="Run triage first to generate a path." /> : null}
      <div className="space-y-0">
        {path.map(([label, value], index) => (
          <div className="grid grid-cols-[2rem_1fr] gap-3" key={label}>
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {index + 1}
              </span>
              {index < path.length - 1 ? (
                <span className="h-12 w-px bg-slate-200" />
              ) : null}
            </div>
            <div className="pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-base font-semibold leading-6 text-slate-950">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DecisionPage({
  onSave,
  result,
  triaged,
}: {
  onSave: (evaluation: DecisionRecord["evaluation"]) => void;
  result: TriageResult;
  triaged: boolean;
}) {
  const primaryAction = result.nextActions[0];

  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Decision" title="Recommended focus" />
      {!triaged ? <EmptyState copy="Run triage first to generate a decision." /> : null}

      <section className="pt-1">
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {result.decisionRisk} decision risk
        </span>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight">
          {result.topPriority}
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {result.priorityRationale}
        </p>
      </section>

      <section className="rounded-3xl bg-blue-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
          Next move
        </p>
        <p className="mt-2 text-xl font-semibold leading-7 text-slate-950">
          {primaryAction?.action ?? "Validate onboarding and freeze scope."}
        </p>
        <p className="mt-2 text-sm text-blue-700">
          {primaryAction?.timing ?? "today"}
        </p>
      </section>

      <details className="rounded-3xl bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">
          Show evidence
        </summary>
        <div className="mt-4 space-y-3">
          {result.signals.slice(0, 4).map((signal) => (
            <div className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0" key={`${signal.category}-${signal.description}`}>
              <p className="text-xs font-semibold text-slate-400">
                {signal.category} · {signal.priority.replace("_", " ")}
              </p>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-800">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </details>

      <section className="grid grid-cols-3 gap-2">
        <button
          className="rounded-2xl bg-slate-950 px-3 py-3 text-xs font-semibold text-white"
          onClick={() => onSave("unknown")}
        >
          Save
        </button>
        <button
          className="rounded-2xl bg-emerald-50 px-3 py-3 text-xs font-semibold text-emerald-800"
          onClick={() => onSave("correct")}
        >
          Correct
        </button>
        <button
          className="rounded-2xl bg-rose-50 px-3 py-3 text-xs font-semibold text-rose-800"
          onClick={() => onSave("costly")}
        >
          Costly
        </button>
      </section>
    </div>
  );
}

function ProfilePage({
  onChange,
  onReset,
  profile,
}: {
  onChange: (profile: FounderOperatingProfile) => void;
  onReset: () => void;
  profile: FounderOperatingProfile;
}) {
  function updateField<Key extends keyof FounderOperatingProfile>(
    key: Key,
    value: FounderOperatingProfile[Key],
  ) {
    onChange({ ...profile, [key]: value });
  }

  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Profile" title="Edit your judgment model." />
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          How this works
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The default framework is only a starting map. If it feels wrong, edit
          it. Future triage will use this version instead of the default.
        </p>
      </section>

      <div className="space-y-4">
        <ProfileField
          label="Current stage"
          onChange={(value) => updateField("stage", value)}
          value={profile.stage}
        />
        <ProfileField
          label="North Star"
          onChange={(value) => updateField("northStar", value)}
          value={profile.northStar}
        />
        <ProfileField
          label="Watch pattern"
          onChange={(value) => updateField("highRiskPattern", value)}
          value={profile.highRiskPattern}
        />
        <ProfileField
          label="Decision style"
          onChange={(value) => updateField("decisionStyle", value)}
          value={profile.decisionStyle}
        />
        <ProfileField
          label="Intervention style"
          onChange={(value) => updateField("interventionStyle", value)}
          value={profile.interventionStyle}
        />
        <ProfileField
          label="Standing rule"
          onChange={(value) => updateField("standingRule", value)}
          value={profile.standingRule}
        />
      </div>

      <label className="block border-t border-slate-100 py-4">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Pattern maturity
        </span>
        <select
          className="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:ring-4 focus:ring-blue-100"
          onChange={(event) =>
            updateField("patternMaturity", event.target.value as PatternMaturity)
          }
          value={profile.patternMaturity}
        >
          {maturitySteps.map((step) => (
            <option key={step.level} value={step.level}>
              {step.level}
            </option>
          ))}
        </select>
      </label>

      <ProfileField
        label="Maturity evidence"
        onChange={(value) => updateField("maturityReason", value)}
        value={profile.maturityReason}
      />

      <section className="rounded-3xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-950">Pattern maturity</p>
        <div className="mt-4 space-y-3">
          {maturitySteps.map((step) => (
            <div className="flex gap-3" key={step.level}>
              <span
                className={`mt-1 h-2.5 w-2.5 rounded-full ${
                  step.level === profile.patternMaturity
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">{step.level}</p>
                <p className="text-xs leading-5 text-slate-500">{step.condition}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600"
        onClick={onReset}
      >
        Reset to expert default
      </button>
    </div>
  );
}

function ProfileField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block border-t border-slate-100 py-4">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>
      <textarea
        className="mt-2 min-h-20 w-full resize-none rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-900 outline-none focus:ring-4 focus:ring-blue-100"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function MemoryPage({
  memory,
  result,
  triaged,
}: {
  memory: DecisionRecord[];
  result: TriageResult;
  triaged: boolean;
}) {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Memory" title="Outcomes make patterns real." />
      <section>
        <p className="text-4xl font-semibold">{memory.length}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Saved decisions. Pattern maturity grows from recurrence, confirmation,
          and outcome evidence.
        </p>
      </section>

      {triaged ? (
        <section className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Current pattern
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
            {result.patternName}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {result.memoryInsight}
          </p>
        </section>
      ) : null}

      <div className="space-y-3">
        {memory.length ? (
          memory.slice(0, 5).map((record) => (
            <section className="border-t border-slate-100 py-4" key={record.id}>
              <p className="text-xs font-semibold text-slate-400">
                {record.date} · {record.evaluation}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                {record.decision}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {record.action}
              </p>
            </section>
          ))
        ) : (
          <EmptyState copy="No saved decisions yet." />
        )}
      </div>
    </div>
  );
}

function PageTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function EmptyState({ copy }: { copy: string }) {
  return (
      <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-500">
      {copy}
    </div>
  );
}
