'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type StoreDetailsFormProps = {
  details: {
    name: string;
    tagline: string;
    address: string;
    phone: string;
  };
};

export function StoreDetailsForm({ details }: StoreDetailsFormProps) {
  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="store-name">Store Name</Label>
          <Input id="store-name" defaultValue={details.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-tagline">Tagline</Label>
          <Input id="store-tagline" defaultValue={details.tagline} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-phone">Phone Number</Label>
          <Input id="store-phone" type="tel" defaultValue={details.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-address">Address</Label>
          <Textarea id="store-address" defaultValue={details.address} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
