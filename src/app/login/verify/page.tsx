'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Waves } from 'lucide-react';

function VerifyOTPComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would verify the OTP here.
    // We'll just redirect to the admin dashboard on any submission.
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
       <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary text-primary-foreground p-3 rounded-full w-fit">
            <Waves className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-headline">Verify Your Identity</CardTitle>
          <CardDescription>
            An OTP has been sent to {phone}. Please enter it below. (Hint: use 123456)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                placeholder="123456"
                required
                pattern="\d{6}"
              />
            </div>
            <Button type="submit" className="w-full">
              Verify & Login
            </Button>
            <Button variant="link" size="sm" className="w-full" onClick={() => router.back()}>
                Use a different number
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOTPComponent />
        </Suspense>
    )
}
