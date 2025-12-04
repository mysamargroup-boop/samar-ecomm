
'use client';

import { useState, useMemo, ChangeEvent } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { colord, RgbaColor } from "colord";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

function hslStringToRgba(hsl: string): RgbaColor {
    const [h, s, l] = hsl.split(' ').map(s => parseFloat(s.replace('%', '')));
    return colord({ h, s, l }).toRgb();
}

function rgbaToRgbaString(rgba: RgbaColor): string {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

export function ColorPicker({ initialColor }: { initialColor: string }) {
    const [rgbaColor, setRgbaColor] = useState(() => hslStringToRgba(initialColor));

    const handleRgbaStringChange = (newRgbaColorString: string) => {
        setRgbaColor(colord(newRgbaColorString).toRgb());
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, component: 'r' | 'g' | 'b' | 'a') => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            let clampedValue = Math.max(0, Math.min(component === 'a' ? 1 : 255, value));
             if (component === 'a') {
                clampedValue = Math.max(0, Math.min(1, parseFloat(e.target.value)));
            }
            setRgbaColor(prev => ({ ...prev, [component]: clampedValue }));
        }
    }
    
    const rgbaString = useMemo(() => rgbaToRgbaString(rgbaColor), [rgbaColor]);

    return (
         <div className="flex items-end gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-10 h-10 rounded-md border p-0 flex-shrink-0">
                        <div className="w-full h-full rounded-md" style={{backgroundColor: rgbaString}}></div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                   <RgbaStringColorPicker color={rgbaString} onChange={handleRgbaStringChange} />
                </PopoverContent>
            </Popover>
            <div className="grid grid-cols-4 gap-2 w-full">
                <div className="space-y-1">
                    <Label htmlFor="r" className="text-xs">R</Label>
                    <Input id="r" type="number" value={rgbaColor.r} onChange={(e) => handleInputChange(e, 'r')} className="h-8 text-center"/>
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="g" className="text-xs">G</Label>
                    <Input id="g" type="number" value={rgbaColor.g} onChange={(e) => handleInputChange(e, 'g')} className="h-8 text-center"/>
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="b" className="text-xs">B</Label>
                    <Input id="b" type="number" value={rgbaColor.b} onChange={(e) => handleInputChange(e, 'b')} className="h-8 text-center"/>
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="a" className="text-xs">A</Label>
                    <Input id="a" type="number" step="0.1" value={rgbaColor.a} onChange={(e) => handleInputChange(e, 'a')} className="h-8 text-center"/>
                </div>
            </div>
        </div>
    )
}
