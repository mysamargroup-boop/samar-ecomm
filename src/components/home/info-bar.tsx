

import { ShieldCheck, Receipt, Truck, Replace } from 'lucide-react';

const infoItems = [
    {
        icon: ShieldCheck,
        text: '12+3 Months Warranty',
    },
    {
        icon: Receipt,
        text: 'GST Billing',
    },
    {
        icon: Truck,
        text: 'Free Express Delivery',
    },
    {
        icon: Replace,
        text: '7-Day Replacement',
    }
]

export function InfoBar() {
    return (
        <section className="bg-muted/40 border-y">
            <div className="container mx-auto px-4 overflow-x-auto">
                <div className="grid grid-cols-4 gap-1 divide-x divide-border">
                    {infoItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-center gap-2 md:gap-4 py-4 px-2">
                            <item.icon className="h-6 w-6 text-primary flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
