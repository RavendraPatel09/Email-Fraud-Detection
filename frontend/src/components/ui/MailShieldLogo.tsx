import React from 'react';
import { MailShieldMark } from './MailShieldMark';

interface MailShieldLogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MailShieldLogo: React.FC<MailShieldLogoProps> = ({
  showTagline = true,
  size = 'md',
  className = ''
}) => {
  const markSizes = {
    sm: 26,
    md: 32,
    lg: 40
  }[size];

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <MailShieldMark size={markSizes} />
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-slate-900 dark:text-white ${textSizes} leading-none font-sans`}>
          MailShield
        </span>
        {showTagline && (
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans tracking-tight mt-0.5 font-medium">
            Secure Every Message.
          </span>
        )}
      </div>
    </div>
  );
};
