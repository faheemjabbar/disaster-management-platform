import React from "react";

const ProgressBar = ({
  current,
  total,
  showLabel = true,
  height = "h-2",
  bgColor = "bg-gray-200",
  fillColor = "bg-gradient-to-r from-[#F8D57E] to-[#F68B84]",
  className = "",
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-2 text-gray-700">
          <span className="font-medium">
            {current} / {total}
          </span>
          <span className="font-bold text-[#E27872]">{percentage}%</span>
        </div>
      )}
      <div className={`w-full ${height} ${bgColor} rounded-full overflow-hidden`}>
        <div
          className={`${height} ${fillColor} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;