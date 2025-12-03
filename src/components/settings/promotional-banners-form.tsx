'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function PromotionalBannersForm() {
  return (
    <form className="space-y-8 max-w-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Top Announcement Banner</h3>
        <div className="flex items-center space-x-2">
            <Switch id="banner-enabled" />
            <Label htmlFor="banner-enabled">Show banner</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="banner-text">Banner Text</Label>
          <Input id="banner-text" defaultValue="Free shipping on orders over 500!" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
