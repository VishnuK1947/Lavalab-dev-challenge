'use client';

import { Sidebar } from '@/components/sidebar';
import { ProductList } from '@/components/product-list';

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-[#F9FAFB]">
        <div className="px-20 pb-20 pt-6">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
