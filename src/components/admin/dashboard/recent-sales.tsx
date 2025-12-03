
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatPrice } from "@/lib/utils"
import { Order } from "@/lib/types"

export function RecentSales({ sales }: { sales: Order[] }) {
  return (
    <div className="space-y-6">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={`https://avatar.vercel.sh/${sale.customerEmail}.png`} alt={sale.customerName} />
            <AvatarFallback>{sale.customerName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium leading-none truncate">{sale.customerName}</p>
            <p className="text-sm text-muted-foreground truncate">{sale.customerEmail}</p>
          </div>
          <div className="ml-auto font-medium shrink-0">{formatPrice(sale.total)}</div>
        </div>
      ))}
    </div>
  )
}
