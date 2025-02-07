import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Inventory Management',
  description: 'Manage your product catalog',
};

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <p className="text-gray-600">
        This is a mock page for managing your product catalog. Here you would
        typically see a list of your products, with options to add, edit, or
        delete products.
      </p>
    </div>
  );
}
