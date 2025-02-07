import type { Metadata } from 'next';
import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: 'Integrations | Inventory Management',
  description: 'Manage your integrations',
};

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Integrations</h1>
        <p className="text-gray-600">
          This is a mock page for managing your integrations. Here you would
          typically see a list of available integrations, such as e-commerce
          platforms, shipping providers, or accounting software, with options to
          connect or manage these integrations.
        </p>
      </div>
    </div>
  );
}
