'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowConsent(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowConsent(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setShowConsent(false);
    };

    if (!mounted || !showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-3">
            <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-t-xl md:rounded-xl mx-auto max-w-md md:max-w-2xl">
                <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3 text-center md:text-left">
                        We use cookies to improve your experience.
                    </p>
                    <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
                        <div className="flex gap-2 justify-center md:justify-start">
                            <button
                                onClick={handleAccept}
                                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                            >
                                Accept
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                            >
                                Decline
                            </button>
                        </div>
                        <Link 
                            href="/privacy-policy" 
                            className="text-xs text-primary hover:underline text-center md:text-right"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}