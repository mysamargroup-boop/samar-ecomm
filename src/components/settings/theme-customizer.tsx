

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
        { name: 'Poppins', value: 'var(--font-poppins)' },
        { name: 'Inter', value: 'var(--font-inter)' },
        { name: 'Roboto', value: 'var(--font-roboto)' },
        { name: 'Manrope', value: 'var(--font-manrope)' },
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
                 <div className="space-y-2">
                    <Label>Buy Now Button (Start)</Label>
                    <ColorPicker initialColor="142 76% 36%" />
                </div>
                 <div className="space-y-2">
                    <Label>Buy Now Button (End)</Label>
                    <ColorPicker initialColor="142 76% 26%" />
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
      <div className="md:hidden h-20"></div>
      <div className="flex justify-end fixed bottom-0 left-0 right-0 md:relative bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none border-t md:border-none p-4 md:p-0">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
