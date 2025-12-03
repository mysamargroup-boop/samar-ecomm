
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatPrice } from "@/lib/utils"
import { Order } from "@/lib/types"

export function RecentSales({ sales }: { sales: Order[] }) {
  return (
    <div className="space-y-6">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${sale.customerEmail}.png`} alt={sale.customerName} />
            <AvatarFallback>{sale.customerName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customerName}</p>
            <p className="text-sm text-muted-foreground">{sale.customerEmail}</p>
          </div>
          <div className="ml-auto font-medium">{formatPrice(sale.total)}</div>
        </div>
      ))}
    </div>
  )
}
