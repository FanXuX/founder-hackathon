"use client";

import { useState } from "react";
import { DecisionIntervention } from "@/components/triage/DecisionIntervention";
import { PriorityResetPanel } from "@/components/triage/PriorityResetPanel";
import { SupportingTriageEvidence } from "@/components/triage/SupportingTriageEvidence";
import { TriageInputPanel } from "@/components/triage/TriageInputPanel";
import { WaitingState } from "@/components/triage/WaitingState";
import { demoInput, fallbackResult } from "@/lib/triage/fallback-result";
import type { TriageResult } from "@/lib/triage/types";

export default function Home() {
  const [input, setInput] = useState(demoInput);
  const [triaged, setTriaged] = useState(false);
  const [result, setResult] = useState<TriageResult>(fallbackResult);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error("Triage request failed.");
      }

      setResult((await response.json()) as TriageResult);
      setTriaged(true);
    } catch {
      setResult(fallbackResult);
      setTriaged(true);
      setError("Live AI failed. Showing the fallback demo output.");
    } finally {
      setIsLoading(false);
    }
  }

  function resetDemo() {
    setInput(demoInput);
    setTriaged(false);
    setResult(fallbackResult);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-[#f3efe3] px-4 py-5 text-stone-950 sm:px-6">
      <main className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[0.95fr_1.2fr]">
        <TriageInputPanel
          error={error}
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onReset={resetDemo}
          onTriage={triageToday}
        />

        <section className="space-y-4">
          {!triaged ? (
            <WaitingState />
          ) : (
            <>
              <DecisionIntervention result={result} />
              <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <PriorityResetPanel result={result} />
                <SupportingTriageEvidence result={result} />
              </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
