
export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
       <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Shipping Information</h1>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          At Samar Store, we are committed to delivering your products in a timely, secure, and efficient manner.
          We understand that receiving your items promptly is important to you, so we have established a clear
          and reliable shipping policy. This page outlines everything you need to know about our shipping
          processes, rates, and delivery estimates. We partner with trusted courier services to ensure your
          package arrives safely and on time. Our goal is to make your post-purchase experience as smooth and
          transparent as your shopping experience.
        </p>

        <h2>Order Processing Time</h2>
        <p>
          All orders are processed and prepared for shipment within 1-2 business days (Monday-Friday), excluding
          public holidays. Orders are not shipped or delivered on weekends. If we are experiencing a high volume
          of orders, shipments may be delayed by a few days. We will communicate any significant delays to you
          via email. Once your order has been dispatched from our warehouse, you will receive a shipment
          confirmation email containing your tracking number(s).
        </p>

        <h2>Shipping Rates & Delivery Estimates</h2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout. The cost is determined by
          the weight of the items and the shipping destination. We offer several domestic shipping options to
          meet your needs. Delivery delays can occasionally occur due to unforeseen circumstances such as weather,
          carrier issues, or logistical challenges.
        </p>
        <ul>
            <li><strong>Standard Shipping (5-7 business days):</strong> This is our most economical option. Your order will typically arrive within 5 to 7 business days after it has been processed and shipped.</li>
            <li><strong>Expedited Shipping (2-3 business days):</strong> For a faster delivery, you can choose our expedited service. Your order will arrive within 2 to 3 business days after processing.</li>
            <li><strong>Overnight Shipping (1 business day):</strong> For urgent needs, we offer overnight shipping. Orders must be placed before 12 PM IST to be delivered on the next business day.</li>
        </ul>

        <h2>Shipment Confirmation & Order Tracking</h2>
        <p>
          You will receive a Shipment Confirmation email once your order has shipped, containing your unique
          tracking number(s). The tracking number will be active within 24 hours, allowing you to monitor the
          progress of your delivery online through the carrier's website. If you have any issues with your
          tracking number, please don't hesitate to contact our customer support team for assistance.
        </p>

        <h2>International Shipping</h2>
        <p>
          Currently, Samar Store only ships to addresses within India. We do not offer international shipping at
          this time. We are continuously working to expand our services and hope to offer international delivery
          in the future. Please check back on this page for any updates regarding our shipping destinations. We
          apologize for any inconvenience this may cause.
        </p>
        
        <h2>Damages and Lost Packages</h2>
        <p>
          Samar Store is not liable for any products damaged or lost during shipping. If you received your order
          damaged, please contact the shipment carrier to file a claim. It is important to save all packaging
          materials and damaged goods before filing a claim, as they may be required for inspection. If your
          package is lost in transit, please let us know, and we will do our best to assist you in resolving the
          issue with the carrier.
        </p>
        
        <p className="text-sm text-muted-foreground mt-8">This is a placeholder page. The content is informational. For specific shipping questions, please refer to the details provided at checkout or contact our support team.</p>
      </div>
    </div>
  );
}
