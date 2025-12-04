

'use client';

import { useState, useMemo } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { colord, HslaColor, RgbaColor } from "colord";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Input } from "./input";

function hslStringToRgba(hsl: string): RgbaColor {
    const [h, s, l] = hsl.split(' ').map(parseFloat);
    return colord({ h, s, l }).toRgb();
}

function rgbaToHslString(rgba: RgbaColor): string {
    const { h, s, l } = colord(rgba).toHsl();
    return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;
}

function rgbaToRgbaString(rgba: RgbaColor): string {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

export function ColorPicker({ initialColor }: { initialColor: string }) {
    const [rgbaColor, setRgbaColor] = useState(() => hslStringToRgba(initialColor));

    const handleColorChange = (newRgbaColorString: string) => {
        setRgbaColor(colord(newRgbaColorString).toRgb());
    }
    
    const displayHsl = useMemo(() => rgbaToHslString(rgbaColor), [rgbaColor]);
    const rgbaString = useMemo(() => rgbaToRgbaString(rgbaColor), [rgbaColor]);

    return (
         <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-10 h-10 rounded-md border p-0">
                        <div className="w-full h-full rounded-md" style={{backgroundColor: rgbaString}}></div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                   <RgbaStringColorPicker color={rgbaString} onChange={handleColorChange} />
                </PopoverContent>
            </Popover>
            <Input value={displayHsl} readOnly className="font-mono"/>
        </div>
    )
}
