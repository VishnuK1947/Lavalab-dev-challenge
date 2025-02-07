'use client';

import { useState } from 'react';
import { LogOut, Tally5, Shapes, Tag, Blocks } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationItems = [
  {
    icon: <Shapes className="h-4 w-4 shrink-0" />,
    label: 'Materials',
    href: '/',
  },
  {
    icon: <Tag className="h-4 w-4 shrink-0" />,
    label: 'Products',
    href: '/products',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3Z"
          stroke="#808080"
          strokeWidth="1.5"
        />
        <path
          d="M8 7H16"
          stroke="#808080"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 11H16"
          stroke="#808080"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 15H16"
          stroke="#808080"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: 'Fulfillment',
    href: '/fulfillment',
  },
  {
    icon: <Blocks className="h-4 w-4 shrink-0" />,
    label: 'Integrations',
    href: '/integrations',
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        'min-h-screen bg-white border-r flex flex-col transition-all duration-300 ease-in-out',
        isExpanded ? 'w-64' : 'w-16'
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Logo */}
      <div
        className={cn(
          'p-4 flex items-center gap-2',
          isExpanded ? 'justify-start' : 'justify-center'
        )}
      >
        <Tally5 className="h-6 w-6" />
        {isExpanded && (
          <span className="text-xl font-semibold text-indigo-600 transition-opacity duration-300">
            Tally
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        {navigationItems.map((item, index) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors mb-1',
                !isExpanded && 'justify-center',
                item.href === '/' && 'bg-indigo-50 text-indigo-600'
              )}
            >
              <span className="w-4 h-4 shrink-0">{item.icon}</span>
              {isExpanded && (
                <span className="transition-opacity duration-300">
                  {item.label}
                </span>
              )}
            </Link>
            {/* Add divider after Fulfillment (index 2) */}
            {index === 2 && (
              <div className="mx-3 my-2 border-t border-gray-200"></div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className={cn(
          'p-4 border-t',
          !isExpanded && 'flex flex-col items-center'
        )}
      >
        <button
          className={cn(
            'flex items-center gap-2 text-red-600 px-3 py-2 w-full hover:bg-gray-50 rounded-lg transition-colors',
            !isExpanded && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {isExpanded && (
            <span className="transition-opacity duration-300">Logout</span>
          )}
        </button>

        <div
          className={cn(
            'mt-4 flex items-center gap-3 px-3',
            !isExpanded && 'px-0'
          )}
        >
          <img
            src={`${
              process.env.NEXT_PUBLIC_AVATAR_URL ||
              'https://avatar.vercel.sh/rauchg'
            }`}
            alt="Avatar"
            className="w-8 h-8 rounded-full shrink-0"
          />
          {isExpanded && (
            <div className="flex-1 min-w-0 transition-opacity duration-300">
              <div className="truncate font-medium">Don&apos;t Ruin It</div>
              <div className="text-sm text-gray-500">Pro Crafter</div>
            </div>
          )}
          {isExpanded && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2v12M2 8h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}
