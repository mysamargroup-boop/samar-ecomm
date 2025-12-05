
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const isDemoMode = !process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN || !process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID;

export default function WhatsappPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: 'Message Sent (Simulated)',
            description: 'In a real application, this would send a WhatsApp message.',
        });
    }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center md:text-left">WhatsApp Messenger</h1>
      
      {isDemoMode && (
          <Alert>
              <Terminal className="h-4 w-4"/>
              <AlertTitle>Demo Mode Active</AlertTitle>
              <AlertDescription>
                  WhatsApp credentials are not set in the environment variables. The app is running in demo mode. Messages will be simulated.
              </AlertDescription>
          </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Send Broadcast Message</CardTitle>
          <CardDescription>
            Send a message to all customers who have opted-in for notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={6}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Send Message</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
