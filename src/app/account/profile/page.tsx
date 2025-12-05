
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { AddressCard } from '@/components/account/address-card';

const ProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

function ProfilePageContent() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'customers', user.uid) : null),
    [firestore, user]
  );
  const { data: customer, isLoading: isCustomerLoading } = useDoc<any>(userDocRef);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phoneNumber: customer.phoneNumber || '',
      });
    } else if (user) {
        form.reset({
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
        });
    }
  }, [customer, user, form]);

  const onSubmit = (data: ProfileFormValues) => {
    if (!user) return;
    const customerData = {
      id: user.uid,
      ...data,
    };
    setDocumentNonBlocking(doc(firestore, 'customers', user.uid), customerData, { merge: true });
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved.',
    });
  };

  if (isUserLoading || isCustomerLoading) {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline text-center">My Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Address Book</CardTitle>
                        <CardDescription>Manage your shipping and billing addresses.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-24 w-full" />
                         <Skeleton className="h-24 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline text-center">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address Book</CardTitle>
            <CardDescription>
              Manage your shipping and billing addresses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AddressCard
              title="Default Shipping Address"
              address={customer?.shippingAddress}
            />
            <AddressCard
              title="Default Billing Address"
              address={customer?.billingAddress}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


export default function ProfilePage() {
    return <ProfilePageContent />;
}

    