
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ShieldCheck, Receipt, Truck, Replace } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialInfoItems = [
    {
        icon: 'ShieldCheck',
        text: '12+3 Months Warranty',
    },
    {
        icon: 'Receipt',
        text: 'GST Billing',
    },
    {
        icon: 'Truck',
        text: 'Free Express Delivery',
    },
    {
        icon: 'Replace',
        text: '7-Day Replacement',
    }
];

const iconMap = {
    ShieldCheck,
    Receipt,
    Truck,
    Replace,
    ...LucideIcons
} as const;

type IconName = keyof typeof iconMap;


export function InfoBarCustomizer() {
  const [items, setItems] = useState(initialInfoItems);
  const { toast } = useToast();

  const handleSave = () => {
    console.log('Saving info bar items:', items);
    toast({
        title: 'Settings Saved',
        description: 'Your info bar has been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        {items.map((item, index) => {
           const IconComponent = iconMap[item.icon as IconName] || ShieldCheck;
           return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>
                <div className="flex items-center gap-4">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span>{item.text}</span>
                </div>
                </AccordionTrigger>
                <AccordionContent>
                <div className="space-y-4 p-4 border rounded-md">
                    <div className="space-y-2">
                        <Label htmlFor={`text-${index}`}>Text</Label>
                        <Input id={`text-${index}`} defaultValue={item.text} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor={`icon-${index}`}>Icon Name</Label>
                        <Input id={`icon-${index}`} defaultValue={item.icon} />
                        <p className="text-xs text-muted-foreground">
                            Use any icon name from the{' '}
                            <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">
                                Lucide icon library
                            </a>
                            .
                        </p>
                    </div>
                </div>
                </AccordionContent>
            </AccordionItem>
           )
        })}
      </Accordion>
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
