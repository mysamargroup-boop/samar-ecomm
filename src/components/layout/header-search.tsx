
'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { products } from "@/lib/placeholder-data";
import type { Product } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

function SearchResults({ results, onResultClick }: { results: Product[], onResultClick: () => void }) {
    if (results.length === 0) {
        return <p className="p-4 text-sm text-center text-muted-foreground">No results found.</p>;
    }

    return (
        <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y">
                {results.map(product => (
                    <li key={product.id}>
                        <Link href={`/product/${product.id}`} className="block p-4 hover:bg-muted" onClick={onResultClick}>
                            <div className="flex items-center gap-4">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="rounded-md object-cover"
                                    data-ai-hint="product image"
                                />
                                <div className="flex-1">
                                    <p className="font-medium truncate">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function HeaderSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (query.length > 1) {
            const searchResults = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase()) ||
                p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
            ).slice(0, 10); // Limit to 10 results
            setResults(searchResults);
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setIsOpen(false);
        inputRef.current?.focus();
    }
    
    const handleResultClick = () => {
        setIsOpen(false);
        setQuery('');
    }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
             <form className="relative w-full max-w-md">
                <Input
                    ref={inputRef}
                    type="search"
                    placeholder="Search for products..."
                    className="w-full pr-16 h-10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 1 && setIsOpen(true)}
                />
                 {query && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-8 h-full w-10"
                        aria-label="Clear search"
                        onClick={handleClear}
                    >
                        <X className="h-5 w-5 text-muted-foreground" />
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 h-full w-12"
                    aria-label="Search"
                    onClick={(e) => e.preventDefault()} // Prevent form submission
                >
                    <Search className="h-5 w-5" />
                </Button>
            </form>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
           <SearchResults results={results} onResultClick={handleResultClick} />
        </PopoverContent>
    </Popover>
  );
}
