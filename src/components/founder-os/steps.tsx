"use client";

import { useState } from "react";
import { defaultDemoInput, demoDecision, demoSystemReadRows, initialSystemState, updatedSystemState } from "@/lib/founder-os/demo-content";

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  color: "var(--ink-light)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: 400,
  marginBottom: 14,
};

const primaryBranchIds = ["productWedge", "founderState", "teamOwnership"] as const;

export default function AnalysisSession({
  onPhaseChange,
}: {
  onPhaseChange: (phase: number) => void;
}) {
  const [phase, setPhase] = useState(0);
  const [decisionCount, setDecisionCount] = useState(1);
  const [patternAnswer, setPatternAnswer] = useState<string | null>(null);
  const [applyClicked, setApplyClicked] = useState(false);
  const [criteriaOpen, setCriteriaOpen] = useState(false);
  const [routeOwnersOpen, setRouteOwnersOpen] = useState(false);
  const [inputExpanded, setInputExpanded] = useState(true);

  function generate() {
    setInputExpanded(false);
    setPhase(1);
    onPhaseChange(1);
  }

  function handlePatternAnswer(value: string) {
    setPatternAnswer(value);
    setPhase(2);
    onPhaseChange(2);
  }

  function handleApply() {
    setApplyClicked(true);
    setPhase(3);
    onPhaseChange(3);
  }

  function handleNewDecision() {
    setPhase(0);
    setPatternAnswer(null);
    setApplyClicked(false);
    setCriteriaOpen(false);
    setRouteOwnersOpen(false);
    setInputExpanded(true);
    setDecisionCount((c) => c + 1);
    onPhaseChange(0);
  }

  const branchBeforeAfter: Array<{ label: string; before: string; after: string }> = primaryBranchIds.map((id) => ({
    label: initialSystemState.branches[id].label,
    before: initialSystemState.branches[id].state,
    after: updatedSystemState.branches[id].state,
  }));

  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", background: "var(--cream)" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 32px", borderBottom: "1px solid var(--border-light)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 15 }}>
          <span style={{ fontWeight: 500, fontFamily: "var(--font-serif)", fontSize: 18, letterSpacing: "-0.01em" }}>Founder OS</span>
          <span style={{ color: "var(--ink-faint)", fontSize: 13 }}>·</span>
          <span style={{ color: "var(--ink-mid)", fontWeight: 300 }}>Nico</span>
          <span style={{ color: "var(--ink-faint)", fontSize: 13 }}>·</span>
          <span style={{ color: "var(--ink-mid)", fontWeight: 300 }}>Physical AI Founder</span>
        </div>
        <span style={{ fontSize: 11, color: "var(--ink-light)", border: "1px solid var(--border-light)", borderRadius: 12, padding: "3px 12px", fontWeight: 300 }}>Demo</span>
      </header>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 32px 0", maxWidth: 720 }}>
          {phase >= 1 && (
            <>
              {/* Section 1 — Session Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-mid)", marginBottom: 32 }}>
                <span style={{ fontWeight: 400 }}>Decision Session #{decisionCount}</span>
                <span style={{ color: "var(--ink-faint)" }}>·</span>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--amber)", display: "inline-block" }} />
                <span>Signal Overload</span>
                <span style={{ color: "var(--ink-faint)" }}>·</span>
                <span>6 branches affected</span>
                <span style={{ color: "var(--ink-faint)" }}>·</span>
                <span style={{ fontStyle: "italic", color: "var(--ink-light)" }}>Awaiting confirmation</span>
              </div>

              {/* Section 2 — Decision Summary — LARGEST visual */}
              <div style={{ marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>
                <div style={sectionLabel}>Decision</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 34, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 16 }}>
                  {demoDecision.decision}
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.5, color: "var(--ink-mid)", fontStyle: "italic", maxWidth: 520 }}>
                  {demoDecision.reframe}
                </div>
              </div>

              {/* Section 3 — System Read */}
              <div style={{ marginBottom: 32 }}>
                <div style={sectionLabel}>System Read</div>
                {demoSystemReadRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom: i < demoSystemReadRows.length - 1 ? "1px solid var(--border-light)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--ink-light)", fontWeight: 400, whiteSpace: "nowrap", minWidth: 120 }}>{row.label}</span>
                    <span style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.5 }}>{row.text}</span>
                  </div>
                ))}
              </div>

              {/* Section 4 — Why This Decision */}
              <div style={{ marginBottom: 32 }}>
                <div style={sectionLabel}>Why this decision</div>
                {demoDecision.reasons.map((reason, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border-light)",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--ink-light)", fontWeight: 500, fontVariantNumeric: "tabular-nums", minWidth: 28 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.5 }}>{reason}</span>
                  </div>
                ))}
                <button
                  onClick={() => setCriteriaOpen(!criteriaOpen)}
                  style={{
                    fontSize: 13,
                    color: "var(--ink-mid)",
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                    fontWeight: 400,
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: "8px 0 0",
                    display: "block",
                  }}
                >
                  View criteria & sources →
                </button>
                {criteriaOpen && (
                  <div style={{ marginTop: 12, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                    {demoDecision.criteria.map((row, i) => (
                      <div key={i} style={{ borderBottom: i < demoDecision.criteria.length - 1 ? "1px solid var(--border-light)" : "none", padding: "12px 16px" }}>
                        <div style={{ fontSize: 13, color: "var(--ink)", marginBottom: 6, fontWeight: 500 }}>{row.criterion}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-mid)" }}>
                          <span style={{ color: "var(--ink-light)" }}>Source:</span> {row.source}
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-mid)" }}>
                          <span style={{ color: "var(--ink-light)" }}>Assessment:</span> {row.assessment}
                        </div>
                        <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-mid)" }}>
                          <span style={{ color: "var(--ink-light)" }}>Result:</span> {row.result}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 5 — Action Boundary */}
              <div style={{ marginBottom: 32 }}>
                <div style={sectionLabel}>Action Boundary</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 10 }}>
                  <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 400 }}>Do now</div>
                    {demoDecision.doNow.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, fontSize: 14, lineHeight: 1.5, color: "var(--ink-mid)", marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{ color: "var(--ink-faint)", flexShrink: 0, marginTop: 2 }}>→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 400 }}>Not today</div>
                    {demoDecision.notToday.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, fontSize: 14, lineHeight: 1.5, color: "var(--ink-light)", marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{ color: "var(--ink-faint)", flexShrink: 0, marginTop: 2 }}>×</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setRouteOwnersOpen(!routeOwnersOpen)}
                  style={{
                    fontSize: 13,
                    color: "var(--ink-mid)",
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                    fontWeight: 400,
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Route owners →
                </button>
                {routeOwnersOpen && (
                  <div style={{ marginTop: 10, border: "1px solid var(--border-light)", borderRadius: 10, padding: "12px 16px" }}>
                    {(["founder", "team", "agent"] as const).map((role) => (
                      <div key={role} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--ink-mid)", marginBottom: 6, alignItems: "flex-start" }}>
                        <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", border: "1px solid var(--border)", marginTop: 6 }} />
                        <span><strong style={{ fontWeight: 500 }}>{role.charAt(0).toUpperCase() + role.slice(1)}:</strong> {demoDecision.owners[role]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 6 — Pattern Check */}
              <div style={{ marginBottom: 32 }}>
                <div style={sectionLabel}>Pattern Check</div>
                <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "18px 20px", marginBottom: 14 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: 6 }}>
                    {demoDecision.pattern.name}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--ink-mid)", marginBottom: 10 }}>
                    This pattern appears when platform pressure rises before the core wedge is stable.
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--ink-light)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 6 }}>Guardrail:</span>
                    {demoDecision.pattern.guardrail}
                  </div>
                </div>

                {phase < 3 && !applyClicked && (
                  <>
                    <div style={{ fontSize: 15, color: "var(--ink-mid)", marginBottom: 10 }}>Was this accurate?</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {["Yes", "Partly", "No", "Mark exception", "Edit guardrail"].map((label) => {
                        const value = label.toLowerCase().replace(/\s+/g, "-");
                        const isMain = label === "Yes" || label === "Partly" || label === "No";
                        return (
                          <button
                            key={label}
                            onClick={() => {
                              if (isMain) handlePatternAnswer(value);
                            }}
                            style={{
                              padding: "7px 18px",
                              border: `1px solid ${patternAnswer === value ? "var(--ink)" : "var(--border)"}`,
                              borderRadius: 20,
                              fontSize: 14,
                              background: patternAnswer === value ? "var(--ink)" : "var(--cream)",
                              color: patternAnswer === value ? "white" : "var(--ink-mid)",
                              fontWeight: patternAnswer === value ? 500 : 300,
                              cursor: "pointer",
                              minHeight: 36,
                              lineHeight: 1.3,
                            }}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Section 7 — Apply Update */}
              {(phase >= 2 || applyClicked) && (
                <div style={{ marginBottom: 32 }}>
                  {!applyClicked ? (
                    <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px" }}>
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, letterSpacing: "-0.01em", marginBottom: 14 }}>
                        Apply update to Nico's system
                      </div>
                      <div style={{ fontSize: 14, color: "var(--ink-mid)", marginBottom: 10 }}>
                        This will update:
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
                        {branchBeforeAfter.map((b) => (
                          <div key={b.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "var(--ink-mid)", padding: "4px 0" }}>
                            <span>{b.label}</span>
                            <span style={{ color: "var(--ink-light)" }}>{b.before} <span style={{ color: "var(--ink-faint)", margin: "0 4px" }}>→</span> <span style={{ color: "var(--ink)", fontWeight: 500 }}>{b.after}</span></span>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--ink-light)", marginBottom: 16, fontStyle: "italic" }}>+ 3 additional branches</div>
                      <button
                        onClick={handleApply}
                        style={{
                          width: "100%",
                          padding: "12px 24px",
                          background: "var(--ink)",
                          color: "white",
                          border: "none",
                          borderRadius: 14,
                          fontSize: 15,
                          fontWeight: 500,
                          cursor: "pointer",
                          fontFamily: "var(--font-serif)",
                          letterSpacing: "-0.01em",
                          minHeight: 44,
                        }}
                      >
                        Apply update
                      </button>
                    </div>
                  ) : (
                    <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, letterSpacing: "-0.01em" }}>Decision saved.</span>
                      </div>
                      <div style={{ fontSize: 15, color: "var(--ink-mid)", marginBottom: 16 }}>Nico's system updated.</div>
                      <button
                        onClick={handleNewDecision}
                        style={{
                          padding: "10px 24px",
                          background: "var(--cream)",
                          color: "var(--ink)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 14,
                          fontWeight: 400,
                          cursor: "pointer",
                          fontFamily: "var(--font-serif)",
                          letterSpacing: "-0.01em",
                          minHeight: 40,
                        }}
                      >
                        New decision
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Section 8 — Input Dock (bottom dock) */}
        <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-light)", padding: "16px 32px", flexShrink: 0, background: "var(--cream)" }}>
          {phase === 0 ? (
            <>
              {decisionCount > 1 && (
                <div style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 12, color: "var(--ink-light)" }}>
                  <span style={{ color: "var(--ink-mid)" }}>←</span>
                  <span>Previous: <em>{demoDecision.decision}</em></span>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400 }}>Decision #{decisionCount} · Input</span>
              </div>
              <textarea
                style={{
                  width: "100%",
                  maxWidth: 680,
                  minHeight: 130,
                  resize: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  background: "var(--cream)",
                  outline: "none",
                  fontFamily: "inherit",
                }}
                defaultValue={defaultDemoInput}
                readOnly
              />
              <div style={{ marginTop: 14 }}>
                <button
                  onClick={generate}
                  style={{
                    maxWidth: 320,
                    width: "100%",
                    padding: "12px 24px",
                    background: "var(--ink)",
                    color: "white",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "var(--font-serif)",
                    letterSpacing: "-0.01em",
                    minHeight: 44,
                  }}
                >
                  Generate decision brief
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "12px 16px",
                cursor: "pointer",
                maxWidth: 680,
              }}
              onClick={() => setInputExpanded(!inputExpanded)}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: inputExpanded ? 8 : 0 }}>
                <span style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400 }}>Decision #{decisionCount} · Input source</span>
                <span style={{ fontSize: 12, color: "var(--ink-mid)", textDecoration: "underline", textUnderlineOffset: 2 }}>
                  {inputExpanded ? "Collapse" : "Expand"}
                </span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "var(--ink-mid)",
                  maxHeight: inputExpanded ? 300 : 40,
                  overflow: "hidden",
                  transition: "max-height 0.2s",
                }}
              >
                {defaultDemoInput}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
