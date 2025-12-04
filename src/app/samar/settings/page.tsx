

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StoreDetailsForm } from '@/components/settings/store-details-form';
import { SocialLinksForm } from '@/components/settings/social-links-form';
import { PromotionalBannersForm } from '@/components/settings/promotional-banners-form';
import { MaintenanceModeForm } from '@/components/settings/maintenance-mode-form';
import { AnalyticsForm } from '@/components/settings/analytics-form';
import { RedirectsForm } from '@/components/settings/redirects-form';
import { ThemeCustomizer } from '@/components/settings/theme-customizer';


export default function SettingsPage() {
  // Mock data for the forms
  const storeDetails = {
    name: 'Samar Store',
    tagline: 'The future of e-commerce.',
    address: '123 Commerce Lane, Shopsville, IN 12345',
    phone: '+91 98765 43210',
  };

  const socialLinks = {
    twitter: 'https://twitter.com/samarstore',
    facebook: 'https://facebook.com/samarstore',
    instagram: 'https://instagram.com/samarstore',
    linkedin: 'https://linkedin.com/company/samarstore',
  }

  const analyticsConfig = {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    metaPixelId: '123456789012345',
    googleSiteVerificationId: 'YOUR_GOOGLE_VERIFICATION_CODE',
    customHeadScript: '<meta name="custom-tag" content="example" />'
  };


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>
      <Tabs defaultValue="store-details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="store-details">Store Details</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="redirects">Redirects</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="store-details">
          <Card>
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
              <CardDescription>
                Manage your store's name, contact information, and public address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StoreDetailsForm details={storeDetails} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Customize your store's colors and fonts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeCustomizer />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Connect your social media accounts to be displayed in the footer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SocialLinksForm links={socialLinks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions">
          <Card>
            <CardHeader>
              <CardTitle>Promotional Banners</CardTitle>
              <CardDescription>
                Manage promotional content like top banners or pop-ups.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PromotionalBannersForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & SEO</CardTitle>
              <CardDescription>
                Configure tracking codes and custom meta tags for your store.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsForm config={analyticsConfig}/>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="redirects">
          <Card>
            <CardHeader>
              <CardTitle>URL Redirects</CardTitle>
              <CardDescription>
                Manage custom URL redirects for your store.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RedirectsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Manage critical store settings like maintenance mode.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceModeForm />
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
