

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
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-1 divide-x divide-border -mx-4 md:mx-0">
                    {infoItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-center gap-2 text-center py-4 px-2">
                            <item.icon className="h-8 w-8 text-primary flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-semibold">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
