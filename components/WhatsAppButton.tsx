'use client';

import Image from 'next/image';

export default function WhatsAppButton() {
    const phoneNumber = '+13153479034';
    const message = '👋 Hi PeptideMint! I\'m interested in your research-grade peptides. Could you please help me with information on product availability, bulk pricing, or shipping times?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-[90px] right-5 z-40 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-slow"
            aria-label="Chat on WhatsApp"
        >
            <Image
                src="/images/WhatsApp.svg"
                alt="WhatsApp"
                width={44}
                height={44}
                className="w-11 h-11"
            />
        </a>
    );
}