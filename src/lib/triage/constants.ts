import type { Priority, SignalCategory, TriageGroup } from "./types";

export const categoryStyles: Record<SignalCategory, string> = {
  Product: "bg-blue-100 text-blue-900 border-blue-200",
  Market: "bg-purple-100 text-purple-900 border-purple-200",
  Investor: "bg-emerald-100 text-emerald-900 border-emerald-200",
  Team: "bg-pink-100 text-pink-900 border-pink-200",
  Execution: "bg-stone-200 text-stone-950 border-stone-300",
  "Founder State": "bg-orange-100 text-orange-950 border-orange-200",
};

export const priorityLabels: Record<Priority, string> = {
  act_now: "Act Now",
  monitor: "Monitor",
  defer: "Defer",
  ignore: "Ignore",
};

export const priorityStyles: Record<Priority, string> = {
  act_now: "bg-red-500 text-white",
  monitor: "bg-yellow-300 text-stone-950",
  defer: "bg-stone-800 text-white",
  ignore: "bg-stone-200 text-stone-700",
};

export const triageGroups: TriageGroup[] = [
  {
    label: "Act Now",
    description: "Evidence that should become work today.",
    priorities: ["act_now"],
  },
  {
    label: "Monitor",
    description: "Real signals that need awareness, not strategic reset.",
    priorities: ["monitor"],
  },
  {
    label: "Defer",
    description: "Signals to revisit after shipping pressure drops.",
    priorities: ["defer", "ignore"],
  },
];
