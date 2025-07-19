import React from "react";

interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export default function Button({
  text,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "font-bold rounded focus:outline-none focus:shadow-outline transition-colors duration-200";

  const variantClasses = {
    primary: "bg-orange hover:bg-orangeDark text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    icon: "text-gray-600 hover:text-gray-800 bg-transparent hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-2 px-6 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || isLoading ? "bg-gray cursor-not-allowed text-white" : "";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const displayContent = isLoading ? "Loading..." : text || children;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {displayContent}
    </button>
  );
}
