

'use client';

export function PaymentMethods() {
    // SVGs are simplified for brevity and may not be pixel perfect.
    // In a real application, you would use optimized SVG assets.
    return (
        <div className="flex items-center gap-x-4 md:gap-x-6 flex-wrap">
            <svg role="img" aria-label="PhonePe" height="24" viewBox="0 0 100 24">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#6739B7">PhonePe</text>
            </svg>
            <svg role="img" aria-label="Google Pay" height="24" viewBox="0 0 100 24">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#4285F4">G</text>
                <text x="18" y="18" fontFamily="Arial, sans-serif" fontSize="20" fill="#EA4335">o</text>
                <text x="32" y="18" fontFamily="Arial, sans-serif" fontSize="20" fill="#FBBC05">o</text>
                <text x="46" y="18" fontFamily="Arial, sans-serif" fontSize="20" fill="#4285F4">g</text>
                <text x="60" y="18" fontFamily="Arial, sans-serif" fontSize="20" fill="#34A853">l</text>
                <text x="70" y="18" fontFamily="Arial, sans-serif" fontSize="20" fill="#EA4335">e</text>
                <text x="84" y="18" fontFamily="Arial, sans-serif" fontSize="20" fill="#5f6368"> Pay</text>
            </svg>
            <svg role="img" aria-label="Paytm" height="24" viewBox="0 0 70 24">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#00baf2">paytm</text>
            </svg>
            <svg role="img" aria-label="UPI" height="24" viewBox="0 0 40 24">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#000">UPI</text>
            </svg>
            <svg role="img" aria-label="RuPay" height="24" viewBox="0 0 70 24">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#0072bc">RuPay</text>
            </svg>
            <svg role="img" aria-label="Mastercard" height="24" viewBox="0 0 38 24">
                <circle cx="12" cy="12" r="11" fill="#EA001B"/>
                <circle cx="26" cy="12" r="11" fill="#F79F1A"/>
                <path d="M20 12a11 11 0 0 1-8 10.74 11 11 0 0 1-8-10.74 11 11 0 0 1 8-10.74 11 11 0 0 1 8 10.74z" fill="#FF5F00"/>
            </svg>
             <svg role="img" aria-label="Visa" height="24" viewBox="0 0 50 24">
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fontStyle="italic" fill="#1434CB">VISA</text>
            </svg>
        </div>
    );
}
