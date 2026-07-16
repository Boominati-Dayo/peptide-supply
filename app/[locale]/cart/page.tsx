'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import Button from '@/components/ui/Button';

export default function CartPage() {
    const t = useTranslations('cart');
    const c = useTranslations('common');
    const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
    const subtotal = getCartTotal();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-heading font-bold mb-6">{t('emptyTitle')}</h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {t('emptyDesc')}
                </p>
                <Link href="/shop">
                    <Button variant="primary" size="lg">{t('returnToShop')}</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-heading font-bold mb-8">{t('shoppingCart')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-50 rounded-md mx-auto sm:mx-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>

                            <div className="flex-1 flex flex-col gap-3">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-dark text-sm sm:text-base truncate">{item.name}</h3>
                                        {item.category && (
                                            <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-400 hover:text-error transition-colors flex-shrink-0"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100 text-gray-600 text-lg"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 font-medium text-dark min-w-[3rem] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100 text-gray-600 text-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="font-bold text-primary text-lg">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button
                            onClick={clearCart}
                            className="text-sm text-gray-500 hover:text-error underline"
                        >
                            {t('clearCart')}
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-dark mb-6">{t('orderSummary')}</h2>

                        <div className="space-y-4 mb-6 pb-6 border-b">
                            <div className="flex justify-between text-gray-600">
                                <span>{t('subtotal')}</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>{t('shipping')}</span>
                                <span>{t('calculatedAtCheckout')}</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-xl font-bold text-dark mb-8">
                            <span>{t('total')}</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <Link href="/checkout" className="block">
                            <Button size="lg" className="w-full">
                                {t('proceedToCheckout')}
                            </Button>
                        </Link>

                        <div className="mt-6 flex flex-col items-center justify-center gap-4 text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-sm">{t('secureCheckout')}</span>
                            </div>
                            <Link href="/track-order" className="text-sm text-primary hover:underline font-medium">
                                {t('trackExisting')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
