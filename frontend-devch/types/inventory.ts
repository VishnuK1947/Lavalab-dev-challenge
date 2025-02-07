import type React from 'react';

export type Product = {
  id: string;
  name: string;
  color: 'white' | 'red' | 'black' | 'green' | 'blue';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  quantity: number;
};

export interface SidebarItem {
  icon: React.ComponentType;
  href: string;
  label: string;
}
