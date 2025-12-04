
'use client';

import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUser, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Address, AddressSchema } from '@/lib/types';
import { Combobox } from '../ui/combobox';

type AddressFormProps = {
  address: Address | undefined;
  onSave: () => void;
};

// Sample data for comboboxes
const countries = [
  { label: 'India', value: 'India' },
  { label: 'United States', value: 'United States' },
  { label: 'Canada', value: 'Canada' },
  { label: 'United Kingdom', value: 'United Kingdom' },
];

const statesByCountry: { [key: string]: { label: string; value: string }[] } = {
  India: [
    { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Karnataka', value: 'Karnataka' },
  ],
  'United States': [
    { label: 'California', value: 'California' },
    { label: 'New York', value: 'New York' },
    { label: 'Texas', value: 'Texas' },
  ],
  Canada: [
    { label: 'Ontario', value: 'Ontario' },
    { label: 'Quebec', value: 'Quebec' },
    { label: 'British Columbia', value: 'British Columbia' },
  ],
};

const citiesByState: { [key: string]: { label: string; value: string }[] } = {
    'Madhya Pradesh': [
        { label: 'Sagar', value: 'Sagar' },
        { label: 'Bhopal', value: 'Bhopal' },
        { label: 'Indore', value: 'Indore' },
    ],
    'California': [
        { label: 'Los Angeles', value: 'Los Angeles' },
        { label: 'San Francisco', value: 'San Francisco' },
        { label: 'San Diego', value: 'San Diego' },
    ],
    'Ontario': [
        { label: 'Toronto', value: 'Toronto' },
        { label: 'Ottawa', value: 'Ottawa' },
        { label: 'Mississauga', value: 'Mississauga' },
    ]
}


export function AddressForm({ address, onSave }: AddressFormProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      street: address?.street || '',
      city: address?.city || '',
      state: address?.state || '',
      zip: address?.zip || '',
      country: address?.country || 'India',
    },
  });

  const { isSubmitting } = useFormState({ control: form.control });
  const selectedCountry = form.watch('country');
  const selectedState = form.watch('state');

  async function onSubmit(values: z.infer<typeof AddressSchema>) {
    if (!user) {
      toast({
        title: 'Not Authenticated',
        description: 'You must be logged in to update your address.',
        variant: 'destructive',
      });
      return;
    }

    setDocumentNonBlocking(
      doc(firestore, 'customers', user.uid),
      { shippingAddress: values },
      { merge: true }
    );
    
    toast({
      title: 'Address Updated',
      description: 'Your address has been successfully saved.',
    });
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Combobox
                  options={countries}
                  value={field.value}
                  onChange={(value) => {
                      field.onChange(value);
                      form.setValue('state', ''); // Reset state
                      form.setValue('city', ''); // Reset city
                  }}
                  placeholder="Select a country..."
                  emptyMessage="No country found."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Combobox
                  options={statesByCountry[selectedCountry] || []}
                  value={field.value}
                   onChange={(value) => {
                      field.onChange(value);
                      form.setValue('city', ''); // Reset city
                  }}
                  placeholder="Select a state..."
                  emptyMessage="No state found."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                 <Combobox
                  options={citiesByState[selectedState] || []}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a city..."
                  emptyMessage="No city found."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="123 Main St"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. 470002" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onSave}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Address
          </Button>
        </div>
      </form>
    </Form>
  );
}
