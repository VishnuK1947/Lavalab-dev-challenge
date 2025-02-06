'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';
import type { Product } from '@/types/inventory';
import { cn } from '@/lib/utils';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Gildan T-Shirt - Red / M',
    color: 'red',
    size: 'M',
    quantity: 13,
  },
  {
    id: '2',
    name: 'Gildan T-Shirt - Red / L',
    color: 'red',
    size: 'L',
    quantity: 46,
  },
  {
    id: '3',
    name: 'Gildan T-Shirt - Black / S',
    color: 'black',
    size: 'S',
    quantity: 21,
  },
  {
    id: '4',
    name: 'Gildan T-Shirt - Black / M',
    color: 'black',
    size: 'M',
    quantity: 34,
  },
  {
    id: '5',
    name: 'Gildan T-Shirt - Black / L',
    color: 'black',
    size: 'L',
    quantity: 27,
  },
  {
    id: '6',
    name: 'Gildan T-Shirt - White / S',
    color: 'white',
    size: 'S',
    quantity: 34,
  },
  {
    id: '7',
    name: 'Gildan T-Shirt - White / M',
    color: 'white',
    size: 'M',
    quantity: 51,
  },
  {
    id: '8',
    name: 'Gildan T-Shirt - White / L',
    color: 'white',
    size: 'L',
    quantity: 29,
  },
];

export function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateQuantity = (id: string, increment: boolean) => {
    setProducts(
      products.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: increment
              ? product.quantity + 1
              : Math.max(0, product.quantity - 1),
          };
        }
        return product;
      })
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search Materials"
            className="w-80"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button variant="outline" size="icon">
            ↑↓
          </Button>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      <div className="space-y-2">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'w-12 h-12 rounded border flex items-center justify-center',
                  product.color === 'red' && 'bg-red-50',
                  product.color === 'black' && 'bg-gray-50',
                  product.color === 'white' && 'bg-gray-50'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8',
                    product.color === 'red' && 'bg-red-500',
                    product.color === 'black' && 'bg-black',
                    product.color === 'white' && 'bg-white border'
                  )}
                />
              </div>
              <span className="font-medium">{product.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, false)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="w-20 text-center">
                <div className="text-lg font-medium">{product.quantity}</div>
                <div className="text-xs text-gray-500">2x PCS</div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, true)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
