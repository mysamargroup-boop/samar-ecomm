
'use client';

import { useState, useMemo, ChangeEvent, useEffect } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { colord, RgbaColor } from "colord";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

function cssVarToRgba(cssVar: string): RgbaColor {
    if (typeof window === 'undefined') {
        return { r: 0, g: 0, b: 0, a: 1 };
    }
    const computedStyle = getComputedStyle(document.documentElement);
    const hslString = computedStyle.getPropertyValue(cssVar.match(/--[a-zA-Z-]+/)?.[0] || '').trim();
    if (!hslString) {
        return { r: 0, g: 0, b: 0, a: 1 };
    }
    const [h, s, l] = hslString.split(' ').map(s => parseFloat(s.replace('%', '')));
    return colord({ h, s, l }).toRgb();
}


function rgbaToRgbaString(rgba: RgbaColor): string {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

export function ColorPicker({ initialColor, name }: { initialColor: string, name: string }) {
    const [hiddenInputColor, setHiddenInputColor] = useState(initialColor);

    const [rgbaColor, setRgbaColor] = useState(() => {
        if(initialColor.startsWith('var(--')) {
            return cssVarToRgba(initialColor);
        }
        const [h, s, l] = initialColor.split(' ').map(s => parseFloat(s.replace('%', '')));
        return colord({ h, s, l }).toRgb();
    });

    const handleColorUpdate = (newColor: RgbaColor) => {
        setRgbaColor(newColor);
        const newHsl = colord(newColor).toHsl();
        setHiddenInputColor(`${newHsl.h} ${newHsl.s}% ${newHsl.l}%`);
    };

    const handleRgbaStringChange = (newRgbaColorString: string) => {
        handleColorUpdate(colord(newRgbaColorString).toRgb());
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, component: 'r' | 'g' | 'b' | 'a') => {
        const value = e.target.value;
        let newRgba = { ...rgbaColor };
        
        if (component === 'a') {
            const parsedValue = parseFloat(value);
            if (!isNaN(parsedValue)) {
                newRgba.a = Math.max(0, Math.min(1, parsedValue));
            }
        } else {
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
                newRgba[component] = Math.max(0, Math.min(255, parsedValue));
            }
        }
        handleColorUpdate(newRgba);
    }
    
    const rgbaString = useMemo(() => rgbaToRgbaString(rgbaColor), [rgbaColor]);

    return (
         <div className="flex items-end gap-2">
            <input type="hidden" name={name} value={hiddenInputColor} />
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
                    <Label htmlFor="r" className="text-xs text-center block">R</Label>
                    <Input id="r" type="number" value={rgbaColor.r} onChange={(e) => handleInputChange(e, 'r')} className="h-8 text-center"/>
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="g" className="text-xs text-center block">G</Label>
                    <Input id="g" type="number" value={rgbaColor.g} onChange={(e) => handleInputChange(e, 'g')} className="h-8 text-center"/>
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="b" className="text-xs text-center block">B</Label>
                    <Input id="b" type="number" value={rgbaColor.b} onChange={(e) => handleInputChange(e, 'b')} className="h-8 text-center"/>
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="a" className="text-xs text-center block">A</Label>
                    <Input id="a" type="number" step="0.1" value={rgbaColor.a} onChange={(e) => handleInputChange(e, 'a')} className="h-8 text-center"/>
                </div>
            </div>
        </div>
    )
}
