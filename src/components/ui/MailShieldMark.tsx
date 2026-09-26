import React from 'react';

interface MailShieldMarkProps {
  className?: string;
  size?: number;
}

export const MailShieldMark: React.FC<MailShieldMarkProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Shield shape */}
      <path
        d="M16 3L5 7.5V15.5C5 22.5 9.7 28.3 16 30C22.3 28.3 27 22.5 27 15.5V7.5L16 3Z"
        className="fill-blue-600 dark:fill-blue-500"
      />
      {/* Inner Shield highlight */}
      <path
        d="M16 5.2L7 9V15.5C7 21.2 10.8 26.1 16 27.7V5.2Z"
        fill="white"
        fillOpacity="0.15"
      />
      {/* Mail Envelope SVG embedded inside Shield */}
      <path
        d="M10 12H22C22.55 12 23 12.45 23 13V20C23 20.55 22.55 21 22 21H10C9.45 21 9 20.55 9 20V13C9 12.45 9.45 12 10 12Z"
        fill="white"
      />
      {/* Envelope Flap Lines */}
      <path
        d="M9.5 12.5L16 17L22.5 12.5"
        stroke="#1E40AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
