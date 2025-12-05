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

export default function LoginPage() {
  const router = useRouter();
  const { loginWithOtp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    if (!email) {
      toast({
        title: "Email is required",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await loginWithOtp(email);

    if (error) {
      toast({
        title: "Error sending OTP",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${email}.`,
      });
      router.push(`/login/verify?email=${email}`);
    }
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
            Enter your email to receive a one-time password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full" isLoading={loading}>
              Send OTP
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
