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
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Consent Box */}
            <div className="relative bg-white rounded-t-2xl shadow-2xl p-6 max-w-4xl w-full mx-4 mb-0 animate-slide-up">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-dark mb-2">Manage Consent</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            To provide the best experiences, we use technologies like cookies to store and/or access device information. 
                            Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. 
                            Not consenting or withdrawing consent, may adversely affect certain features and functions.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleAccept}
                                className="px-5 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                            >
                                Accept
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                            >
                                Decline
                            </button>
                            <Link 
                                href="/privacy-policy" 
                                className="px-5 py-2 text-primary hover:underline font-medium text-sm flex items-center"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}