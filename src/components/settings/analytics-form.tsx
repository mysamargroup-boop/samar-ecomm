
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type AnalyticsFormProps = {
  config: {
    googleAnalyticsId: string;
    metaPixelId: string;
    googleSiteVerificationId: string;
    customHeadScript: string;
  };
};

export function AnalyticsForm({ config }: AnalyticsFormProps) {
  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ga-id">Google Analytics ID</Label>
          <Input id="ga-id" defaultValue={config.googleAnalyticsId} placeholder="G-XXXXXXXXXX" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="meta-pixel-id">Meta Pixel ID</Label>
          <Input id="meta-pixel-id" defaultValue={config.metaPixelId} placeholder="Your Pixel ID" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="google-verification-id">Google Site Verification ID</Label>
          <Input id="google-verification-id" defaultValue={config.googleSiteVerificationId} placeholder="Your Google verification code" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="custom-head-script">Custom Head Scripts</Label>
          <Textarea
            id="custom-head-script"
            defaultValue={config.customHeadScript}
            placeholder="<script>...</script> or <meta ... />"
            rows={6}
            className="font-mono text-xs"
          />
           <p className="text-sm text-muted-foreground">
            Add any other tracking codes or meta tags here. They will be injected into the `&lt;head&gt;` of your site.
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
