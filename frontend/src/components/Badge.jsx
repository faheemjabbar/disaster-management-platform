import React from "react";

const Badge = ({ children, variant = "default", size = "md", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-[#F8D57E] text-[#2F2F2F]",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    accent: "bg-[#F6A6A1] text-white",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;