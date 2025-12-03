
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy | CommerceWave',
  description: 'Information about our return and refund policy.',
};


export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Return & Refund Policy</h1>
        <p>
          At CommerceWave, we want you to be completely satisfied with your purchase. If you're not happy for any
          reason, we're here to help with our straightforward return policy.
        </p>

        <h2>30-Day Return Period</h2>
        <p>
          You have 30 days from the date you receive your item to initiate a return. To be eligible for a
          return, your item must be unused, in the same condition that you received it, and in its original
          packaging.
        </p>

        <h2>How to Start a Return</h2>
        <p>
          To start a return, please contact our customer support team through our{' '}
          <a href="/contact">Contact Us</a> page. Please include your order number and the reason for the
          return. Our team will provide you with a return authorization and shipping instructions.
        </p>
        
        <h2>Refunds</h2>
        <p>
          Once we receive and inspect your returned item, we will notify you of the approval or rejection of
          your refund. If approved, your refund will be processed, and a credit will automatically be applied to
          your original method of payment within 5-7 business days.
        </p>
        
        <h2>Exchanges</h2>
        <p>
          The fastest way to ensure you get what you want is to return the item you have, and once the return is
          accepted, make a separate purchase for the new item.
        </p>
        
         <h2>Exceptions / Non-Returnable Items</h2>
        <p>
          Certain types of items cannot be returned, like perishable goods, custom products (such as special
          orders or personalized items), and personal care goods. We also do not accept returns for hazardous
          materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about
          your specific item.
        </p>

        <p className="text-sm text-muted-foreground">This is a placeholder page. The content is informational and not legally binding.</p>
      </div>
    </div>
  );
}
