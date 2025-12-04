
import { ShieldCheck, Receipt, Truck, Replace } from 'lucide-react';

const infoItems = [
    {
        icon: ShieldCheck,
        title: '12+3 Months Warranty',
        description: 'On all products'
    },
    {
        icon: Receipt,
        title: 'GST Billing',
        description: 'Available for all orders'
    },
    {
        icon: Truck,
        title: 'Free Express Delivery',
        description: 'For orders over ₹500'
    },
    {
        icon: Replace,
        title: '7-day Replacement',
        description: 'Easy returns policy'
    }
]

export function InfoBar() {
    return (
        <section className="bg-muted/40 border-y">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-1 md:gap-4 divide-x divide-border">
                    {infoItems.map((item, index) => (
                        <div key={index} className="flex flex-col text-center md:flex-row md:text-left items-center justify-center gap-2 md:gap-4 py-4 md:py-6 px-2">
                            <item.icon className="h-6 w-6 md:h-10 md:w-10 text-primary flex-shrink-0" />
                            <div>
                                <p className="text-xs md:text-base font-semibold">{item.title}</p>
                                <p className="hidden sm:block text-xs md:text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
