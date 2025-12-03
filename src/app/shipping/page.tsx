export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Shipping Information</h1>
        <p>
          At CommerceWave, we are committed to delivering your products in a timely and efficient manner. Here
          is what you need to know about our shipping policies.
        </p>

        <h2>Processing Time</h2>
        <p>
          All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or
          holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
        </p>

        <h2>Shipping Rates & Delivery Estimates</h2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout.
        </p>
        <ul>
            <li>Standard Shipping (5-7 business days): $5.00</li>
            <li>Expedited Shipping (2-3 business days): $15.00</li>
            <li>Overnight Shipping (1 business day): $25.00</li>
        </ul>

        <p>This is a placeholder page. The content is informational.</p>
      </div>
    </div>
  );
}
