'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ui/Card';

export default function ShopPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [loading, setLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filtersOpen, setFiltersOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    useEffect(() => {
        setFiltersOpen(!isMobile);
    }, [isMobile]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prodRes, catRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories')
                ]);
                const prodData = await prodRes.json();
                const catData = await catRes.json();

                setProducts(prodData.data || []);
                setCategories(['All', ...catData.map((c: any) => c.name)]);
            } catch (error) {
                console.error('Error fetching shop data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, maxPrice, sortBy, searchQuery]);

    // Products per page: 10 on mobile, 20 on desktop
    const productsPerPage = isMobile ? 10 : 20;

    // Filter products
    const filteredProducts = useMemo(() => {
        let result = products.filter((p: any) =>
            p.price <= (maxPrice === '' ? Infinity : parseFloat(maxPrice)) &&
            (selectedCategory === 'All' || p.category === selectedCategory) &&
            (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             p.description?.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        // Apply sorting
        if (sortBy === 'price-low') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return result;
    }, [products, maxPrice, selectedCategory, sortBy, searchQuery]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = isMobile ? 3 : 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-heading font-bold text-dark">Shop Peptides</h1>
                <p className="text-gray-500 mt-1">{filteredProducts.length} products found</p>
            </div>

            {/* Search Bar - Visible on small screens */}
            <div className="mb-4 lg:hidden">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <svg 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Collapsible Filters */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
                        {/* Filter Header */}
                        <button
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all"
                        >
                            <h3 className="font-bold text-lg text-dark flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filters
                            </h3>
                            <svg
                                className={`w-5 h-5 text-gray-600 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Filter Content */}
                        <div className={`transition-all duration-300 ${filtersOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <div className="p-6 space-y-6">
                                {/* Search - Desktop only */}
                                <div className="hidden lg:block">
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">Search</h4>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                        />
                                        <svg 
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Categories */}
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">Categories</h4>
                                    <ul className="space-y-1">
                                        {categories.map((cat) => (
                                            <li key={cat}>
                                                <button
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className={`text-left w-full py-2 px-3 rounded-md transition-colors text-sm ${selectedCategory === cat
                                                        ? 'bg-primary text-white font-bold shadow-sm'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {cat}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Price Filter */}
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">Max Price</h4>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                        <input
                                            type="number"
                                            placeholder="Any price"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Leave empty for no limit</p>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">Sort By</h4>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                    >
                                        <option value="default">Default Sorting</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="newest">Newest Arrivals</option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                <button
                                    onClick={() => { setMaxPrice(''); setSelectedCategory('All'); setSortBy('default'); setSearchQuery(''); }}
                                    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-[400px] bg-gray-100 rounded-2xl"></div>
                            ))}
                        </div>
                    ) : paginatedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedProducts.map((product: any) => (
                                <ProductCard 
                                    key={product._id} 
                                    {...product} 
                                    id={product._id} 
                                    inStock={!product.soldout_status} 
                                    image={product.images?.[0] || '/images/placeholder-product.jpg'} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                            <button
                                onClick={() => { setMaxPrice(''); setSelectedCategory('All'); setSearchQuery(''); }}
                                className="mt-4 text-primary font-bold underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Working Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                            >
                                Prev
                            </button>
                            
                            {getPageNumbers().map((page, index) => (
                                typeof page === 'number' ? (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                            currentPage === page
                                                ? 'bg-primary text-white'
                                                : 'border hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span key={index} className="px-2 text-gray-400">...</span>
                                )
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}