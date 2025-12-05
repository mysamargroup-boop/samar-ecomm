
'use client';

import { useState } from 'react';
import { placeholderProducts as allProducts, categories } from '@/lib/placeholder-data';
import { ProductCard } from '@/components/products/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';


function ProductFilters({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  onSaleOnly,
  setOnSaleOnly,
  inStockOnly,
  setInStockOnly,
  clearFilters,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onSaleOnly: boolean;
  setOnSaleOnly: (value: boolean) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  clearFilters: () => void;
}) {

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(
      checked
        ? [...selectedCategories, categoryId]
        : selectedCategories.filter((id) => id !== categoryId)
    );
  };

  const maxPrice = Math.max(...allProducts.map((p) => p.price));

  return (
    <div className="space-y-8">
        {/* Price Filter */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Price</h3>
            <div className="px-1">
                <Slider
                    value={[priceRange[1]]}
                    max={maxPrice}
                    step={100}
                    onValueChange={(value) => setPriceRange([0, value[0]])}
                />
                 <div className="flex justify-between text-sm text-muted-foreground mt-3">
                    <span>{formatPrice(0)}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                </div>
            </div>
        </div>

        <Separator />

        {/* Category Filter */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Category</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, !!checked)}
                  />
                  <label htmlFor={`cat-${category.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
        </div>
        
        <Separator />

        {/* Status Filter */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="in-stock-only" className="cursor-pointer">In Stock Only</Label>
                <Switch 
                  id="in-stock-only" 
                  checked={inStockOnly}
                  onCheckedChange={setInStockOnly}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="on-sale-only" className="cursor-pointer">On Sale Only</Label>
                <Switch 
                  id="on-sale-only"
                  checked={onSaleOnly}
                  onCheckedChange={setOnSaleOnly}
                />
              </div>
            </div>
        </div>

        <Separator />

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );
}

export default function ShopPage() {
  const [sortOption, setSortOption] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const maxPrice = Math.max(...allProducts.map(p => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setOnSaleOnly(false);
    setInStockOnly(false);
  };

  const filteredProducts = allProducts
    .filter((product) => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
        const saleMatch = !onSaleOnly || (product.salePrice && product.salePrice < product.price);
        const stockMatch = !inStockOnly || product.inventory > 0;
        return categoryMatch && priceMatch && saleMatch && stockMatch;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0; // 'newest' or default, assuming data is already sorted by date
      }
    });

  return (
    <div className="container mx-auto px-4 py-12">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
          Shop Now
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground">
          Find your next favorite item from our curated collection.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
                <ProductFilters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onSaleOnly={onSaleOnly}
                setOnSaleOnly={setOnSaleOnly}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                clearFilters={clearFilters}
                />
            </ScrollArea>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">{filteredProducts.length} products</p>
             <div className="flex items-center gap-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="lg:hidden">
                            <ListFilter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                         <SheetHeader className="mb-8">
                            <SheetTitle className="text-2xl">Filters</SheetTitle>
                         </SheetHeader>
                        <ScrollArea className="h-full pr-4">
                            <ProductFilters
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            onSaleOnly={onSaleOnly}
                            setOnSaleOnly={setOnSaleOnly}
                            inStockOnly={inStockOnly}
                            setInStockOnly={setInStockOnly}
                            clearFilters={clearFilters}
                            />
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
                <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Name: A-Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-20 border rounded-lg">
                <h2 className="text-2xl font-semibold">No Products Found</h2>
                <p className="text-muted-foreground mt-2">
                    Try adjusting your filters to find what you're looking for.
                </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
