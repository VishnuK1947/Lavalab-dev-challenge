'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Filter, ArrowUpDown } from 'lucide-react';
import type { Product } from '@/types/inventory';
import TShirtIcon from './t-shirt-icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
  });
  const [sortConfig, setSortConfig] = useState<{
    key: 'name' | 'quantity';
    direction: 'asc' | 'desc';
  } | null>(null);
  const [newProduct, setNewProduct] = useState({
    color: '',
    size: '',
    quantity: 0,
  });
  const [changedProducts, setChangedProducts] = useState<Set<string>>(
    new Set()
  );

  const updateQuantity = (id: string, increment: boolean) => {
    setProducts(
      products.map(product => {
        if (product.id === id) {
          setChangedProducts(prev => new Set(prev).add(id));
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

  const handleAddProduct = () => {
    if (!newProduct.color || !newProduct.size || newProduct.quantity < 0)
      return;

    const color = newProduct.color as
      | 'white'
      | 'red'
      | 'black'
      | 'green'
      | 'blue';
    const id = (products.length + 1).toString();
    const name = `Gildan T-Shirt - ${
      color.charAt(0).toUpperCase() + color.slice(1)
    } / ${newProduct.size}`;

    setProducts([
      ...products,
      {
        id,
        name,
        color,
        size: newProduct.size as 'XS' | 'S' | 'M' | 'L' | 'XL',
        quantity: newProduct.quantity,
      },
    ]);

    setNewProduct({ color: '', size: '', quantity: 0 });
    setIsOpen(false);
  };

  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesColor =
        filters.colors.length === 0 || filters.colors.includes(product.color);
      const matchesSize =
        filters.sizes.length === 0 || filters.sizes.includes(product.size);
      return matchesSearch && matchesColor && matchesSize;
    });
  };

  const sortProducts = (products: Product[]) => {
    if (!sortConfig) return products;

    return [...products].sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      return sortConfig.direction === 'asc'
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    });
  };

  const filteredProducts = sortProducts(filterProducts(products));

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Materials</h1>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">Blanks</span>
          </div>
          <Tabs defaultValue="inventory" className="w-[240px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="queue">Order Queue</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Rest of the ProductList component */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search Materials"
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
                    <div>
                      <Label className="text-xs font-medium">Colors</Label>
                      <div className="mt-2 space-y-2">
                        {['white', 'red', 'black', 'green', 'blue'].map(
                          color => (
                            <div
                              key={color}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`color-${color}`}
                                checked={filters.colors.includes(color)}
                                onCheckedChange={checked => {
                                  setFilters(prev => ({
                                    ...prev,
                                    colors: checked
                                      ? [...prev.colors, color]
                                      : prev.colors.filter(c => c !== color),
                                  }));
                                }}
                              />
                              <Label
                                htmlFor={`color-${color}`}
                                className="capitalize text-sm"
                              >
                                {color}
                              </Label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium">Sizes</Label>
                      <div className="mt-2 space-y-2">
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                          <div
                            key={size}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`size-${size}`}
                              checked={filters.sizes.includes(size)}
                              onCheckedChange={checked => {
                                setFilters(prev => ({
                                  ...prev,
                                  sizes: checked
                                    ? [...prev.sizes, size]
                                    : prev.sizes.filter(s => s !== size),
                                }));
                              }}
                            />
                            <Label htmlFor={`size-${size}`} className="text-sm">
                              {size === 'XS'
                                ? 'Extra Small'
                                : size === 'S'
                                ? 'Small'
                                : size === 'M'
                                ? 'Medium'
                                : size === 'L'
                                ? 'Large'
                                : 'Extra Large'}
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
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-normal"
                      onClick={() =>
                        setSortConfig({
                          key: 'name',
                          direction:
                            sortConfig?.key === 'name' &&
                            sortConfig.direction === 'asc'
                              ? 'desc'
                              : 'asc',
                        })
                      }
                    >
                      Sort by Name{' '}
                      {sortConfig?.key === 'name' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-normal"
                      onClick={() =>
                        setSortConfig({
                          key: 'quantity',
                          direction:
                            sortConfig?.key === 'quantity' &&
                            sortConfig.direction === 'asc'
                              ? 'desc'
                              : 'asc',
                        })
                      }
                    >
                      Sort by Quantity{' '}
                      {sortConfig?.key === 'quantity' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New T-Shirt</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Select
                  onValueChange={value =>
                    setNewProduct(prev => ({ ...prev, color: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={value =>
                    setNewProduct(prev => ({ ...prev, size: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">Extra Small</SelectItem>
                    <SelectItem value="S">Small</SelectItem>
                    <SelectItem value="M">Medium</SelectItem>
                    <SelectItem value="L">Large</SelectItem>
                    <SelectItem value="XL">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  value={newProduct.quantity || ''}
                  onChange={e =>
                    setNewProduct(prev => ({
                      ...prev,
                      quantity: Number.parseInt(e.target.value) || 0,
                    }))
                  }
                />
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleAddProduct}
                  disabled={
                    !newProduct.color ||
                    !newProduct.size ||
                    newProduct.quantity < 0
                  }
                >
                  Add T-Shirt
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <TShirtIcon color={product.color} className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium">{product.name}</span>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-r-none border-r-0"
                  onClick={() => updateQuantity(product.id, false)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div
                  className={cn(
                    'flex flex-col items-center justify-between w-[100px] h-12 border border-gray-200',
                    changedProducts.has(product.id) &&
                      'bg-[#FAF2E3] border-[#C19A4D]'
                  )}
                >
                  <div className="text-lg font-medium leading-none pt-1">
                    {product.quantity}
                  </div>
                  <div className="w-full h-[1px] bg-gray-200" />
                  <div
                    className={cn(
                      'text-xs w-full text-center py-1',
                      changedProducts.has(product.id)
                        ? 'bg-[#C19A4D] text-white'
                        : 'text-gray-500'
                    )}
                  >
                    4 PCS
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-l-none border-l-0"
                  onClick={() => updateQuantity(product.id, true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
