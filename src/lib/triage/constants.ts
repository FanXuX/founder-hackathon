import type { Priority, SignalCategory, TriageGroup } from "./types";

export const categoryStyles: Record<SignalCategory, string> = {
  Product: "bg-blue-50 text-blue-700 border-blue-100",
  Market: "bg-violet-50 text-violet-700 border-violet-100",
  Investor: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Team: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
  Execution: "bg-slate-100 text-slate-700 border-slate-200",
  "Founder State": "bg-amber-50 text-amber-700 border-amber-100",
};

export const priorityLabels: Record<Priority, string> = {
  act_now: "Act Now",
  monitor: "Monitor",
  defer: "Defer",
  ignore: "Ignore",
};

export const priorityStyles: Record<Priority, string> = {
  act_now: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  monitor: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  defer: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  ignore: "bg-slate-50 text-slate-500 ring-1 ring-slate-200",
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
