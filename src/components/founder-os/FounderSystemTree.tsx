"use client";

import { useEffect, useRef, useState } from "react";
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

const severityColors: Record<string, string> = {
  ok: "var(--green)",
  caution: "var(--amber)",
  warn: "var(--red)",
  active: "var(--ink)",
  neutral: "var(--ink-faint)",
};

const stateColors: Record<string, string> = {
  "In progress": severityColors.ok,
  "Recovery unstable": severityColors.caution,
  Stable: severityColors.ok,
  "Pressure high": severityColors.caution,
  "Known risk": severityColors.caution,
  "Bottleneck active": severityColors.warn,
  "No active request": severityColors.neutral,
  "Needs test": severityColors.neutral,
  Quiet: severityColors.neutral,
  "Platform pressure active": severityColors.caution,
  Active: severityColors.active,
  Strengthened: severityColors.active,
};

function BranchSvg({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: "currentColor", fill: "none", strokeWidth: 1.3, strokeLinejoin: "round", strokeLinecap: "round" }} dangerouslySetInnerHTML={{ __html: branchSvgs[id] || "" }} />
  );
}

export default function FounderSystemTree({
  systemState,
  pulse,
  updated,
  onOpenModal,
}: {
  systemState: SystemState;
  pulse: boolean;
  updated: boolean;
  onOpenModal?: () => void;
}) {
  const [pulsing, setPulsing] = useState(false);
  const [openDetail, setOpenDetail] = useState<BranchId | null>(null);

  useEffect(() => {
    if (pulse) {
      setPulsing(true);
      const id = setTimeout(() => setPulsing(false), 1000);
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
        padding: "30px 26px",
        flexShrink: 0,
        background: "var(--cream)",
        height: "100%",
      }}
    >
      {/* 01 Founder */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--ink-faint)" }}>01</span> Founder
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid var(--border)", overflow: "hidden", background: "var(--cream-dark)", flexShrink: 0 }}>
            <svg viewBox="0 0 88 88" width="100%" height="100%">
              <rect width="88" height="88" fill="#ede9e2" />
              <polygon points="44,10 52,14 58,22 60,32 58,42 52,50 48,54 44,58 40,58 36,54 30,48 28,38 30,26 36,18" fill="#2a2825" />
              <polygon points="36,54 40,58 44,62 48,58 52,54 56,60 62,72 68,88 20,88 26,72 32,60" fill="#2a2825" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, letterSpacing: "-0.01em", lineHeight: 1.1, color: "var(--ink)" }}>Nico</div>
            <div style={{ fontSize: 12, color: "var(--ink-mid)", fontWeight: 400, letterSpacing: "0.04em", marginTop: 3 }}>Physical AI Founder</div>
            <div style={{ fontSize: 12, color: "var(--ink-light)", fontWeight: 300, marginTop: 1 }}>Warehouse Robotics · Recovery Layer</div>
          </div>
        </div>
      </div>

      {/* 02 Operating Identity */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--ink-faint)" }}>02</span> Operating Identity
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", background: "var(--surface)" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 23, lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.01em", color: "var(--ink)" }}>
            Frontier ambition.<br />Operational discipline.
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-light)", fontWeight: 300, letterSpacing: "0.02em", lineHeight: 1.6, marginBottom: 14 }}>
            High ownership · Technical intensity · Reality-constrained ambition
          </div>
          <div onClick={onOpenModal} style={{ fontSize: 13, color: "var(--ink)", cursor: "pointer", fontFamily: "var(--font-serif)", display: "inline-flex", alignItems: "center", gap: 4 }}>
            Target Mode →
          </div>
        </div>
      </div>

      {/* 03 Founder System */}
      <div>
        <div style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--ink-faint)" }}>03</span> Founder System
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "16.5%", right: "16.5%", height: 1, background: "var(--border)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            {primaryBranchIds.map((id, i) => (
              <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "31%" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--cream)" }} />
                <div style={{ width: 1, height: 14, background: "var(--border)" }} />
                <NodeCard
                  id={id}
                  detail={b[id]}
                  pulsing={pulsing}
                  updated={updated}
                  isOpen={openDetail === id}
                  onToggle={() => setOpenDetail(openDetail === id ? null : id)}
                />
              </div>
            ))}
          </div>
        </div>

        {updated && (
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 11, color: "var(--ink-light)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Also affected</div>
            {secondaryBranchIds.map((id) => (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-mid)", padding: "5px 0", borderBottom: "1px solid var(--border-light)" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: stateColors[b[id].state] || "var(--ink-faint)" }} />
                <span style={{ fontWeight: 400, color: "var(--ink)" }}>{b[id].label}</span>
                <span style={{ color: "var(--ink-light)", fontWeight: 300 }}>· {b[id].state}</span>
              </div>
            ))}
          </div>
        )}
      </div>
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
  const color = stateColors[detail.state] || "var(--ink-faint)";

  return (
    <div
      onClick={onToggle}
      style={{
        width: "100%",
        border: `1px solid ${updated ? "var(--ink)" : "var(--border)"}`,
        borderRadius: 11,
        padding: "12px 8px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        background: updated ? "#f1eee7" : "var(--surface)",
        animation: pulsing ? "pulseOnce 1s ease 1" : "none",
      }}
    >
      <div style={{ width: 30, height: 30, borderRadius: "50%", border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", color: "var(--ink-light)" }}>
        <BranchSvg id={id} />
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 13, color: "var(--ink)", lineHeight: 1.15, marginBottom: 5 }}>
        {detail.label}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 11, color: "var(--ink-mid)", fontWeight: 400 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span>{detail.state}</span>
      </div>

      <div
        style={{
          display: isOpen ? "block" : "none",
          textAlign: "left",
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1px solid var(--border-light)",
          fontSize: 10,
          color: "var(--ink-mid)",
          lineHeight: 1.5,
        }}
      >
        {detail.latestSignal && (
          <>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-light)", marginBottom: 2 }}>Signal</div>
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
