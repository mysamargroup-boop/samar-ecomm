import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { reviews } from '@/lib/placeholder-data';
import { ReviewsTable } from '@/components/reviews/reviews-table';

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Manage Reviews</h1>
      <Card>
        <CardHeader>
          <CardTitle>Product Reviews</CardTitle>
          <CardDescription>
            Approve or delete customer-submitted reviews for your products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewsTable reviews={reviews} />
        </CardContent>
      </Card>
    </div>
  );
}
