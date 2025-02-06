import { Box, Scissors, Heart, FileText, Settings } from 'lucide-react';
import { LucideIcon } from 'lucide-react'; // Add this import
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarItem {
  icon: LucideIcon;
  href: string;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Box, href: '/', label: 'Materials' },
  { icon: Scissors, href: '/tools', label: 'Tools' },
  { icon: Heart, href: '/favorites', label: 'Favorites' },
  { icon: FileText, href: '/orders', label: 'Orders' },
  { icon: Settings, href: '/settings', label: 'Settings' },
];

export function Sidebar() {
  return (
    <div className="w-16 min-h-screen border-r bg-white">
      <div className="flex flex-col items-center gap-6 py-4">
        {sidebarItems.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'p-2 rounded-lg hover:bg-gray-100 transition-colors',
                item.href === '/' && 'bg-gray-100'
              )}
            >
              <Icon className="w-6 h-6 text-gray-600" />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
