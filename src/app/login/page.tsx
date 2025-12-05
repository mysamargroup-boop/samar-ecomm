'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

// This flag will be true if the WhatsApp environment variables are NOT set.
const isDemoMode = !process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN || !process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const phone = formData.get('phone') as string;

     if (!phone) {
      toast({
        title: "Phone number is required",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // In a real app, you would call the server to send an OTP via WhatsApp.
    // For this demo, we'll just navigate to the verification page.
    if (isDemoMode) {
      console.log("Running in Demo Mode. Redirecting to verification page.");
    } else {
      console.log("Running in Live Mode. (API call to be implemented)");
    }

    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to ${phone}.`,
    });
    router.push(`/login/verify?phone=${phone}`);

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary text-primary-foreground p-3 rounded-full w-fit">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-headline">Login or Sign Up</CardTitle>
          <CardDescription>
            {isDemoMode
              ? "Enter your phone number to continue. (Demo Mode)"
              : "Enter your phone number to receive a one-time password via WhatsApp."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 12345 67890"
                required
              />
            </div>
            <Button type="submit" className="w-full" isLoading={loading}>
              Send Code
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
