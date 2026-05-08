'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ui/Card';

interface ProductCarouselProps {
    products: any[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const visibleCount = 3; // Show 3 products at a time
    const totalProducts = products.length;
    
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalProducts);
    }, [totalProducts]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Auto-scroll every 8 seconds
    useEffect(() => {
        if (isPaused || totalProducts === 0) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, 8000);

        return () => clearInterval(interval);
    }, [isPaused, nextSlide, totalProducts]);

    // Reset index if it goes beyond products
    useEffect(() => {
        if (currentIndex >= totalProducts && totalProducts > 0) {
            setCurrentIndex(0);
        }
    }, [currentIndex, totalProducts]);

    const getVisibleProducts = () => {
        if (totalProducts === 0) return [];
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % totalProducts;
            items.push(products[index]);
        }
        return items;
    };

    const visibleProducts = getVisibleProducts();

    if (totalProducts === 0) {
        return null;
    }

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                aria-label="Previous products"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                aria-label="Next products"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Products Grid */}
            <div className="overflow-hidden">
                <div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-transform duration-500 ease-out"
                    style={{ display: 'flex', flexWrap: 'nowrap' }}
                >
                    {visibleProducts.map((product: any, idx: number) => (
                        <div 
                            key={`${product._id}-${currentIndex}-${idx}`}
                            className="flex-shrink-0 w-full md:w-auto"
                        >
                            <ProductCard
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.images?.[0] || '/images/placeholder-product.jpg'}
                                category={product.category}
                                inStock={!product.soldout_status}
                                purity={product.purity}
                                sku={product.sku}
                                content={product.content}
                                size={product.size}
                                form={product.form}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalProducts }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            idx === currentIndex 
                                ? 'bg-primary w-8' 
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to product ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Auto-scroll indicator */}
            {!isPaused && totalProducts > visibleCount && (
                <div className="absolute top-2 right-2 flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    Auto-scrolls in 8s
                </div>
            )}
        </div>
    );
}