
'use client';

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MaintenanceModeForm() {
  const { toast } = useToast();

  const handleSave = () => {
    console.log('Saving maintenance mode settings...');
    toast({
        title: 'Settings Saved',
        description: 'Your maintenance mode settings have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Warning!</AlertTitle>
        <AlertDescription>
          Enabling maintenance mode will make your website inaccessible to all visitors.
        </AlertDescription>
      </Alert>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="maintenance-mode" className="text-base">
            Maintenance Mode
          </Label>
          <p className="text-sm text-muted-foreground">
            Toggle your store's availability for visitors.
          </p>
        </div>
        <Switch
          id="maintenance-mode"
          aria-label="Toggle Maintenance Mode"
        />
      </div>
       <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
