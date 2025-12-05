

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StoreDetailsForm } from '@/components/settings/store-details-form';
import { SocialLinksForm } from '@/components/settings/social-links-form';
import { PromotionalBannersForm } from '@/components/settings/promotional-banners-form';
import { MaintenanceModeForm } from '@/components/settings/maintenance-mode-form';
import { AnalyticsForm } from '@/components/settings/analytics-form';
import { RedirectsForm } from '@/components/settings/redirects-form';
import { storeDetails, socialLinks } from '@/lib/placeholder-data';
import { DatabaseSettings } from '@/components/settings/database-settings';

export default function SettingsPage() {

  const analyticsConfig = {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    metaPixelId: '123456789012345',
    googleSiteVerificationId: 'YOUR_GOOGLE_VERIFICATION_CODE',
    customHeadScript: '<meta name="custom-tag" content="example" />'
  };


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-center md:text-left">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
          
          <Card>
            <CardHeader>
              <CardTitle>Promotional Banners</CardTitle>
              <CardDescription>
                Manage the promotional banners displayed on your storefront.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PromotionalBannersForm />
            </CardContent>
          </Card>
          
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
        </div>

        <div className="space-y-6">
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

          <Card>
            <CardHeader>
              <CardTitle>Database</CardTitle>
              <CardDescription>
                Manage your store's database settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DatabaseSettings />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
