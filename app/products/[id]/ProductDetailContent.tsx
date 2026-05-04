'use client';

import { useState, useEffect } from 'react';
import ImageCarousel from '@/components/ui/ImageCarousel';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductCard from '@/components/ui/Card';
import { useCartStore } from '@/lib/store/cart';
import toast from 'react-hot-toast';

interface ProductDetailContentProps {
    id: string;
}

export default function ProductDetailContent({ id }: ProductDetailContentProps) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                const productData = data.success ? data.data : null;
                setProduct(productData);

                if (productData?.category) {
                    const allProductsRes = await fetch('/api/products');
                    const allProductsData = await allProductsRes.json();
                    
                    if (allProductsData.success) {
                        const related = allProductsData.data.filter(
                            (p: any) => p.category === productData.category && p._id !== id
                        );
                        setRelatedProducts(related.slice(0, 4));
                    }
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        const cartItem = {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder-product.jpg',
            quantity: quantity
        };

        addItem(cartItem);
        toast.success(`${product.name} added to cart!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Product not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Shop', href: '/shop' },
                    { label: product.category || 'Products', href: `/shop?category=${product.category}` },
                    { label: product.name }
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                {/* Image Carousel */}
                <div className="relative">
                    <ImageCarousel images={product.images || ['/images/placeholder-product.jpg']} alt={product.name || 'Product'} />
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-2">
                        {product.name}
                    </h1>
                    
                    {product.category && (
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {product.category}
                        </span>
                    )}

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-primary">
                            ${product.price?.toFixed(2)}
                        </span>
                        {product.purity && (
                            <span className="text-gray-500">
                                Purity: <span className="font-medium">{product.purity}</span>
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Specifications */}
                    {(product.content || product.size || product.form) && (
                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <h3 className="font-bold text-dark mb-4">Specifications</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {product.content && (
                                    <div>
                                        <span className="text-gray-500">Content:</span>
                                        <span className="ml-2 font-medium">{product.content}</span>
                                    </div>
                                )}
                                {product.size && (
                                    <div>
                                        <span className="text-gray-500">Size:</span>
                                        <span className="ml-2 font-medium">{product.size}</span>
                                    </div>
                                )}
                                {product.form && (
                                    <div>
                                        <span className="text-gray-500">Form:</span>
                                        <span className="ml-2 font-medium">{product.form}</span>
                                    </div>
                                )}
                                {product.sku && (
                                    <div>
                                        <span className="text-gray-500">SKU:</span>
                                        <span className="ml-2 font-medium">{product.sku}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Quantity & Add to Cart */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors text-xl font-bold"
                            >
                                −
                            </button>
                            <span className="w-12 h-12 flex items-center justify-center font-bold text-dark">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors text-xl font-bold"
                            >
                                +
                            </button>
                        </div>
                        <Button
                            size="lg"
                            className="flex-1"
                            onClick={handleAddToCart}
                            disabled={!product.stock || product.soldout_status}
                        >
                            {product.stock && !product.soldout_status ? 'Add to Cart' : 'Sold Out'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Related Products - Horizontal Scroll */}
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-3xl font-heading font-bold text-dark mb-8">Related Products</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
                        {relatedProducts.map((relatedProduct: any) => (
                            <div key={relatedProduct._id} className="flex-shrink-0 w-72 snap-start">
                                <ProductCard
                                    id={relatedProduct._id}
                                    name={relatedProduct.name}
                                    price={relatedProduct.price}
                                    image={relatedProduct.images?.[0] || '/images/placeholder-product.jpg'}
                                    category={relatedProduct.category}
                                    inStock={!relatedProduct.soldout_status}
                                    purity={relatedProduct.purity}
                                    sku={relatedProduct.sku}
                                    content={relatedProduct.content}
                                    size={relatedProduct.size}
                                    form={relatedProduct.form}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}