import React from "react";

interface UserAvatarIconProps {
  className?: string;
}

export default function UserAvatarIcon({
  className = "h-7 w-7",
}: UserAvatarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12z" />
      <path d="M4 20.25c0-3.728 3.58-6.75 8-6.75s8 3.022 8 6.75a.75.75 0 0 1-.75.75H4.75a.75.75 0 0 1-.75-.75z" />
    </svg>
  );
}
