
'use client';

import { useState } from "react";
import { Input } from "./input";

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
            <div className="w-10 h-10 rounded-md border" style={{backgroundColor: `hsl(${color})`}}></div>
            <div className="grid grid-cols-3 gap-2">
                <Input value={h} onChange={e => handleColorChange('h', e.target.value)} placeholder="H"/>
                <Input value={s} onChange={e => handleColorChange('s', e.target.value)} placeholder="S"/>
                <Input value={l} onChange={e => handleColorChange('l', e.target.value)} placeholder="L"/>
            </div>
        </div>
    )
}
