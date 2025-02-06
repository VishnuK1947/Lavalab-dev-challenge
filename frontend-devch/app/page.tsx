import { Sidebar } from '@/components/sidebar';
import { ProductList } from '@/components/product-list';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <div className="p-6 border-b bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Materials</h1>
              <div className="text-sm text-gray-500">/ Blanks</div>
            </div>
            <Tabs defaultValue="inventory">
              <TabsList>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="queue">Order Queue</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
}
