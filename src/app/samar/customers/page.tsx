
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center md:text-left">Customers</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            View and manage your customer information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Customer management functionality will be available here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
