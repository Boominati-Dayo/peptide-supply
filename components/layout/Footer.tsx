'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Footer() {
    const t = useTranslations('footer');
    const pathname = usePathname();
    const [email, setEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [subscribeMessage, setSubscribeMessage] = useState('');

    if (pathname && (pathname.startsWith('/admin') || pathname === '/admin-login')) return null;

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribeStatus('loading');
        setSubscribeMessage('');

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSubscribeStatus('success');
                setSubscribeMessage(t('subscribeSuccess'));
                setEmail('');
            } else {
                setSubscribeStatus('error');
                setSubscribeMessage(data.message || t('subscribeError'));
            }
            
            setTimeout(() => {
                setSubscribeStatus('idle');
                setSubscribeMessage('');
            }, 3000);
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setSubscribeStatus('error');
            setSubscribeMessage(t('subscribeError'));
            setTimeout(() => {
                setSubscribeStatus('idle');
                setSubscribeMessage('');
            }, 3000);
        }
    };

    return (
        <footer className="bg-primary text-white" suppressHydrationWarning>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-heading mb-4"><span className="text-white">Peptide</span><span className="text-mint-400">Mint</span></h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            {t('brandDescription')}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading text-lg mb-4">{t('categories')}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/shop?category=performance" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('performance')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=recovery" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('recovery')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=weight-loss" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('weightLoss')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading text-lg mb-4">{t('resources')}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('aboutUs')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('trackOrder')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading text-lg mb-4">{t('support')}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('contact')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund-policy" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('refundPolicy')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('privacyPolicy')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-300 hover:text-accent transition-colors">
                                    {t('terms')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-primary-400">
                    <div className="max-w-md mx-auto md:mx-0 text-center md:text-left">
                        <h4 className="font-semibold text-lg mb-2">{t('newsletter')}</h4>
                        <p className="text-gray-300 text-sm mb-4">
                            {t('newsletterDesc')}
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex md:flex-row flex-col gap-2 justify-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('emailPlaceholder')}
                                required
                                className="flex-1 px-4 py-2 rounded-lg bg-white text-dark focus:outline-none focus:ring-2 focus:ring-mint-400 border border-mint-100 disabled:opacity-50 min-w-0"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-mint-400 text-dark font-semibold rounded-lg hover:bg-mint-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {subscribeStatus === 'loading' ? t('subscribing') : t('subscribe')}
                            </button>
                        </form>
                        {subscribeMessage && (
                            <p className={`text-sm mt-2 ${subscribeStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {subscribeMessage}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-primary-400 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-300 text-sm">
                    <p>{t('copyright', { year: new Date().getFullYear() })}</p>
                    <LanguageSwitcher />
                </div>
            </div>
        </footer>
    );
}
