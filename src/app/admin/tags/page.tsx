
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Tags</h1>
      <Card>
        <CardHeader>
          <CardTitle>Product Tags</CardTitle>
          <CardDescription>
            Manage all product tags used across your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Tag management functionality will be available here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
