
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function PromotionalBannersForm() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Announcement Banner</CardTitle>
          <CardDescription>
            This banner appears at the very top of your storefront.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch id="banner-enabled" defaultChecked />
              <Label htmlFor="banner-enabled">Show banner</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner-text">Banner Text</Label>
              <Input
                id="banner-text"
                defaultValue="Get Extra 5% Off On Prepaid Orders | Code: BOATHEAD"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="banner-link-text">Banner Link Text</Label>
                <Input id="banner-link-text" defaultValue="Shop Now" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="banner-link-href">Banner Link URL</Label>
                <Input id="banner-link-href" defaultValue="/products" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
