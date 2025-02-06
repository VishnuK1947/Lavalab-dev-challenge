import type React from 'react';

export interface Product {
  id: string;
  name: string;
  color: 'red' | 'black' | 'white';
  size: 'S' | 'M' | 'L';
  quantity: number;
}

export interface SidebarItem {
  icon: React.ComponentType;
  href: string;
  label: string;
}
