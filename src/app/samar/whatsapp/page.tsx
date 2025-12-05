
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
import { Terminal, Send, CheckCircle, XCircle, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const isDemoMode = !process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN || !process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID;

const messageTemplates = [
  { id: 'order_confirmation', name: 'Order Confirmation' },
  { id: 'shipping_update', name: 'Shipping Update' },
  { id: 'cod_verification', name: 'COD Verification' },
  { id: 'abandoned_cart_1hr', name: 'Abandoned Cart (1hr)' },
  { id: 'abandoned_cart_24hr', name: 'Abandoned Cart (24hr)' },
];

function AutomationRule({ title, description, trigger, templateId, isEnabled, onToggle, onTemplateChange }: any) {
    return (
        <div className="flex items-start justify-between rounded-lg border p-4">
            <div className="space-y-1">
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="flex items-center gap-4 pt-2">
                    <Select defaultValue={templateId} onValueChange={onTemplateChange} disabled={!isEnabled}>
                        <SelectTrigger className="w-full md:w-[250px]">
                            <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                        {messageTemplates.map(template => (
                            <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    {trigger}
                </div>
            </div>
            <Switch checked={isEnabled} onCheckedChange={onToggle} />
        </div>
    )
}

export default function WhatsappPage() {
  const { toast } = useToast();

  const handleTestMessage = (direction: 'incoming' | 'outgoing') => {
      toast({
          title: `Test Message (${direction})`,
          description: `Simulating a test ${direction} message.`,
      })
  }
  
  const [automations, setAutomations] = useState({
      orderConfirmation: { isEnabled: true, templateId: 'order_confirmation' },
      shippingUpdate: { isEnabled: true, templateId: 'shipping_update' },
      codVerification: { isEnabled: false, templateId: 'cod_verification' },
      abandonedCart: { isEnabled: true, templateId: 'abandoned_cart_1hr', trigger: '1hr' },
      lowStockAlert: { isEnabled: true, threshold: 10 }
  });

  const handleAutomationToggle = (key: keyof typeof automations) => {
    setAutomations(prev => ({
        ...prev,
        [key]: { ...prev[key as keyof typeof automations], isEnabled: !prev[key as keyof typeof automations].isEnabled }
    }));
  }

  const handleSaveAutomations = () => {
    // In a real app, you would save these settings to a database.
    console.log('Saving automation settings:', automations);
    toast({
      title: 'Settings Saved',
      description: 'Your WhatsApp automation rules have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">WhatsApp</h1>
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

      <Card>
          <CardHeader>
              <CardTitle>Status & Validation</CardTitle>
              <CardDescription>Check your WhatsApp Business API connection status and send test messages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                      {isDemoMode ? <XCircle className="h-6 w-6 text-destructive"/> : <CheckCircle className="h-6 w-6 text-green-500"/>}
                      <div>
                          <p className="font-semibold">WhatsApp Number</p>
                          <p className="text-sm text-muted-foreground">{isDemoMode ? 'Not Connected' : `+${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID}`}</p>
                      </div>
                  </div>
                  <Badge variant={isDemoMode ? "destructive" : "secondary"} className={!isDemoMode ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' : ''}>
                      {isDemoMode ? 'Not Connected' : 'Connected'}
                  </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                  Last Sync: {new Date().toLocaleString()}
              </div>
          </CardContent>
          <CardFooter className="gap-4">
              <Button variant="outline" onClick={() => handleTestMessage('incoming')}>Incoming Message Test</Button>
              <Button variant="outline" onClick={() => handleTestMessage('outgoing')}>Outgoing Message Test</Button>
          </CardFooter>
      </Card>
      
      <Card>
          <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>Enable automations to send messages to customers based on their actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AutomationRule 
                title="Order Confirmation"
                description="Send a message when a customer places a new order."
                isEnabled={automations.orderConfirmation.isEnabled}
                templateId={automations.orderConfirmation.templateId}
                onToggle={() => handleAutomationToggle('orderConfirmation')}
                onTemplateChange={(value: string) => setAutomations(p => ({...p, orderConfirmation: {...p.orderConfirmation, templateId: value}}))}
            />
             <AutomationRule 
                title="Shipping Update"
                description="Notify customers when their order status changes to 'Shipped'."
                isEnabled={automations.shippingUpdate.isEnabled}
                templateId={automations.shippingUpdate.templateId}
                onToggle={() => handleAutomationToggle('shippingUpdate')}
                onTemplateChange={(value: string) => setAutomations(p => ({...p, shippingUpdate: {...p.shippingUpdate, templateId: value}}))}
            />
             <AutomationRule 
                title="Cash on Delivery Verification"
                description="Send a verification message for COD orders."
                isEnabled={automations.codVerification.isEnabled}
                templateId={automations.codVerification.templateId}
                onToggle={() => handleAutomationToggle('codVerification')}
                onTemplateChange={(value: string) => setAutomations(p => ({...p, codVerification: {...p.codVerification, templateId: value}}))}
            />
             <AutomationRule 
                title="Abandoned Cart Reminder"
                description="Remind customers about items left in their cart."
                isEnabled={automations.abandonedCart.isEnabled}
                templateId={automations.abandonedCart.templateId}
                onToggle={() => handleAutomationToggle('abandonedCart')}
                onTemplateChange={(value: string) => setAutomations(p => ({...p, abandonedCart: {...p.abandonedCart, templateId: value}}))}
                trigger={
                    <Select defaultValue={automations.abandonedCart.trigger} onValueChange={(value) => setAutomations(p => ({...p, abandonedCart: {...p.abandonedCart, trigger: value}}))} disabled={!automations.abandonedCart.isEnabled}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1hr">After 1 hour</SelectItem>
                            <SelectItem value="3hr">After 3 hours</SelectItem>
                            <SelectItem value="24hr">After 24 hours</SelectItem>
                        </SelectContent>
                    </Select>
                }
            />
             <div className="flex items-start justify-between rounded-lg border p-4">
                <div className="space-y-1">
                    <h4 className="font-semibold">Low Stock Alert (For Admin)</h4>
                    <p className="text-sm text-muted-foreground">Receive a notification when product stock falls below a threshold.</p>
                    <div className="flex items-center gap-4 pt-2">
                        <Label htmlFor="low-stock-threshold">Alert when stock is less than:</Label>
                        <Input 
                            id="low-stock-threshold"
                            type="number" 
                            className="w-24" 
                            value={automations.lowStockAlert.threshold}
                            onChange={(e) => setAutomations(p => ({...p, lowStockAlert: {...p.lowStockAlert, threshold: parseInt(e.target.value, 10) || 0}}))}
                            disabled={!automations.lowStockAlert.isEnabled}
                        />
                    </div>
                </div>
                <Switch checked={automations.lowStockAlert.isEnabled} onCheckedChange={() => handleAutomationToggle('lowStockAlert')} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
              <Button onClick={handleSaveAutomations}>
                  <Zap className="mr-2 h-4 w-4"/>
                  Save Automation Rules
              </Button>
          </CardFooter>
      </Card>

    </div>
  );
}
