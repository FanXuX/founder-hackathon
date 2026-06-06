"use client";

import { useEffect, useState } from "react";
import type { BranchId, SystemState } from "@/lib/founder-os/types";

const primaryBranchIds: BranchId[] = ["productWedge", "founderState", "teamOwnership"];
const secondaryBranchIds: BranchId[] = ["customerPilots", "investorNarrative", "patternGuardrails"];

const branchSvgs: Record<string, string> = {
  productWedge: '<polygon points="3,21 12,4 21,21"/>',
  founderState: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',
  teamOwnership: '<circle cx="9" cy="8" r="3"/><circle cx="15" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-6 7-6"/><path d="M15 14c3.9 0 7 2.7 7 6"/>',
  customerPilots: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 2v4M16 2v4"/>',
  investorNarrative: '<path d="M3 3h18v14H3z"/><path d="M7 21h10M12 17v4"/><path d="M7 7h10M7 11h6"/>',
  patternGuardrails: '<path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z"/>',
};

const statusColors: Record<string, string> = {
  "In progress": "var(--green)",
  "Recovery unstable": "var(--amber)",
  Stable: "var(--green)",
  "Pressure high": "var(--amber)",
  "Known risk": "var(--amber)",
  "Bottleneck active": "var(--ink)",
  "No active request": "var(--ink-faint)",
  "Needs test": "var(--amber)",
  Quiet: "var(--ink-faint)",
  "Platform pressure active": "var(--amber)",
  Active: "var(--ink)",
  Strengthened: "var(--ink)",
  Triggered: "var(--ink)",
};

function BranchSvg({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "currentColor", fill: "none", strokeWidth: 1.2, strokeLinejoin: "round", strokeLinecap: "round" }} dangerouslySetInnerHTML={{ __html: branchSvgs[id] || "" }} />
  );
}

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  color: "var(--ink-light)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: 400,
};

export default function FounderSystemTree({
  systemState,
  pulse,
  updated,
}: {
  systemState: SystemState;
  pulse: boolean;
  updated: boolean;
}) {
  const [pulseEffect, setPulseEffect] = useState(false);
  const [openDetail, setOpenDetail] = useState<BranchId | null>(null);

  useEffect(() => {
    if (pulse) {
      setPulseEffect(true);
      const id = setTimeout(() => setPulseEffect(false), 600);
      return () => clearTimeout(id);
    }
  }, [pulse]);

  const b = systemState.branches;

  return (
    <aside
      style={{
        width: "34%",
        minWidth: 300,
        borderRight: "1px solid var(--border-light)",
        overflowY: "auto",
        padding: "36px 28px",
        flexShrink: 0,
        background: "var(--cream)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      {/* Section 01 — Founder */}
      <section style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              overflow: "hidden",
              background: "var(--cream-dark)",
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 88 88" width="100%" height="100%">
              <rect width="88" height="88" fill="#ede9e2" />
              <polygon points="44,10 52,14 58,22 60,32 58,42 52,50 48,54 44,58 40,58 36,54 30,48 28,38 30,26 36,18" fill="#2a2825" />
              <polygon points="36,54 40,58 44,62 48,58 52,54 56,60 62,72 68,88 20,88 26,72 32,60" fill="#2a2825" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, letterSpacing: "-0.01em", lineHeight: 1.2 }}>Nico</div>
            <div style={{ fontSize: 11, color: "var(--ink-mid)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 300 }}>Physical AI Founder</div>
            <div style={{ fontSize: 10, color: "var(--ink-light)", fontWeight: 300, marginTop: 1 }}>Warehouse Robotics · Recovery Layer</div>
          </div>
        </div>
      </section>

      {/* Section 02 — Operating Identity */}
      <section style={{ width: "100%", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 20px" }}>
        <div style={sectionLabel}>Operating Identity</div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, lineHeight: 1.25, margin: "10px 0 12px", letterSpacing: "-0.01em" }}>
          Frontier ambition.<br />Operational discipline.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <span style={{ fontSize: 10, color: "var(--ink-mid)", border: "1px solid var(--border)", borderRadius: 14, padding: "3px 10px", fontWeight: 300 }}>High ownership</span>
          <span style={{ fontSize: 10, color: "var(--ink-mid)", border: "1px solid var(--border)", borderRadius: 14, padding: "3px 10px", fontWeight: 300 }}>Technical intensity</span>
          <span style={{ fontSize: 10, color: "var(--ink-mid)", border: "1px solid var(--border)", borderRadius: 14, padding: "3px 10px", fontWeight: 300 }}>Reality-constrained ambition</span>
        </div>
        <div style={{ textAlign: "right", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, cursor: "pointer" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 13, color: "var(--ink)", letterSpacing: "-0.01em" }}>Target Mode</span>
          <span style={{ color: "var(--ink-light)", fontSize: 13 }}>→</span>
        </div>
      </section>

      {/* Section 03 — Founder System */}
      <section>
        <div style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.14em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
          <span style={{ flex: 1, height: 1, background: "var(--border-light)" }} />
          Founder System
          <span style={{ flex: 1, height: 1, background: "var(--border-light)" }} />
        </div>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", width: "100%" }}>
            {primaryBranchIds.map((id, i) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "32%" }}>
              {i === 1 ? (
                <svg width="40" height="12" viewBox="0 0 40 12" style={{ marginBottom: 4 }}>
                  <line x1="0" y1="6" x2="40" y2="6" stroke="var(--border)" strokeWidth="1" />
                  <line x1="20" y1="0" x2="20" y2="12" stroke="var(--border)" strokeWidth="1" />
                </svg>
              ) : (
                <svg width="40" height="12" viewBox="0 0 40 12" style={{ marginBottom: 4 }}>
                  <line x1={i === 0 ? "20" : "0"} y1="6" x2={i === 0 ? "0" : "20"} y2="6" stroke="var(--border)" strokeWidth="1" />
                  <line x1="20" y1="0" x2="20" y2="6" stroke="var(--border)" strokeWidth="1" />
                  <line x1="20" y1="6" x2="20" y2="12" stroke="var(--border)" strokeWidth="1" />
                </svg>
              )}
              <div style={{ width: 6, height: 6, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--cream)", marginBottom: 6 }} />
              <NodeCard
                id={id}
                detail={b[id]}
                pulsing={pulseEffect}
                updated={updated}
                isOpen={openDetail === id}
                onToggle={() => setOpenDetail(openDetail === id ? null : id)}
              />
            </div>
          ))}
        </div>

        {/* Also affected — shown only after update */}
        {updated && (
          <div style={{ marginTop: 16, padding: "10px 0", borderTop: "1px solid var(--border-light)", fontSize: 10, color: "var(--ink-mid)" }}>
            <span style={{ color: "var(--ink-light)", marginRight: 6 }}>Also affected:</span>
            {secondaryBranchIds.map((id, i) => (
              <span key={id}>
                <span style={{ color: statusColors[b[id].state] || "var(--ink-faint)" }}>●</span>
                <span style={{ margin: "0 3px" }}>{b[id].label}</span>
                <span style={{ color: "var(--ink-light)", marginRight: 4 }}>{b[id].state}</span>
                {i < secondaryBranchIds.length - 1 && <span style={{ color: "var(--border)", marginRight: 4 }}>·</span>}
              </span>
            ))}
          </div>
        )}
      </section>
    </aside>
  );
}

function NodeCard({
  id,
  detail,
  pulsing,
  updated,
  isOpen,
  onToggle,
}: {
  id: BranchId;
  detail: { label: string; state: string; latestSignal?: string; effect?: string; handling?: string };
  pulsing: boolean;
  updated: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const color = statusColors[detail.state] || "var(--ink-faint)";

  return (
    <div
      onClick={onToggle}
      style={{
        width: "100%",
        border: `1px solid ${updated ? "var(--ink)" : "var(--border)"}`,
        borderRadius: 10,
        padding: "16px 12px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        background: updated ? "#f2efe8" : "var(--cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {pulsing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 10,
            border: "2px solid var(--ink-mid)",
            opacity: 0,
            animation: "pulseFade 0.6s ease-out",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: "var(--ink-light)" }}>
        <BranchSvg id={id} />
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, marginBottom: 6, lineHeight: 1.2, letterSpacing: "-0.01em", overflowWrap: "break-word", wordBreak: "break-word" }}>
        {detail.label}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 12, color: "var(--ink-mid)", fontWeight: 300 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span>{detail.state}</span>
      </div>

      {/* Detail drawer on click */}
      <div
        style={{
          display: isOpen ? "block" : "none",
          textAlign: "left",
          padding: "8px 0 0",
          borderTop: "1px solid var(--border-light)",
          marginTop: 8,
          fontSize: 12,
          lineHeight: 1.5,
          color: "var(--ink-mid)",
        }}
      >
        {detail.latestSignal && (
          <>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-light)", marginTop: 6, marginBottom: 2 }}>Signal</div>
            <div>{detail.latestSignal}</div>
          </>
        )}
        {detail.effect && (
          <>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-light)", marginTop: 6, marginBottom: 2 }}>Effect</div>
            <div>{detail.effect}</div>
          </>
        )}
        {detail.handling && (
          <>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-light)", marginTop: 6, marginBottom: 2 }}>Handling</div>
            <div>{detail.handling}</div>
          </>
        )}
      </div>
    </div>
  );
}
