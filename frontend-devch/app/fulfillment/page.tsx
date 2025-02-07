import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulfillment | Inventory Management',
  description: 'Manage order fulfillment',
};

export default function FulfillmentPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fulfillment</h1>
      <p className="text-gray-600">
        This is a mock page for managing order fulfillment. Here you would
        typically see a list of orders that need to be fulfilled, with options
        to update order status and manage shipping.
      </p>
    </div>
  );
}
