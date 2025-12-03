'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

type SocialLinksFormProps = {
  links: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
};

export function SocialLinksForm({ links }: SocialLinksFormProps) {
  return (
    <form className="space-y-8 max-w-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter</Label>
          <div className="flex items-center gap-2">
             <Twitter className="h-5 w-5 text-muted-foreground" />
             <Input id="twitter" defaultValue={links.twitter} placeholder="https://twitter.com/yourprofile" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <div className="flex items-center gap-2">
             <Facebook className="h-5 w-5 text-muted-foreground" />
            <Input id="facebook" defaultValue={links.facebook} placeholder="https://facebook.com/yourpage" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <div className="flex items-center gap-2">
            <Instagram className="h-5 w-5 text-muted-foreground" />
            <Input id="instagram" defaultValue={links.instagram} placeholder="https://instagram.com/yourprofile" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
           <div className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-muted-foreground" />
            <Input id="linkedin" defaultValue={links.linkedin} placeholder="https://linkedin.com/company/yourcompany" />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
