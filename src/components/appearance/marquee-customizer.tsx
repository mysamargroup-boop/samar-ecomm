
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '../ui/color-picker';
import { marqueeData as initialMarqueeData } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function MarqueeCustomizer() {
  const { toast } = useToast();
  const [text, setText] = useState(initialMarqueeData.text);
  const [backgroundColor, setBackgroundColor] = useState(initialMarqueeData.backgroundColor);
  const [textColor, setTextColor] = useState(initialMarqueeData.textColor);

  const handleSave = () => {
    // In a real app, this would save to a database.
    console.log('Saving marquee data:', { text, backgroundColor, textColor });
    toast({
      title: 'Settings Saved',
      description: 'Your marquee settings have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="marquee-text">Marquee Text</Label>
        <Input 
          id="marquee-text" 
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Use a pipe "|" to separate different messages in the scroll.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Background Color</Label>
          <ColorPicker initialColor={backgroundColor} name="backgroundColor" />
        </div>
        <div className="space-y-2">
          <Label>Text Color</Label>
          <ColorPicker initialColor={textColor} name="textColor" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
