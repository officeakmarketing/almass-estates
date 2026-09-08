import React from "react";

export default function ConfidenceScore({ score }) {
  if (score === null || score === undefined) return null;

  let colorClass = "text-[#20b858]";
  let label = "High Confidence";

  if (score < 40) {
    colorClass = "text-red-400";
    label = "Low Confidence";
  } else if (score < 70) {
    colorClass = "text-yellow-500";
    label = "Medium Confidence";
  }

  return (
    <div className="flex flex-col pt-3 border-t border-white/5">
      <span className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-1">System Confidence</span>
      <span className={`font-medium text-lg sm:text-xl ${colorClass}`}>
        {label}
      </span>
    </div>
  );
}
