import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "icon";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  buttonType?: "default" | "warning" | "danger";
}

export default function Button({
  children,
  text,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  buttonType = "default",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const getButtonClasses = () => {
    // If buttonType is specified, use it regardless of variant
    if (buttonType !== "default") {
      switch (buttonType) {
        case "warning":
          return "bg-yellow-400 hover:bg-yellow-500 text-white border border-yellow-400 hover:border-yellow-500 focus:ring-yellow-400";
        case "danger":
          return "bg-red-500 hover:bg-red-700 text-white border border-red-500 hover:border-red-700 focus:ring-red-500";
        default:
          return "bg-orange hover:bg-orangeDark text-white border border-orange hover:border-orangeDark focus:ring-orange";
      }
    }

    // Otherwise use variant
    switch (variant) {
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300 hover:border-gray-400 focus:ring-gray-500";
      case "outline":
        return "bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 focus:ring-gray-500";
      case "icon":
        return "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent hover:border-gray-200 focus:ring-gray-500";
      case "primary":
      default:
        return "bg-orange hover:bg-orangeDark text-white border border-orange hover:border-orangeDark focus:ring-orange";
    }
  };

  const classes = `${baseClasses} ${
    sizeClasses[size]
  } ${getButtonClasses()} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
    >
      {isLoading && (
        <AiOutlineLoading3Quarters className="animate-spin mr-2" size={16} />
      )}
      {text && <span>{text}</span>}
      {children}
    </button>
  );
}
