
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Send, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { customers as allCustomers } from '@/lib/placeholder-data';
import { ScrollArea } from '@/components/ui/scroll-area';

const isDemoMode = !process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN || !process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID;

const messageTemplates = [
  { id: 'promo_1', name: '20% Off Weekend Sale', content: 'Hi {customer_name}, our weekend sale is live! Get 20% off on all items. Shop now: {store_url}' },
  { id: 'new_arrival', name: 'New Arrivals Alert', content: 'Hello {customer_name}! Fresh styles have just landed. Check out our new arrivals: {store_url}/new' },
  { id: 'abandoned_cart', name: 'Cart Reminder', content: 'Hey {customer_name}, you left some items in your cart. Complete your purchase before they\'re gone! {cart_url}' },
  { id: 'shipping_update', name: 'Order Shipped', content: 'Good news, {customer_name}! Your order #{order_id} has been shipped. Track it here: {tracking_url}' },
];

export default function WhatsappPage() {
  const { toast } = useToast();
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(new Set(allCustomers.map(c => c.id)));
    } else {
      setSelectedCustomers(new Set());
    }
  };

  const handleSelectCustomer = (customerId: string, checked: boolean) => {
    setSelectedCustomers(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(customerId);
      } else {
        newSet.delete(customerId);
      }
      return newSet;
    });
  };

  const handleSend = () => {
    if (selectedCustomers.size === 0) {
      toast({ title: 'No customers selected', description: 'Please select at least one customer.', variant: 'destructive' });
      return;
    }
    if (!selectedTemplate) {
      toast({ title: 'No template selected', description: 'Please choose a message template.', variant: 'destructive' });
      return;
    }
    
    toast({
      title: 'Message Sent (Simulated)',
      description: `Sent "${messageTemplates.find(t => t.id === selectedTemplate)?.name}" to ${selectedCustomers.size} customer(s).`,
    });
    setSelectedCustomers(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">WhatsApp Marketing</h1>
      </div>
      
      {isDemoMode && (
        <Alert>
          <Terminal className="h-4 w-4"/>
          <AlertTitle>Demo Mode Active</AlertTitle>
          <AlertDescription>
            WhatsApp credentials are not set in the environment variables. The app is running in demo mode. Messages will be simulated.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select Customers</CardTitle>
            <CardDescription>Choose which customers will receive the message.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead padding="checkbox">
                      <Checkbox
                        checked={selectedCustomers.size > 0 && selectedCustomers.size === allCustomers.length}
                        indeterminate={selectedCustomers.size > 0 && selectedCustomers.size < allCustomers.length}
                        onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomers.has(customer.id)}
                          onCheckedChange={(checked) => handleSelectCustomer(customer.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>Select a template and send it to the selected customers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="template-select" className="text-sm font-medium">Message Template</label>
              <Select onValueChange={setSelectedTemplate} value={selectedTemplate}>
                <SelectTrigger id="template-select">
                  <SelectValue placeholder="Choose a Meta approved template..." />
                </SelectTrigger>
                <SelectContent>
                  {messageTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedTemplate && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <h4 className="font-semibold text-sm">Template Preview:</h4>
                <p className="text-sm text-muted-foreground italic">
                  {messageTemplates.find(t => t.id === selectedTemplate)?.content}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
             <Button onClick={handleSend} disabled={selectedCustomers.size === 0 || !selectedTemplate}>
              <Send className="mr-2 h-4 w-4" />
              Send to {selectedCustomers.size} Customer(s)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
