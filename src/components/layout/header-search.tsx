
'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function HeaderSearch() {
  return (
    <form className="relative w-full max-w-md">
      <Input
        type="search"
        placeholder="Search for products..."
        className="w-full pr-12 h-10"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute inset-y-0 right-0 h-full w-12"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
