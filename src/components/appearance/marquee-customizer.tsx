
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialText = "Build Your Winter Shield, Naturally! Claim 15% OFF with WIN15 | 18% OFF only for Members";

export function MarqueeCustomizer() {
  const [text, setText] = useState(initialText);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="marquee-text">Marquee Text</Label>
        <Input 
          id="marquee-text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <p className="text-sm text-muted-foreground">
          Use a pipe "|" to separate different messages in the scroll.
        </p>
      </div>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
