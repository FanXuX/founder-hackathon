"use client";

import { useState } from "react";
import { defaultDemoInput, demoDecision, initialSystemState, updatedSystemState } from "@/lib/founder-os/demo-content";

const PRIMARY_IDS = ["productWedge", "founderState", "teamOwnership"] as const;

export default function AnalysisSession({
  onPhaseChange,
}: {
  onPhaseChange: (phase: number) => void;
}) {
  const [phase, setPhase] = useState(0);
  const [decisionCount, setDecisionCount] = useState(1);
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genCount, setGenCount] = useState(0);
  const [confirmedPattern, setConfirmedPattern] = useState<string | null>(null);
  const [criteriaOpen, setCriteriaOpen] = useState(false);
  const [routeOpen, setRouteOpen] = useState(false);
  const [guardrailEditing, setGuardrailEditing] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);

  const b = demoDecision;

  function generate() {
    setThinking(true);
    setError(null);
    setCriteriaOpen(false);
    setRouteOpen(false);
    setConfirmedPattern(null);
    setGuardrailEditing(false);

    setTimeout(() => {
      setThinking(false);
      setGenCount((c) => c + 1);
      setPhase(1);
      onPhaseChange(1);
    }, 800);
  }

  function confirmPattern(type: string) {
    setConfirmedPattern(type);
  }

  function handleApply() {
    setPhase(3);
    onPhaseChange(3);
  }

  function handleNewDecision() {
    setPhase(0);
    setDockCollapsed(false);
    setConfirmedPattern(null);
    setCriteriaOpen(false);
    setRouteOpen(false);
    setGuardrailEditing(false);
    setError(null);
    setDecisionCount((c) => c + 1);
    onPhaseChange(0);
  }

  const branchTransitions = PRIMARY_IDS.map((id) => ({
    label: initialSystemState.branches[id].label,
    before: initialSystemState.branches[id].state,
    after: updatedSystemState.branches[id].state,
  }));

  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", background: "var(--surface)" }}>
      {/* Top bar */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 50, borderBottom: "1px solid var(--border-light)", flexShrink: 0, background: "var(--cream)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 18, letterSpacing: "0.01em", color: "var(--ink)" }}>Founder OS</span>
          <span style={{ fontSize: 13, color: "var(--ink-light)", fontWeight: 300, letterSpacing: "0.04em" }}>Nico · Physical AI Founder</span>
        </div>
        <span style={{ fontSize: 11, padding: "3px 10px", border: "1px solid var(--border)", color: "var(--ink-light)", letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 20, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
          Live
        </span>
      </header>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px 60px", background: "var(--surface)" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {/* 1 Session status */}
          {phase >= 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink)" }}>Decision Session</span>
              <span style={{ fontSize: 13, color: "var(--ink-light)", fontWeight: 300, display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--amber)" }} />
                {b.sessionLabel} · {b.affectedBranches.length} branches affected · Awaiting confirmation
              </span>
            </div>
          )}

          {/* 2 Decision */}
          {phase >= 1 && (
            <div style={{ marginBottom: 0 }}>
              <div style={{ fontSize: 12, color: "var(--ink-light)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>Decision</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 42, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 20 }}>
                {b.decision.headlineLine1}<br />{b.decision.headlineLine2}
              </div>
              <div style={{ fontSize: 17, color: "var(--ink-mid)", fontWeight: 300, lineHeight: 1.5, maxWidth: 620, paddingBottom: 30, borderBottom: "1px solid var(--border)" }}>
                {b.decision.reframe}
              </div>
            </div>
          )}

          {/* 3 System read */}
          {phase >= 1 && (
            <>
              <div style={{ height: 1, background: "var(--border-light)", margin: "30px 0" }} />
              <div style={{ marginBottom: 0 }}>
                <div style={{ fontSize: 12, color: "var(--ink-light)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>System read</div>
                {b.systemRead.map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 16, padding: "11px 0", borderBottom: "1px solid var(--border-light)", fontSize: 15 }}>
                    <div style={{ color: "var(--ink-light)", fontWeight: 400, fontSize: 13 }}>{row.label}</div>
                    <div style={{ color: "var(--body)", fontWeight: 300, lineHeight: 1.5 }}>{row.text}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 4 Why this decision */}
          {phase >= 1 && (
            <>
              <div style={{ height: 1, background: "var(--border-light)", margin: "30px 0" }} />
              <div style={{ marginBottom: 0 }}>
                <div style={{ fontSize: 12, color: "var(--ink-light)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Why this decision</div>
                {b.reasons.map((reason, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", fontSize: 16, color: "var(--body)", fontWeight: 400, alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink-faint)", minWidth: 22, fontWeight: 500 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{reason}</span>
                  </div>
                ))}
                <div
                  onClick={() => setCriteriaOpen(!criteriaOpen)}
                  style={{ fontSize: 13, color: "var(--ink)", cursor: "pointer", marginTop: 10, display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 400 }}
                >
                  <span>{criteriaOpen ? "⌄" : "›"}</span> View criteria &amp; sources
                </div>
                <div
                  style={{
                    display: criteriaOpen ? "block" : "none",
                    marginTop: 16,
                    borderTop: "1px solid var(--border-light)",
                  }}
                >
                  {b.criteria.map((row, i) => (
                    <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid var(--border-light)" }}>
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--ink)", marginBottom: 6 }}>{row.name}</div>
                      <div style={{ fontSize: 13, color: "var(--ink-mid)", fontWeight: 300, lineHeight: 1.6 }}>
                        <b style={{ fontWeight: 400, color: "var(--ink-light)" }}>Source:</b> {row.source}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--ink-mid)", fontWeight: 300, lineHeight: 1.6 }}>
                        <b style={{ fontWeight: 400, color: "var(--ink-light)" }}>Assessment:</b> {row.assessment}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--ink-mid)", fontWeight: 300, lineHeight: 1.6 }}>
                        <b style={{ fontWeight: 400, color: "var(--ink-light)" }}>Result:</b> {row.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 5 Action boundary */}
          {phase >= 1 && (
            <>
              <div style={{ height: 1, background: "var(--border-light)", margin: "30px 0" }} />
              <div style={{ marginBottom: 0 }}>
                <div style={{ fontSize: 12, color: "var(--ink-light)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Action boundary</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ border: "1px solid var(--border-light)", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, color: "var(--green)" }}>Do now</div>
                    {b.actions.doNow.map((item, i) => (
                      <div key={i} style={{ fontSize: 14, color: "var(--body)", fontWeight: 300, marginBottom: 8, paddingLeft: 14, position: "relative", lineHeight: 1.45 }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--ink-faint)" }}>–</span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div style={{ border: "1px solid var(--border-light)", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, color: "var(--red)" }}>Not today</div>
                    {b.actions.notToday.map((item, i) => (
                      <div key={i} style={{ fontSize: 14, color: "var(--body)", fontWeight: 300, marginBottom: 8, paddingLeft: 14, position: "relative", lineHeight: 1.45 }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--ink-faint)" }}>–</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  onClick={() => setRouteOpen(!routeOpen)}
                  style={{ fontSize: 13, color: "var(--ink)", cursor: "pointer", marginTop: 14, display: "inline-flex", alignItems: "center", gap: 5 }}
                >
                  Route owners →
                </div>
                <div
                  style={{
                    display: routeOpen ? "block" : "none",
                    marginTop: 14,
                    border: "1px solid var(--border-light)",
                    borderRadius: 10,
                    padding: "14px 18px",
                  }}
                >
                  {(["founder", "team", "agent"] as const).map((role) => (
                    <div key={role} style={{ display: "flex", gap: 14, fontSize: 14, marginBottom: 8, fontWeight: 300 }}>
                      <span style={{ color: "var(--ink-light)", minWidth: 62, textTransform: "capitalize" }}>{role}</span>
                      <span style={{ color: "var(--body)" }}>{b.route[role]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 6 Pattern check */}
          {phase >= 1 && phase < 3 && (
            <>
              <div style={{ height: 1, background: "var(--border-light)", margin: "30px 0" }} />
              <div style={{ marginBottom: 0 }}>
                <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px", background: "var(--surface)" }}>
                  <div style={{ fontSize: 12, color: "var(--ink-light)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>Pattern check</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--ink)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                    {b.pattern.name}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--ink-mid)", fontWeight: 300, lineHeight: 1.55, marginBottom: 14 }}>
                    {b.pattern.description}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--body)", fontWeight: 300, marginBottom: 16, paddingLeft: 14, borderLeft: "2px solid var(--border)" }}>
                    <b style={{ fontWeight: 400, color: "var(--ink-light)", display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Guardrail</b>
                    {guardrailEditing ? (
                      <textarea
                        style={{ width: "100%", minHeight: 56, padding: "10px 12px", background: "var(--cream)", border: "1px solid var(--border)", color: "var(--body)", fontFamily: "var(--font-sans)", fontSize: 13, resize: "none", borderRadius: 8, marginBottom: 10, fontWeight: 300 }}
                        defaultValue={b.pattern.guardrail}
                      />
                    ) : (
                      b.pattern.guardrail
                    )}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--body)", marginBottom: 12, fontWeight: 400 }}>Was this accurate?</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Yes", "Partly", "No", "Mark exception", "Edit guardrail"].map((label) => {
                      const value = label.toLowerCase().replace(/\s+/g, "-");
                      const isMain = ["yes", "partly", "no"].includes(value);
                      const confirmed = confirmedPattern === value;
                      return (
                        <button
                          key={label}
                          onClick={() => {
                            if (isMain || label === "Mark exception") confirmPattern(value);
                            if (label === "Edit guardrail") setGuardrailEditing(!guardrailEditing);
                          }}
                          style={{
                            minHeight: 38,
                            padding: "0 16px",
                            border: confirmed ? "1px solid var(--green)" : "1px solid var(--border)",
                            borderRadius: 8,
                            background: confirmed ? "rgba(53,96,70,0.05)" : "transparent",
                            color: confirmed ? "var(--green)" : "var(--body)",
                            cursor: "pointer",
                            fontFamily: "var(--font-sans)",
                            fontSize: 13,
                            transition: "all 0.15s",
                            fontWeight: 300,
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 7 Apply update */}
          {confirmedPattern && phase < 3 && (
            <>
              <div style={{ height: 1, background: "var(--border-light)", margin: "30px 0" }} />
              <div style={{ border: "1px solid var(--ink)", borderRadius: 12, padding: "22px 24px", background: "#f1eee7" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, color: "var(--ink)", marginBottom: 12 }}>
                  Apply update to Nico's system
                </div>
                <div style={{ fontSize: 14, color: "var(--ink-mid)", fontWeight: 300, lineHeight: 1.7, marginBottom: 18 }}>
                  This will update:<br />
                  <span style={{ color: "var(--ink)", fontWeight: 400 }}>
                    {branchTransitions.map((b) => b.label).join(" · ")}
                  </span><br />
                  + 3 additional branches
                </div>
                <button
                  onClick={handleApply}
                  style={{
                    minHeight: 44,
                    padding: "0 28px",
                    background: "var(--ink)",
                    color: "var(--cream)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    letterSpacing: "0.02em",
                    borderRadius: 8,
                    transition: "all 0.15s",
                  }}
                >
                  Apply update
                </button>
              </div>
            </>
          )}

          {/* Receipt */}
          {phase >= 3 && (
            <>
              <div style={{ height: 1, background: "var(--border-light)", margin: "30px 0" }} />
              <div style={{ border: "1px solid #b4ceb8", borderRadius: 12, padding: "20px 24px", background: "rgba(53,96,70,0.05)" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, color: "var(--green)", marginBottom: 6 }}>
                  Decision saved.
                </div>
                <div style={{ fontSize: 14, color: "var(--ink-mid)", fontWeight: 300, marginBottom: 14 }}>
                  Nico's system updated · {b.affectedBranches.length} branches · {b.openLoops.length} open loops
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--ink-light)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Open loops</div>
                  {b.openLoops.map((item, i) => (
                    <div key={i} style={{ fontSize: 14, color: "var(--body)", fontWeight: 300, marginBottom: 5, paddingLeft: 16, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, fontSize: 10, color: "var(--ink-faint)" }}>○</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(53,96,70,0.15)" }}>
                  <button
                    onClick={handleNewDecision}
                    style={{
                      minHeight: 40,
                      padding: "0 24px",
                      background: "transparent",
                      color: "var(--ink)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    New decision
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 8 Input dock */}
          <div style={{ marginTop: 36, border: "1px solid var(--border)", borderRadius: 12, background: "var(--surface)" }}>
            <div
              onClick={() => setDockCollapsed(!dockCollapsed)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", cursor: "pointer" }}
            >
              <span style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {dockCollapsed || (thinking && genCount > 0) ? `Decision #${decisionCount} · Input` : "Input"}
              </span>
              {(dockCollapsed || (thinking && genCount > 0)) && (
                <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 400 }} onClick={(e) => { e.stopPropagation(); setDockCollapsed(false); }}>
                  Expand
                </span>
              )}
            </div>

            {dockCollapsed && !thinking && genCount > 0 && (
              <div style={{ padding: "0 20px 14px", fontSize: 14, color: "var(--ink-light)", fontWeight: 300, lineHeight: 1.5 }}>
                {defaultDemoInput.replace(/\s+/g, " ").trim().slice(0, 80) + " … " + defaultDemoInput.replace(/\s+/g, " ").trim().slice(-30)}
              </div>
            )}

            {(!dockCollapsed || thinking || genCount === 0) && (
              <div style={{ padding: "0 20px 18px" }}>
                {thinking ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink-light)", fontSize: 13, fontWeight: 300, fontStyle: "italic" }}>
                    <div style={{ width: 14, height: 14, border: "1.5px solid var(--border)", borderTopColor: "var(--ink-mid)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    <span>Reading against Nico's system…</span>
                  </div>
                ) : (
                  <>
                    <textarea
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontFamily: "var(--font-sans)",
                        fontSize: 15,
                        color: "var(--body)",
                        resize: "none",
                        lineHeight: 1.7,
                        minHeight: 150,
                        fontWeight: 300,
                      }}
                      defaultValue={defaultDemoInput}
                      readOnly
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
                      <button
                        onClick={generate}
                        disabled={thinking}
                        style={{
                          minHeight: 44,
                          padding: "0 26px",
                          background: "var(--ink)",
                          color: "var(--cream)",
                          border: "none",
                          cursor: thinking ? "default" : "pointer",
                          fontFamily: "var(--font-sans)",
                          fontSize: 14,
                          letterSpacing: "0.02em",
                          borderRadius: 8,
                          transition: "all 0.15s",
                          opacity: thinking ? 0.4 : 1,
                        }}
                      >
                        {genCount > 0 ? "Regenerate" : "Generate decision brief"}
                      </button>
                    </div>
                  </>
                )}
                {error && (
                  <div style={{ marginTop: 14, padding: "12px 16px", border: "1px solid var(--red)", borderRadius: 8, color: "var(--red)", fontSize: 13, background: "rgba(168,62,62,0.04)", fontWeight: 300 }}>
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
