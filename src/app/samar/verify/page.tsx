
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from '@/hooks/use-toast';

const SAMAR_AUTH_KEY = 'samar-auth';

function VerifyOTPComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');
  const { toast } = useToast();
  const [otp, setOtp] = useState('');

  const handleComplete = (value: string) => {
    // In a real app, you would verify the OTP here.
    // For this demo, we'll accept a specific OTP for samar access.
    console.log('Verifying Samar OTP:', value);
    if (value === '123456') {
        // Set a session flag to indicate samar is logged in
        sessionStorage.setItem(SAMAR_AUTH_KEY, 'true');

        toast({
            title: 'Samar Login Successful',
            description: 'Redirecting to dashboard...',
        });
        // Use window.location.href to force a full page reload
        // This ensures the layout component correctly reads the new session storage value
        window.location.href = '/samar/dashboard';
    } else {
        toast({
            title: 'Invalid OTP',
            description: 'The code you entered is incorrect.',
            variant: 'destructive',
        });
        setOtp(''); // Reset the OTP input on failure
    }
  };
  
  // This useEffect will now only run on the client, after the component has mounted.
  useEffect(() => {
    if (otp.length === 6) {
        handleComplete(otp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary text-primary-foreground p-3 rounded-full w-fit">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-headline">Verify Samar Access</CardTitle>
          <CardDescription>
            An OTP has been sent to {phone}. Please enter it below. (Hint: use 123456)
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center space-y-6">
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} onComplete={handleComplete}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                
                <Button variant="link" size="sm" className="w-full" onClick={() => router.back()}>
                    Use a different number
                </Button>
            </div>
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
