'use client';

import { Sidebar } from '@/components/sidebar';
import { ProductList } from '@/components/product-list';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-[#F9FAFB]">
        <div className="p-6">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}
