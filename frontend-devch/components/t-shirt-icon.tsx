'use-client';

import { cn } from '@/lib/utils';

interface TShirtIconProps {
  color: 'red' | 'black' | 'white' | 'green' | 'blue';
  className?: string;
}

export default function TShirtIcon({ color, className }: TShirtIconProps) {
  const fillColor = {
    red: '#EF4444',
    black: '#111827',
    white: '#FFFFFF',
    green: '#10B981',
    blue: '#3B82F6',
  }[color];

  const containerClass = {
    red: 'bg-white',
    black: 'bg-white',
    white: 'bg-black',
    green: 'bg-white',
    blue: 'bg-white',
  }[color];

  return (
    <div
      className={cn(
        'w-10 h-10 flex items-center justify-center rounded-md',
        containerClass,
        className
      )}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M16.2 4L18 6V20H6V6L7.8 4M16.2 4L12 2L7.8 4M16.2 4H7.8"
          stroke="none"
          fill={fillColor}
        />
        <path
          d="M9 4L12 2L15 4M6 6H18M12 2V20"
          stroke={fillColor}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
