'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TShirtIconProps {
  color: 'red' | 'black' | 'white' | 'green' | 'blue';
  className?: string;
}

export default function TShirtIcon({ color, className }: TShirtIconProps) {
  const imagePath = {
    red: '/t-shirts/redshirt.png',
    black: '/t-shirts/blackshirt.png',
    white: '/t-shirts/whiteshirt.png',
    green: '/t-shirts/greenshirt.png',
    blue: '/t-shirts/blueshirt.png',
  }[color];

  return (
    <div
      className={cn(
        'w-10 h-10 flex items-center justify-center rounded-md',
        className
      )}
    >
      <Image
        src={imagePath}
        alt={`${color} t-shirt`}
        width={32}
        height={32}
        className="object-contain"
      />
    </div>
  );
}
