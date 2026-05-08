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

    const visibleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
    const totalProducts = products.length;
    
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + visibleCount) % totalProducts);
    }, [visibleCount, totalProducts]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - visibleCount + totalProducts) % totalProducts);
    };

    useEffect(() => {
        if (isPaused || totalProducts === 0) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, nextSlide, totalProducts]);

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
            className="relative px-8 md:px-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-all shadow-lg disabled:opacity-30"
                aria-label="Previous products"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-all shadow-lg disabled:opacity-30"
                aria-label="Next products"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {visibleProducts.map((product: any, idx: number) => (
                    <div 
                        key={`${product._id}-${currentIndex}-${idx}`}
                        className="transform transition-all duration-500"
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

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(totalProducts / visibleCount) }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx * visibleCount)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            Math.floor(currentIndex / visibleCount) === idx 
                                ? 'bg-primary w-6' 
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}