
'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ColorPicker } from "../ui/color-picker";

export function ThemeCustomizer() {

    const fonts = [
        { name: 'Manrope', value: 'var(--font-manrope)' },
        { name: 'Inter', value: 'var(--font-inter)' },
        { name: 'Roboto', value: 'var(--font-roboto)' },
    ]
  return (
    <form className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Colors</h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <ColorPicker initialColor="231 48% 48%" />
                </div>
                 <div className="space-y-2">
                    <Label>Background Color</Label>
                    <ColorPicker initialColor="220 13% 96%" />
                </div>
                 <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <ColorPicker initialColor="0 59% 45%" />
                </div>
            </div>
        </div>
         <div className="space-y-6">
            <h3 className="text-lg font-medium">Fonts</h3>
            <div className="space-y-4">
               <div className="space-y-2">
                 <Label>Headline Font</Label>
                 <Select defaultValue="var(--font-manrope)">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                        {fonts.map(font => (
                            <SelectItem key={font.value} value={font.value}>
                                <span style={{fontFamily: font.value}}>{font.name}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                 </Select>
               </div>
                <div className="space-y-2">
                 <Label>Body Font</Label>
                 <Select defaultValue="var(--font-manrope)">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                        {fonts.map(font => (
                            <SelectItem key={font.value} value={font.value}>
                                <span style={{fontFamily: font.value}}>{font.name}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                 </Select>
               </div>
            </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
