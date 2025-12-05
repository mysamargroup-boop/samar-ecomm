
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, PlusCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useToast } from "@/hooks/use-toast";

export function RedirectsForm() {
    const [redirects, setRedirects] = useState([
        { from: '/old-product', to: '/new-product' },
        { from: '/promo', to: '/sales/summer-sale' },
    ]);
    const [newRedirect, setNewRedirect] = useState({ from: '', to: '' });
    const { toast } = useToast();

    const addRedirect = () => {
        if (newRedirect.from && newRedirect.to) {
            setRedirects([...redirects, newRedirect]);
            setNewRedirect({ from: '', to: '' });
        }
    }

    const removeRedirect = (index: number) => {
        setRedirects(redirects.filter((_, i) => i !== index));
    }

    const handleSave = () => {
        console.log('Saving redirects:', redirects);
        toast({
            title: 'Settings Saved',
            description: 'Your URL redirects have been updated.',
        });
    };

  return (
    <div className="space-y-6">
        <div className="space-y-4">
            {redirects.map((redirect, index) => (
                <Card key={index}>
                    <CardContent className="flex items-center gap-4 p-4">
                       <Input value={redirect.from} readOnly className="font-mono"/>
                       <ArrowRight className="h-5 w-5 text-muted-foreground" />
                       <Input value={redirect.to} readOnly className="font-mono"/>
                       <Button variant="ghost" size="icon" onClick={() => removeRedirect(index)}>
                           <Trash2 className="h-4 w-4 text-destructive" />
                       </Button>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="flex items-center gap-4 p-4 border rounded-md">
            <Input 
                placeholder="/from-path"
                value={newRedirect.from}
                onChange={(e) => setNewRedirect({ ...newRedirect, from: e.target.value })}
                className="font-mono"
            />
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="/to-path"
                value={newRedirect.to}
                onChange={(e) => setNewRedirect({ ...newRedirect, to: e.target.value })}
                className="font-mono"
            />
            <Button variant="outline" size="icon" onClick={addRedirect}>
                <PlusCircle className="h-4 w-4" />
            </Button>
        </div>

        <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
        </div>
    </div>
  );
}
