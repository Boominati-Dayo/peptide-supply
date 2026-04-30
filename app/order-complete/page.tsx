'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Suspense, useState, useEffect } from 'react';

function OrderCompleteContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('order');
    const [orderData, setOrderData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderNumber) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`/api/orders/by-number?orderNumber=${orderNumber}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrderData(data);
                }
            } catch (error) {
                console.error('Failed to fetch order:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderNumber]);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Success Header */}
            <div className="text-center mb-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-heading font-bold text-dark mb-2">Order Placed Successfully!</h1>
                <p className="text-gray-600">Thank you for your purchase.</p>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Invoice */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    {/* Invoice Header */}
                    <div className="bg-primary text-white p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold">INVOICE</h2>
                                <p className="text-blue-200 mt-1">PeptideSupply</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">#{orderNumber || '000000'}</p>
                                <p className="text-blue-200 text-sm">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-8">Loading order details...</div>
                        ) : orderData ? (
                            <>
                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h3 className="font-bold text-dark mb-3">Bill To:</h3>
                                        <div className="text-gray-600 text-sm space-y-1">
                                            <p className="font-medium text-dark">{orderData.shippingInfo?.firstName} {orderData.shippingInfo?.lastName}</p>
                                            <p>{orderData.shippingInfo?.email}</p>
                                            <p>{orderData.shippingInfo?.phone}</p>
                                            <p>{orderData.shippingInfo?.address}</p>
                                            <p>{orderData.shippingInfo?.city}, {orderData.shippingInfo?.state} {orderData.shippingInfo?.zipCode}</p>
                                            <p>{orderData.shippingInfo?.country}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark mb-3">Order Info:</h3>
                                        <div className="text-gray-600 text-sm space-y-1">
                                            <p><span className="font-medium text-dark">Order Number:</span> #{orderData.orderNumber}</p>
                                            <p><span className="font-medium text-dark">Date:</span> {new Date(orderData.createdAt).toLocaleDateString()}</p>
                                            <p><span className="font-medium text-dark">Status:</span> <span className="text-yellow-600">{orderData.status || 'Pending Payment'}</span></p>
                                            <p><span className="font-medium text-dark">Payment Method:</span> {orderData.paymentMethod}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div className="mb-8">
                                    <h3 className="font-bold text-dark mb-4">Order Items</h3>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 text-sm font-bold text-gray-600">Item</th>
                                                <th className="text-center py-3 text-sm font-bold text-gray-600">Qty</th>
                                                <th className="text-right py-3 text-sm font-bold text-gray-600">Price</th>
                                                <th className="text-right py-3 text-sm font-bold text-gray-600">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderData.items?.map((item: any, index: number) => (
                                                <tr key={index} className="border-b border-gray-100">
                                                    <td className="py-3 text-dark font-medium">{item.name}</td>
                                                    <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                                                    <td className="py-3 text-right text-gray-600">${item.price.toFixed(2)}</td>
                                                    <td className="py-3 text-right text-dark font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Totals */}
                                <div className="flex justify-end">
                                    <div className="w-64">
                                        <div className="flex justify-between py-2">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="text-dark font-medium">${orderData.total?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-t border-gray-200">
                                            <span className="text-dark font-bold">Total:</span>
                                            <span className="text-dark font-bold">${orderData.total?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">Order details not available</p>
                                <p className="font-bold text-dark text-xl">Order Number: #{orderNumber || '000000'}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 p-6 rounded-xl mb-8">
                    <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        What happens next?
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                        <li>Check your email for the order confirmation.</li>
                        <li>You will receive a <strong>separate email with payment instructions</strong> shortly.</li>
                        <li>Follow the instructions to complete your payment.</li>
                        <li>Once payment is confirmed, we will ship your order immediately.</li>
                    </ol>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/account/orders">
                        <Button variant="outline">View Orders</Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant="primary">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderCompletePage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading order details...</div>}>
            <OrderCompleteContent />
        </Suspense>
    );
}