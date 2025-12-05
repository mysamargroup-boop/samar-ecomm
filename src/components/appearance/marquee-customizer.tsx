
'use client';

import { useFormState, useFormStatus } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '../ui/color-picker';
import { marqueeData as initialMarqueeData } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { updateMarqueeData } from '@/app/actions/appearanceActions';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  );
}

export function MarqueeCustomizer() {
  const { toast } = useToast();

  const [state, formAction] = useFormState(updateMarqueeData, {
    message: '',
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: 'Settings Saved',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="marquee-text">Marquee Text</Label>
        <Input 
          id="marquee-text" 
          name="text"
          defaultValue={initialMarqueeData.text}
        />
        <p className="text-sm text-muted-foreground">
          Use a pipe "|" to separate different messages in the scroll.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <Input name="backgroundColor" defaultValue={initialMarqueeData.backgroundColor} className="hidden" />
          <ColorPicker initialColor={initialMarqueeData.backgroundColor} name="backgroundColor" />
        </div>
        <div className="space-y-2">
          <Label>Text Color</Label>
           <Input name="textColor" defaultValue={initialMarqueeData.textColor} className="hidden" />
          <ColorPicker initialColor={initialMarqueeData.textColor} name="textColor" />
        </div>
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
