
'use client';

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { seedDatabaseAction } from "@/app/actions/seedActions";
import { useTransition } from "react";

export function DatabaseSettings() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleSeed = () => {
    startTransition(async () => {
      const result = await seedDatabaseAction();
      if (result.success) {
        toast({
          title: 'Database Seeded',
          description: result.message,
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Database className="h-4 w-4" />
        <AlertTitle>Initial Data Seeding</AlertTitle>
        <AlertDescription>
          Click the button below to populate your database with initial placeholder products and categories. This should only be done once.
        </AlertDescription>
      </Alert>
      <div className="flex justify-end">
        <Button onClick={handleSeed} disabled={isPending}>
          {isPending ? 'Seeding...' : 'Seed Database'}
        </Button>
      </div>
    </div>
  );
}
