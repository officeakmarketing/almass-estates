import React from "react";

export default function ConfidenceScore({ score }) {
  if (score === null || score === undefined) return null;

  // Determine color and label based on score
  let colorClass = "text-green-400 bg-green-400/10 border-green-400/20";
  let label = "High";

  if (score < 40) {
    colorClass = "text-red-400 bg-red-400/10 border-red-400/20";
    label = "Low";
  } else if (score < 70) {
    colorClass = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    label = "Medium";
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-2 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 ${colorClass}`}
    >
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
          Confidence
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold">{score}</span>
          <span className="text-sm font-medium opacity-80">%</span>
        </div>
      </div>
      <div className="h-8 w-[1px] bg-current opacity-20 mx-1"></div>
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </div>
  );
}
