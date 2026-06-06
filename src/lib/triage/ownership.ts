import type { Ownership } from "./types";

export function getActionOwner(action: string, index: number): Ownership {
  const normalized = action.toLowerCase();

  if (normalized.includes("teammate") || normalized.includes("dashboard")) {
    return "Founder";
  }

  if (normalized.includes("follow-up") || normalized.includes("investor")) {
    return "Agent draft / Founder review";
  }

  if (normalized.includes("no roadmap") || normalized.includes("exhausted")) {
    return "System rule";
  }

  return index === 0 ? "Founder" : "Team";
}
