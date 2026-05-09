'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-16">
            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <h1 className="text-[120px] md:text-[180px] font-heading font-bold text-primary leading-none">
                        404
                    </h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image
                            src="/images/transparent-peptide-bottle.png"
                            alt="Not found"
                            width={200}
                            height={200}
                            className="rounded-full opacity-20"
                        />
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for seems to have wandered off. 
                    Let's get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto">
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            Browse Products
                        </Button>
                    </Link>
                </div>

                {/* Decorative elements */}
                <div className="mt-16 flex justify-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/50"></div>
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-3 h-3 rounded-full bg-mint-400"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/50"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                </div>
            </div>
        </div>
    );
}