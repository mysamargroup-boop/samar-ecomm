
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function PromotionalBannersForm() {
  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Top Announcement Banner</h3>
        <div className="flex items-center space-x-2">
            <Switch id="banner-enabled" defaultChecked/>
            <Label htmlFor="banner-enabled">Show banner</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="banner-text">Banner Text</Label>
          <Input id="banner-text" defaultValue="Get Extra 5% Off On Prepaid Orders | Code: BOATHEAD" />
        </div>
         <div className="space-y-2">
          <Label htmlFor="banner-link-text">Banner Link Text</Label>
          <Input id="banner-link-text" defaultValue="Shop Now" />
        </div>
         <div className="space-y-2">
          <Label htmlFor="banner-link-href">Banner Link Href</Label>
          <Input id="banner-link-href" defaultValue="/products" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
