"use client";

import { useEffect, useState } from "react";
import { initialSystemState, loadSystemState, saveSystemState, updatedSystemState } from "@/lib/founder-os/demo-content";
import type { SystemState } from "@/lib/founder-os/types";
import FounderSystemTree from "@/components/founder-os/FounderSystemTree";
import AnalysisSession from "@/components/founder-os/steps";

export default function Home() {
  const [systemState, setSystemState] = useState<SystemState>(initialSystemState);
  const [treePulse, setTreePulse] = useState(false);
  const [treeUpdated, setTreeUpdated] = useState(false);

  useEffect(() => {
    const saved = loadSystemState();
    if (JSON.stringify(saved) !== JSON.stringify(systemState)) {
      setSystemState(saved);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    saveSystemState(systemState);
  }, [systemState]);

  function handlePhaseChange(phase: number) {
    if (phase >= 1) setTreePulse(true);
    if (phase >= 3) {
      setTreeUpdated(true);
      setSystemState(updatedSystemState);
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--cream)" }}>
      <FounderSystemTree
        systemState={systemState}
        pulse={treePulse}
        updated={treeUpdated}
      />
      <AnalysisSession onPhaseChange={handlePhaseChange} />
    </div>
  );
}
