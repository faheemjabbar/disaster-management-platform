import React from "react";

const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const spinner = (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-4 border-[#F8D57E] border-t-[#F68B84] rounded-full animate-spin`}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;