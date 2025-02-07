'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, ArrowUpDown } from 'lucide-react';
import TShirtIcon from './t-shirt-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type Order = {
  id: string;
  product: string;
  color: 'white' | 'red' | 'black' | 'green' | 'blue';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  quantity: number;
  status: 'Pending' | 'Processing' | 'Shipped';
};

const initialOrders: Order[] = [
  {
    id: '1',
    product: 'Gildan T-Shirt - Red / M',
    color: 'red',
    size: 'M',
    quantity: 5,
    status: 'Pending',
  },
  {
    id: '2',
    product: 'Gildan T-Shirt - Black / L',
    color: 'black',
    size: 'L',
    quantity: 3,
    status: 'Processing',
  },
  {
    id: '3',
    product: 'Gildan T-Shirt - White / S',
    color: 'white',
    size: 'S',
    quantity: 2,
    status: 'Shipped',
  },
  {
    id: '4',
    product: 'Gildan T-Shirt - Blue / XL',
    color: 'blue',
    size: 'XL',
    quantity: 1,
    status: 'Pending',
  },
];

export function OrderQueue() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    statuses: [] as string[],
  });
  const [sortConfig, setSortConfig] = useState<{
    key: 'product' | 'quantity' | 'status';
    direction: 'asc' | 'desc';
  } | null>(null);

  const filterOrders = (orders: Order[]) => {
    return orders.filter(order => {
      const matchesSearch = order.product
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesColor =
        filters.colors.length === 0 || filters.colors.includes(order.color);
      const matchesSize =
        filters.sizes.length === 0 || filters.sizes.includes(order.size);
      const matchesStatus =
        filters.statuses.length === 0 ||
        filters.statuses.includes(order.status);
      return matchesSearch && matchesColor && matchesSize && matchesStatus;
    });
  };

  const sortOrders = (orders: Order[]) => {
    if (!sortConfig) return orders;

    return [...orders].sort((a, b) => {
      if (sortConfig.key === 'product') {
        return sortConfig.direction === 'asc'
          ? a.product.localeCompare(b.product)
          : b.product.localeCompare(a.product);
      }
      if (sortConfig.key === 'quantity') {
        return sortConfig.direction === 'asc'
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      }
      return sortConfig.direction === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    });
  };

  const filteredOrders = sortOrders(filterOrders(orders));

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search Orders"
            className="w-[320px]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <div className="p-2">
                <div className="space-y-4">
                  {/* ... (keep color and size filters similar to ProductList) */}
                  <div>
                    <Label className="text-xs font-medium">Status</Label>
                    <div className="mt-2 space-y-2">
                      {['Pending', 'Processing', 'Shipped'].map(status => (
                        <div
                          key={status}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`status-${status}`}
                            checked={filters.statuses.includes(status)}
                            onCheckedChange={checked => {
                              setFilters(prev => ({
                                ...prev,
                                statuses: checked
                                  ? [...prev.statuses, status]
                                  : prev.statuses.filter(s => s !== status),
                              }));
                            }}
                          />
                          <Label
                            htmlFor={`status-${status}`}
                            className="text-sm"
                          >
                            {status}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <div className="space-y-1.5">
                  {/* ... (keep sorting options similar to ProductList, but for product, quantity, and status) */}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-2">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                <TShirtIcon color={order.color} className="w-8 h-8" />
              </div>
              <div>
                <span className="text-sm font-medium">{order.product}</span>
                <div className="text-xs text-gray-500">
                  Quantity: {order.quantity}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  order.status === 'Pending' && 'bg-yellow-100 text-yellow-800',
                  order.status === 'Processing' && 'bg-blue-100 text-blue-800',
                  order.status === 'Shipped' && 'bg-green-100 text-green-800'
                )}
              >
                {order.status}
              </span>
              <Button variant="outline" size="sm">
                Update Status
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
