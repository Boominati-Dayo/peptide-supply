'use client';

import { useState, useEffect } from 'react';
import ImageCarousel from '@/components/ui/ImageCarousel';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductCard from '@/components/ui/Card';
import Seo from '@/components/Seo';
import { useCartStore } from '@/lib/store/cart';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const { addItem } = useCartStore();

    // Dynamic SEO tags when product loads
    useEffect(() => {
        if (product) {
            const productImage = product.images?.[0] || '/thumbnail.png';
            
            // Update document meta tags
            document.title = `${product.name} | PeptideMint`;
            
            // Update OG tags
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) ogImage.setAttribute('content', productImage);
            
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', `${product.name} | PeptideMint`);
            
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', product.description?.slice(0, 160) || 'Shop high-quality peptides at PeptideMint');
            
            // Update Twitter tags
            const twitterImage = document.querySelector('meta[name="twitter:image"]');
            if (twitterImage) twitterImage.setAttribute('content', productImage);
            
            // Update canonical URL
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.setAttribute('href', `https://peptidemint.com/products/${product._id}`);
        }
    }, [product]);

    const productImage = product?.images?.[0] || '/thumbnail.png';
    const productDescription = product?.description?.slice(0, 160) || 'Shop high-quality peptides at PeptideMint';

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                const data = await res.json();
                console.log('Product API Response:', data); // Debug log
                const productData = data.success ? data.data : null;
                setProduct(productData);

                // Fetch related products from same category
                if (productData?.category) {
                    const relatedRes = await fetch('/api/products');
                    const relatedData = await relatedRes.json();
                    const related = (relatedData.data || [])
                        .filter((p: any) =>
                            p.category === productData.category &&
                            p._id !== productData._id
                        )
                        .slice(0, 4); // Limit to 4 products
                    setRelatedProducts(related);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

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
                    <p className="text-gray-600">Loading product details...</p>
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
            <Seo 
                title={`${product.name} | PeptideMint`}
                description={productDescription}
                image={productImage}
                url={`https://peptidemint.com/products/${product._id}`}
            />
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Shop', href: '/shop' },
                    { label: product.name }
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Images Carousel */}
                <ImageCarousel
                    images={product.images && product.images.length > 0 ? product.images : []}
                    alt={product.name}
                />

                {/* Product Info */}
                <div>
                    <span className="text-secondary font-medium tracking-wide text-sm uppercase">
                        {product.category}
                    </span>
                    <h1 className="text-4xl font-heading font-bold text-dark mt-2 mb-4">
                        {product.name}
                    </h1>
                    <div className="text-3xl font-bold text-primary mb-6">
                        ${product.price.toFixed(2)}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    {/* Specifications Table */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-dark mb-4 uppercase tracking-wider border-b-2 border-primary pb-2">
                            Product Specifications
                        </h3>
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg overflow-hidden border border-gray-200">
                            <table className="w-full">
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide w-1/3 bg-gray-100/50">
                                            Product Code
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-mono font-semibold">
                                            {product.sku || 'N/A'}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide bg-gray-100/50">
                                            Purity Level
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                                                {product.purity ? `${product.purity}%` : 'N/A'}
                                            </span>
                                        </td>
                                    </tr>
                                    {product.content && (
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide bg-gray-100/50">
                                                Content
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                {product.content}
                                            </td>
                                        </tr>
                                    )}
                                    {product.size && (
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide bg-gray-100/50">
                                                Size
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                {product.size}
                                            </td>
                                        </tr>
                                    )}
                                    {product.form && (
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide bg-gray-100/50">
                                                Form
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                {product.form}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

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
