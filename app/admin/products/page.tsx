'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [deletingMultiple, setDeletingMultiple] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data.success ? data.data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            return;
        }
        
        setDeleteId(id);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            
            if (res.ok) {
                toast.success('Product deleted successfully');
                setProducts(products.filter(p => p._id !== id));
                setSelectedIds(prev => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        } finally {
            setDeleteId(null);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === products.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(products.map(p => p._id)));
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.size === 0) {
            toast.error('No products selected');
            return;
        }
        if (!confirm(`Are you sure you want to delete ${selectedIds.size} product(s)? This cannot be undone.`)) {
            return;
        }

        setDeletingMultiple(true);
        let deleted = 0;
        let failed = 0;

        for (const id of selectedIds) {
            try {
                const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    deleted++;
                    setProducts(prev => prev.filter(p => p._id !== id));
                } else {
                    failed++;
                }
            } catch {
                failed++;
            }
        }

        setDeletingMultiple(false);
        setSelectedIds(new Set());

        if (failed === 0) {
            toast.success(`Deleted ${deleted} product(s)`);
        } else {
            toast.error(`Deleted ${deleted}, failed ${failed}`);
        }
    };

    if (loading) {
        return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-dark">Products</h1>
                    <Link href="/admin/products/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
                        Add New Product
                    </Link>
                </div>
                <div className="text-center py-8">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold text-dark">Products ({products.length})</h1>
                <div className="flex gap-2 flex-wrap">
                    <Link href="/admin/products/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm">
                        <span className="hidden sm:inline">Add New Product</span>
                        <span className="sm:hidden">Add Product</span>
                    </Link>
                    {selectedIds.size > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            disabled={deletingMultiple}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
                        >
                            {deletingMultiple ? 'Deleting...' : `Delete Selected (${selectedIds.size})`}
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.size === products.length && products.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                </th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
                                <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.length > 0 ? (
                                products.map((product: any) => (
                                    <tr key={product._id} className={selectedIds.has(product._id) ? 'bg-red-50' : ''}>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.has(product._id)}
                                                onChange={() => toggleSelect(product._id)}
                                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 relative bg-gray-100 rounded-md">
                                                    {product.images && product.images[0] ? (
                                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover rounded-md" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                                    )}
                                                </div>
                                                <div className="ml-2 md:ml-4">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[120px] md:max-w-none">{product.name}</div>
                                                    <div className="text-xs text-gray-500">SKU: {product.sku || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                            {product.category}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${product.price ? product.price.toFixed(2) : '0.00'}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                            {product.stock}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link href={`/admin/products/${product._id}`} className="text-primary hover:text-primary-600">Edit</Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    disabled={deleteId === product._id}
                                                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                                >
                                                    {deleteId === product._id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No products found. Add your first product!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
