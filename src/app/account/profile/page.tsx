import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Alice" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Johnson" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="alice@example.com" />
            </div>
            <div className="flex justify-end">
                <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address Book</CardTitle>
            <CardDescription>Manage your shipping and billing addresses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-medium">Default Shipping Address</h3>
                 <div className="space-y-2 text-sm text-muted-foreground">
                   <p>123 Commerce Lane</p>
                   <p>Shopsville, IN 12345</p>
                   <p>United States</p>
                </div>
                 <Button variant="outline" size="sm">Edit Address</Button>
            </div>
             <div className="space-y-4">
                <h3 className="font-medium">Default Billing Address</h3>
                 <div className="space-y-2 text-sm text-muted-foreground">
                   <p>123 Commerce Lane</p>
                   <p>Shopsville, IN 12345</p>
                   <p>United States</p>
                </div>
                 <Button variant="outline" size="sm">Edit Address</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
