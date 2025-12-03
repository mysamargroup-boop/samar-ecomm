
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy | Samar Store',
  description: 'Information about our return and refund policy.',
};


export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Return & Refund Policy</h1>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          At Samar Store, we want you to be completely satisfied with your purchase. We are committed to providing
          high-quality products and an excellent customer experience. If you're not happy for any
          reason, we're here to help with our straightforward return policy. Our goal is to make the return
          process as simple and hassle-free as possible. We value your business and aim to ensure that you are
          pleased with every aspect of your shopping journey with us.
        </p>

        <h2>30-Day Return Period</h2>
        <p>
          You have 30 calendar days from the date you receive your item to initiate a return. To be eligible for a
          return, your item must be unused, in the same condition that you received it, and in its original
          packaging with all tags and documentation included. Items that are returned in a used, damaged, or
          unsellable condition may not be eligible for a full refund and may be subject to a restocking fee. We
          encourage you to inspect your items upon arrival to ensure they meet your expectations.
        </p>

        <h2>How to Start a Return</h2>
        <p>
          To start a return, please contact our customer support team through our{' '}
          <a href="/contact">Contact Us</a> page. Please include your order number, the name of the product you
          wish to return, and a brief reason for the return. Our dedicated team will review your request and,
          upon approval, provide you with a return authorization number (RA) and detailed shipping instructions.
          Please do not send items back to us without a valid RA number, as this may cause delays in processing
          your refund.
        </p>
        
        <h2>Refunds Process</h2>
        <p>
          Once we receive your returned item at our facility, our team will inspect it to ensure it meets the
          conditions of our return policy. We will send you an email to notify you that we have received your
          returned item and the status of your refund. If your return is approved, your refund will be processed,
          and a credit will automatically be applied to your original method of payment (e.g., credit card,
          debit card, or online wallet) within 5-7 business days. Please note that it may take some additional
          time for your bank or credit card company to post the refund to your account.
        </p>
        
        <h2>Exchanges</h2>
        <p>
          We do not offer direct exchanges at this time. The fastest and most efficient way to ensure you get the
          product you want is to return the item you have, and once the return is accepted and your refund is
          processed, make a separate purchase for the new item. This ensures that the new item does not go out of
          stock while your return is in transit and allows you to receive it more quickly.
        </p>
        
         <h2>Exceptions / Non-Returnable Items</h2>
        <p>
          Certain types of items cannot be returned for hygiene and safety reasons. These include perishable
          goods (such as food or flowers), custom products (such as special orders or personalized items), and
          personal care goods (such as beauty products). We also do not accept returns for hazardous materials,
          flammable liquids, or gases. Gift cards are also non-returnable. Please get in touch if you have
          questions or concerns about your specific item; our customer service team will be happy to provide
          clarification.
        </p>

        <h2>Shipping Costs for Returns</h2>
        <p>
          You will be responsible for paying for your own shipping costs for returning your item unless the return
          is due to our error (e.g., you received a defective or incorrect item). Shipping costs from the original
          purchase are non-refundable. If you receive a refund, the cost of return shipping may be deducted from
          your refund if a prepaid label is provided. We recommend using a trackable shipping service or
          purchasing shipping insurance for valuable items, as we cannot guarantee that we will receive your
          returned item.
        </p>

        <p className="text-sm text-muted-foreground mt-8">This is a placeholder page. The content is informational and not legally binding. For specific inquiries, please contact our support team.</p>
      </div>
    </div>
  );
}
