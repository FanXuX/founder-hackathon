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
  const [modalOpen, setModalOpen] = useState(false);

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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <FounderSystemTree
        systemState={systemState}
        pulse={treePulse}
        updated={treeUpdated}
        onOpenModal={() => setModalOpen(true)}
      />
      <AnalysisSession onPhaseChange={handlePhaseChange} />

      {/* Target Mode Modal */}
      {modalOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(245,243,238,0.88)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{
            background: "var(--cream)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: 32,
            width: 400,
            maxWidth: "90vw",
            position: "relative",
          }}>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 18,
                background: "none",
                border: "none",
                color: "var(--ink-light)",
                cursor: "pointer",
                fontSize: 22,
                lineHeight: 1,
              }}
            >
              ×
            </button>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 23, marginBottom: 10, color: "var(--ink)" }}>
              Target Mode
            </h3>
            <p style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: 8, fontWeight: 300, fontStyle: "italic" }}>
              Intensity without chaos.
            </p>
            <p style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: 8, fontWeight: 300 }}>
              Move with frontier-level ambition, without turning every platform signal into this week's roadmap.
            </p>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>Principle</div>
              <p style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.7, fontWeight: 300 }}>
                Keep the frontier vision.<br />Protect the recovery wedge.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
