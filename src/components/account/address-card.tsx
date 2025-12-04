
'use client';

import { useState } from 'react';
import type { Address } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { AddressForm } from './address-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type AddressCardProps = {
  title: string;
  address: Address | undefined;
};

export function AddressCard({ title, address }: AddressCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{title}</h3>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Edit Address
            </Button>
          </DialogTrigger>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground border p-4 rounded-md min-h-[100px]">
          {address ? (
            <>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
            </>
          ) : (
            <p>No address set.</p>
          )}
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
          <DialogDescription>
            Update your address details below.
          </DialogDescription>
        </DialogHeader>
        <AddressForm
          address={address}
          onSave={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
