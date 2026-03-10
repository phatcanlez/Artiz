import React from "react";

export interface SpinnerProps {
  /** Tailwind size class, e.g. "h-4 w-4" */
  sizeClassName?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  sizeClassName = "h-4 w-4",
  className = "",
}) => {
  return (
    <svg
      className={`animate-spin ${sizeClassName} ${className}`}
      viewBox="0 0 24 24"
      aria-label="Loading"
      role="img"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="#44FF00"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-90"
        fill="#44FF00"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};

