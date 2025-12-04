

'use client';

import { useState } from "react";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

export function ColorPicker({ initialColor }: { initialColor: string }) {
    const [color, setColor] = useState(initialColor);
    const [h, s, l] = color.split(' ').map(c => c.replace('%', ''));

    const handleColorChange = (part: 'h' | 's' | 'l', value: string) => {
        const newH = part === 'h' ? value : h;
        const newS = part === 's' ? value : s;
        const newL = part === 'l' ? value : l;
        setColor(`${newH} ${newS}% ${newL}%`);
    }

    return (
         <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-10 h-10 rounded-md border p-0">
                        <div className="w-full h-full rounded-md" style={{backgroundColor: `hsl(${color})`}}></div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    <div className="grid grid-cols-3 gap-2">
                        <Input value={h} onChange={e => handleColorChange('h', e.target.value)} placeholder="H"/>
                        <Input value={s} onChange={e => handleColorChange('s', e.target.value)} placeholder="S"/>
                        <Input value={l} onChange={e => handleColorChange('l', e.target.value)} placeholder="L"/>
                    </div>
                </PopoverContent>
            </Popover>
            <Input value={color} readOnly className="font-mono"/>
        </div>
    )
}
